from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.utils import timezone
from datetime import timedelta
from .models import Game
from .serializers import GameSerializer, GameCreateSerializer


class GameListAPIView(APIView):
    def get(self, request):
        user = request.user

        games = Game.objects.filter(creator=user)

        filter_by = request.query_params.get('filter_by', None)  # week, day, month
        today = timezone.now().date()

        if filter_by == 'day':
            games = games.filter(date=today)
        elif filter_by == 'week':
            start_of_week = today - timedelta(days=today.weekday())  # Monday
            end_of_week = start_of_week + timedelta(days=6)  # Sunday
            games = games.filter(date__range=[start_of_week, end_of_week])
        elif filter_by == 'month':
            games = games.filter(date__month=today.month, date__year=today.year)

        # Serialize the filtered games
        serializer = GameSerializer(games, many=True)
        return Response(serializer.data)


class CreateGameAPIView(APIView):
    def post(self, request):
        serializer = GameCreateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(creator=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
