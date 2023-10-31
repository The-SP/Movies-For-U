from rest_framework import generics
from user_system.models import UserProfile
from user_system.serializers import UserProfileSerializer


class UserProfileView(generics.RetrieveUpdateAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer

    def get_object(self):
        return UserProfile.objects.get(user=self.request.user)


class AddBookmarkView(generics.UpdateAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer

    def get_object(self):
        return UserProfile.objects.get(user=self.request.user)

    def perform_update(self, serializer):
        # Get the movie ID to add from request data
        movie_id = self.request.data.get("movie_id")

        # Get the user profile from get_object
        user_profile = self.get_object()

        # Check if the movie_id is already in bookmarked_movies
        if str(movie_id) in user_profile.bookmarked_movies.split(","):
            return

        # Add the movie ID to the bookmarked_movies field
        bookmarked_movies = user_profile.bookmarked_movies or ""
        bookmarked_movies += f",{movie_id}"

        serializer.save(bookmarked_movies=bookmarked_movies)


class RemoveBookmarkView(generics.UpdateAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer

    def get_object(self):
        return UserProfile.objects.get(user=self.request.user)

    def perform_update(self, serializer):
        # Get the movie ID to remove from request data
        movie_id = self.request.data.get("movie_id")

        # Get the user profile from get_object
        user_profile = self.get_object()

        # Remove the movie ID from the bookmarked_movies field
        bookmarked_movies = user_profile.bookmarked_movies or ""
        bookmarked_movies = ",".join(
            x for x in bookmarked_movies.split(",") if x != str(movie_id)
        )

        serializer.save(bookmarked_movies=bookmarked_movies)
