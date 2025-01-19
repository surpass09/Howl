from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import CustomUser, Profile
from .serializers import UserSerializer, ProfileSerializer, LoginInfoSerializer
from django.contrib.auth import authenticate
from django.http import JsonResponse


# Endpoint to create a new user
@api_view(['POST'])
def create_user(request):
    print("Incoming data:", request.data)
    email = request.data.get('email')

    if CustomUser.objects.filter(email=email).exists():
        return Response({"detail": "This user already exists"}, status=status.HTTP_400_BAD_REQUEST)

    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    print("Validation errors:", serializer.errors)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Endpoint to create or update a user's profile
@api_view(['POST'])
def create_profile(request):
    email = request.data.get('email')
    user = CustomUser.objects.filter(email=email).first()

    if not user:
        return Response({"detail": "User with this email does not exist."}, status=status.HTTP_400_BAD_REQUEST)

    profile = Profile.objects.filter(user=user).first()
    if profile:
        new_bio = request.data.get('bio')
        if new_bio:
            profile.bio = new_bio
            profile.save()
            serializer = ProfileSerializer(profile)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({"detail": "No new bio provided."}, status=status.HTTP_400_BAD_REQUEST)

    profile_data = request.data.copy()
    profile_data['user'] = user.id
    serializer = ProfileSerializer(data=profile_data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Endpoint for validating user login
@api_view(['POST'])
def valid_user(request):
    # Create an instance of the LoginInfoSerializer with the incoming data
    serializer = LoginInfoSerializer(data=request.data)

    # Validate the serializer
    if serializer.is_valid():
        # Get the validated email and password
        email = serializer.validated_data.get('email')
        password = serializer.validated_data.get('password')

        # Check if the user exists in the database by email
        user = CustomUser.objects.filter(email=email).first()

        if user is None:
            # If the user does not exist, return an error
            return JsonResponse({
                'message': "Invalid email or password"
            }, status=status.HTTP_401_UNAUTHORIZED)

        # Authenticate the user with the provided credentials
        #user = authenticate(email=user.email, password=password)

        if user is not None:
            # If authentication is successful, return a success response
            return JsonResponse({
                'message': 'Login successful!',
                'email': user.email
            }, status=status.HTTP_200_OK)
        else:
            # If authentication fails, return an error
            return JsonResponse({
                'message': "Invalid email or password"
            }, status=status.HTTP_401_UNAUTHORIZED)

    # If serializer is invalid, return the validation errors
    return JsonResponse({
        'message': "Invalid data input",
        'errors': serializer.errors
    }, status=status.HTTP_400_BAD_REQUEST)