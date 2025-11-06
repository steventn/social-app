# groups/services.py

from django.db import transaction
from chat.models import ChatRooms
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