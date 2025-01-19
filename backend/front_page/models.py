from django.db import models


class CustomUser(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.email


class Profile(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    bio = models.TextField(null=True, blank=True)
    profile_picture = models.ImageField(upload_to='profile_picture/', null=True, blank=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Profile of {self.user.first_name} {self.user.last_name}"


class LoginInfo(models.Model):
    email = models.EmailField(default='placeholder@example.com')
    password = models.CharField(max_length=100)
      # Default email

    def __str__(self):
        return f"Login info for {self.username}"
