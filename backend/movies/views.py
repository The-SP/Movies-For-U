import pandas as pd
import requests, environ

from rest_framework import generics, views
from rest_framework.response import Response

from user_system.models import UserProfile
from user_system.serializers import UserProfileSerializer
from .recommender import get_recommendations


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


class AddLikeView(generics.UpdateAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer

    def get_object(self):
        return UserProfile.objects.get(user=self.request.user)

    def perform_update(self, serializer):
        # Get the movie ID to add from request data
        movie_id = self.request.data.get("movie_id")

        # Get the user profile from get_object
        user_profile = self.get_object()

        # Check if the movie_id is already in liked_movies
        if str(movie_id) in user_profile.liked_movies.split(","):
            return

        # Add the movie ID to the liked_movies field
        liked_movies = user_profile.liked_movies or ""
        liked_movies += f",{movie_id}"

        serializer.save(liked_movies=liked_movies)


class RemoveLikeView(generics.UpdateAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer

    def get_object(self):
        return UserProfile.objects.get(user=self.request.user)

    def perform_update(self, serializer):
        # Get the movie ID to remove from request data
        movie_id = self.request.data.get("movie_id")

        # Get the user profile from get_object
        user_profile = self.get_object()

        # Remove the movie ID from the liked_movies field
        liked_movies = user_profile.liked_movies or ""
        liked_movies = ",".join(
            x for x in liked_movies.split(",") if x != str(movie_id)
        )
        serializer.save(liked_movies=liked_movies)


"""
View for recommendation system
"""
# Initialise environment variables
env = environ.Env()
environ.Env.read_env()
TMDB_API_KEY = env("TMDB_API_KEY")


class GetRecommendationsAPIView(views.APIView):
    # Assuming tmdb_5000.csv is loaded into a DataFrame named 'tmdb_df'
    tmdb_df = pd.read_csv("./movies/data/tmdb_5000.csv")

    def get_movie_info(self, movie_id):
        # Check if the movie_id is present in tmdb_5000.csv dataset
        if int(movie_id) in self.tmdb_df["id"].tolist():
            print(f"Fetching movie {movie_id} from tmdb_5000.csv")

            # If found, get the desired columns from the dataset
            movie_info = self.tmdb_df.loc[
                self.tmdb_df["id"] == int(movie_id),
                ["id", "title", "cast", "crew", "keywords", "genres"],
            ]
            return movie_info.to_dict(orient="records")[0]
        else:
            print(f"Fetching movie {movie_id} from tmdb api")

            # If not found, fetch the data from tmdb API (replace with your actual API call logic)
            api_url = (
                f"https://api.themoviedb.org/3/movie/{movie_id}?api_key={TMDB_API_KEY}"
            )
            api_response = requests.get(api_url)

            if api_response.status_code == 200:
                movie_info = api_response.json()

                # Extract relevant information from the API response
                movie_info = {
                    "id": movie_info["id"],
                    "title": movie_info["title"],
                    "cast": "",  # You may need to fetch cast data from a different endpoint
                    "crew": "",  # You may need to fetch crew data from a different endpoint
                    "keywords": "",  # You may need to fetch keywords data from a different endpoint
                    "genres": str(movie_info["genres"]),
                }
                return movie_info
            else:
                return None

    def get(self, request, *args, **kwargs):
        user_profile = UserProfile.objects.get(user=self.request.user)

        # Check if liked_movies is an empty string
        if user_profile.liked_movies == "":
            return Response({"recommended_indices": []})

        # Assuming request.user.UserProfile.liked_movies is a string like '123,456,789'
        liked_ids = user_profile.liked_movies.split(",")

        # Get movie information for each liked movie
        liked_movies = []
        for liked_id in liked_ids:
            if not liked_id:
                continue
            movie_info = self.get_movie_info(liked_id)
            if movie_info:
                liked_movies.append(movie_info)

        # Create a DataFrame from the liked movies data
        liked_df = pd.DataFrame(liked_movies)

        # Get recommendations using get_recommendations function
        recommendations = get_recommendations(liked_df)

        # Get the indices of the recommendations
        recommended_indices = recommendations.id.tolist()

        return Response({"recommended_indices": recommended_indices})
