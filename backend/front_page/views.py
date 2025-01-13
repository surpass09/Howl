from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import User, Profile
from .serializers import UserSerializer, ProfileSerializer
from django.core.exceptions import ValidationError

@api_view(['POST'])

def create_user(request):
    if request.method == 'POST':
        email = request.data.get('email')

        if User.objects.filter(email=email).exists():
            return Response({"Error": "This user already exists"})
        
        serializer = UserSerializer(data=request.data)

        if serializer.is_valid():
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])    
def create_profile(request):
    if request.method == 'POST':
        email = request.data.get('email')
        user = User.objects.filter(email=email).first()

        if not user:
            return Response({"detail": "User with this email does not exist."}, status=status.HTTP_400_BAD_REQUEST)

        profile = Profile.objects.filter(user=user).first()

        if profile:

            new_bio = request.data.get('bio')
            if new_bio:
                profile.bio = new_bio
                profile.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response({"detail": "No new bio provided."}, status=status.HTTP_400_BAD_REQUEST)
        
        else:
            profile_data = request.data.copy()  # Copy the request data
            profile_data['user'] = user.id  # Set the user field with the user's id
            
            # Serialize and save the profile
            serializer = ProfileSerializer(data=profile_data)
            
            if serializer.is_valid():
                serializer.save()  # Save the new profile
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

