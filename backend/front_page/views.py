from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import User, Profile
from .serializers import UserSerializer, ProfileSerializer

# Endpoint to create a new user
@api_view(['POST'])
def create_user(request):
    # Log incoming data for debugging
    print("Incoming data:", request.data)  

    # Extract the email from the request data
    email = request.data.get('email')

    # Check if a user with the same email already exists
    if User.objects.filter(email=email).exists():
        # Return an error response if the email already exists
        return Response({"detail": "This user already exists"}, status=status.HTTP_400_BAD_REQUEST)

    # Pass the incoming data to the UserSerializer for validation
    serializer = UserSerializer(data=request.data)
    
    # Check if the serializer's validation is successful
    if serializer.is_valid():
        # Save the new user object to the database
        serializer.save()
        # Return the created user's data with a 201 status
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    # Log validation errors for debugging
    print("Validation errors:", serializer.errors)  
    
    # Return validation errors with a 400 status
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Endpoint to create or update a user's profile
@api_view(['POST'])
def create_profile(request):
    # Extract the email from the request data
    email = request.data.get('email')

    # Find the user associated with the given email
    user = User.objects.filter(email=email).first()

    # If no user exists with this email, return an error
    if not user:
        return Response({"detail": "User with this email does not exist."}, status=status.HTTP_400_BAD_REQUEST)

    # Check if the user already has a profile
    profile = Profile.objects.filter(user=user).first()
    if profile:
        # If the profile exists, check if a new bio is provided
        new_bio = request.data.get('bio')
        if new_bio:
            # Update the bio and save the changes
            profile.bio = new_bio
            profile.save()
            # Serialize the updated profile data and return it
            serializer = ProfileSerializer(profile)
            return Response(serializer.data, status=status.HTTP_200_OK)
        # If no new bio is provided, return an error response
        return Response({"detail": "No new bio provided."}, status=status.HTTP_400_BAD_REQUEST)

    # If the profile doesn't exist, create a new one
    # Prepare data for the profile serializer
    profile_data = request.data.copy()
    profile_data['user'] = user.id  # Associate the profile with the user by ID
    
    # Pass the data to the ProfileSerializer for validation
    serializer = ProfileSerializer(data=profile_data)
    
    # Check if the serializer's validation is successful
    if serializer.is_valid():
        # Save the new profile object to the database
        serializer.save()
        # Return the created profile's data with a 201 status
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    # If validation fails, return the errors with a 400 status
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
