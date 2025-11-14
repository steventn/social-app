# groups/views.py

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .services import create_group_service, get_user_groups_service


@api_view(['POST'])
def create_group_api(request):
    if not request.user.is_authenticated:
        return Response({"error": "Authentication required."}, status=status.HTTP_401_UNAUTHORIZED)

    group_name = request.data.get('group_name')
    member_ids = request.data.get('member_ids', [])
    description = request.data.get('description')

    if not group_name:
        return Response({"error": "Group name is required."}, status=status.HTTP_400_BAD_REQUEST)

    try:
        # **CALL THE SEPARATED BUSINESS LOGIC**
        new_group = create_group_service(
            creator_user=request.user,
            group_name=group_name,
            description=description,
            member_ids=member_ids
        )

        # Use a serializer here for production code, but for mock, use dictionary
        response_data = {
            "group_id": new_group.pk,
            "name": new_group.group_name,
            "chat_room_id": new_group.chat_room.pk,
            "member_count": new_group.memberships.count()  # Efficient way to count members
        }
        return Response(response_data, status=status.HTTP_201_CREATED)

    except Exception as e:
        # Catch any errors originating from the service layer
        print(f"API Error during group creation: {e}")
        return Response({"error": "Failed to create group."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
def get_user_groups_api(request):
    """
    API endpoint to retrieve all groups associated with the requesting user.
    """
    # 1. Authentication Check
    if not request.user.is_authenticated:
        return Response({"error": "Authentication required."}, status=status.HTTP_401_UNAUTHORIZED)

    try:
        # 2. Call the business logic (Service Layer)
        groups_list = get_user_groups_service(request.user)

        # 3. Return the data
        return Response(groups_list, status=status.HTTP_200_OK)

    except Exception as e:
        # Log error and return generic failure response
        print(f"Error fetching groups: {e}")
        return Response({"error": "Unable to fetch groups data."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)