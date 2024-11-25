from django.contrib.auth import authenticate
from rest_framework import serializers
from .models import CustomUser

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    location = serializers.CharField(required=False, allow_blank=True)
    preferences = serializers.JSONField(required=False)

    class Meta:
        model = CustomUser
        fields = ['username', 'password', 'email', 'location', 'preferences']

    def create(self, validated_data):
        user = CustomUser.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            email=validated_data['email'],
            location=validated_data.get('location', ''),
            preferences=validated_data.get('preferences', {})
        )
        return user

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        user = authenticate(username=data['username'], password=data['password'])
        if user and user.is_active:
            user = authenticate(**data)
            if user and user.is_active:
                return user
            raise serializers.ValidationError("Invalid credentials")
        raise serializers.ValidationError("Invalid credentials")
