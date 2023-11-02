from django.urls import path
from .views import (
    UserProfileView,
    AddBookmarkView,
    RemoveBookmarkView,
    AddLikeView,
    RemoveLikeView,
    GetRecommendationsAPIView,
)

urlpatterns = [
    path("profile/", UserProfileView.as_view(), name="profile"),
    path("add_bookmark/", AddBookmarkView.as_view(), name="add-bookmark"),
    path("remove_bookmark/", RemoveBookmarkView.as_view(), name="remove-bookmark"),
    path("add_like/", AddLikeView.as_view(), name="add-like"),
    path("remove_like/", RemoveLikeView.as_view(), name="remove-like"),
    path("recommendation/", GetRecommendationsAPIView.as_view(), name="recommendation"),
]
