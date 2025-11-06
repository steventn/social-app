# groups/services.py

from django.db import transaction
from django.db.models import Prefetch, OuterRef, Subquery, Max, F
from chat.models import ChatRooms, ChatMessage
from .models import Group, GroupMember
from users.models import CustomUser


def create_group_service(creator_user, group_name, description=None, member_ids=None):
    """
    Core business logic to create a group and all related objects.
    """

    # Ensure a transaction wraps all database operations
    with transaction.atomic():
        # 1. CREATE CHAT ROOM
        chat_room = ChatRooms.objects.create(
            created_by_user=creator_user,
            room_type='Group'
        )

        # 2. CREATE GROUP (links to the new chat room)
        new_group = Group.objects.create(
            group_name=group_name,
            description=description,
            created_by_user=creator_user,
            chat_room=chat_room,
        )

        # 3. ADD CREATOR (as Admin)
        GroupMember.objects.create(
            group=new_group,
            user=creator_user,
        )

        # 4. ADD OTHER MEMBERS
        if member_ids:
            # Fetch users efficiently (excluding the creator who is already added)
            valid_members = CustomUser.objects.filter(pk__in=member_ids).exclude(pk=creator_user.pk)

            member_objects = [
                GroupMember(
                    group=new_group,
                    user=user,
                    member_role='Member'
                ) for user in valid_members
            ]
            GroupMember.objects.bulk_create(member_objects)

        return new_group  # Return the created object


def get_user_groups_service(user):
    """
    Fetches all groups and relevant chat data for a given user.
    """

    # --- 1. Subquery to find the latest message per chat room ---
    # This finds the ID and content of the most recent message for each chat room.
    latest_message = ChatMessage.objects.filter(
        chat_room=OuterRef('chat_room_id')  # Links back to the Group's chat_room
    ).order_by('-sent_at').values('message_content', 'sent_at')[:1]

    # --- 2. Subquery to calculate the unread count for the user ---
    # This efficiently finds the unread_count stored directly on the GroupMember table.
    unread_count = GroupMember.objects.filter(
        group_id=OuterRef('pk'),  # Links back to the Group's primary key
        user=user
    ).values('unread_count')[:1]

    # --- 3. Main Query ---
    # Filter Groups by user membership and annotate with required chat data.
    groups_data = Group.objects.filter(
        memberships__user=user  # Filter for groups where the user is a member
    ).annotate(
        # Annotate with the last message content and sent time
        last_message=Subquery(latest_message.values('message_content')),
        last_message_sent_at=Subquery(latest_message.values('sent_at')),

        # Annotate with the user's specific unread count
        unread_count=Subquery(unread_count.values('unread_count')),

        # Pulling the user's role and join date from the GroupMember table
        member_role=F('memberships__member_role'),
        join_date=F('memberships__join_date'),

    ).order_by('-last_message_sent_at')  # Sort groups by recent activity

    # Convert the queryset to a list of dictionaries for clean API response
    return list(groups_data.values(
        'id',
        'group_name',
        'description',
        'group_image_url',
        'chat_room_id',
        'last_message',
        'unread_count',
        'member_role',
        'last_message_sent_at'
    ))