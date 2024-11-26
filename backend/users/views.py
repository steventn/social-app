from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from django.db import IntegrityError
import logging
from .serializers import UserSerializer, LoginSerializer
from .models import CustomUser, Friendship

logger = logging.getLogger(__name__)


class UserRegistrationView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
                    user = serializer.validated_data

                    refresh = RefreshToken.for_user(user)
                    return Response({
                        'refresh': str(refresh),
                        'access': str(refresh.access_token),
                    }, status=status.HTTP_200_OK)

class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data)

    def put(self, request):
        user = request.user
        serializer = UserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AddPlayerByUserIdView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user_id = request.data.get('user_id')
        if not user_id:
            return Response({"error": "user_id is required"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            friend = CustomUser.objects.get(id=user_id)
            Friendship.objects.create(user=request.user, friend=friend)
            return Response({"message": f"Friend '{friend.username}' added successfully"}, status=status.HTTP_201_CREATED)
        except CustomUser.DoesNotExist:
            logger.error(f"User with id {user_id} does not exist")
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        except IntegrityError:
            logger.error(f"Friendship already exists between user {request.user.id} and {user_id}")
            return Response({"error": "Friendship already exists"}, status=status.HTTP_400_BAD_REQUEST)

class CheckFriendshipView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user_id = request.query_params.get('user_id')
        if not user_id:
            return Response({"error": "user_id is required"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            friend = CustomUser.objects.get(id=user_id)
            exists = Friendship.objects.filter(user=request.user, friend=friend).exists()
            return Response({"exists": exists}, status=status.HTTP_200_OK)
        except CustomUser.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)