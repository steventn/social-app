from rest_framework import serializers
from .models import Game
from django.contrib.auth import get_user_model

User = get_user_model()

class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = ['id', 'title', 'date', 'time', 'location', 'creator', 'participants']

class GameCreateSerializer(serializers.ModelSerializer):
    participants = serializers.PrimaryKeyRelatedField(
        many=True, queryset=User.objects.all(), required=False
    )

    class Meta:
        model = Game
        fields = ['title', 'date', 'time', 'location', 'participants']

    def create(self, validated_data):
        participants = validated_data.pop('participants', [])
        creator = validated_data.pop('creator', None)
        game = Game.objects.create(creator=creator, **validated_data)
        if participants:
            game.participants.set(participants)
        return game
