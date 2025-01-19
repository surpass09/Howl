from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from .models import CustomUser, Profile, LoginInfo


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        return super().create(validated_data)

    class Meta:
        model = CustomUser
        fields = ['id', 'first_name', 'last_name', 'email', 'password', 'created_at', 'updated_at']


class ProfileSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=CustomUser.objects.all())

    class Meta:
        model = Profile
        fields = ['id', 'user', 'bio', 'profile_picture', 'uploaded_at']


class LoginInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = LoginInfo
        fields = ['email', 'password']
