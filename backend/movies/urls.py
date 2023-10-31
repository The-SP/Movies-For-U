from django.urls import path
from .views import UserProfileView, AddBookmarkView, RemoveBookmarkView

urlpatterns = [
    path('profile/', UserProfileView.as_view(), name='profile'),
    path('add_bookmark/', AddBookmarkView.as_view(), name='add-bookmark'),
    path('remove_bookmark/', RemoveBookmarkView.as_view(), name='remove-bookmark'),
]
