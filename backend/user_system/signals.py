from django.db.models.signals import post_save
from django.dispatch import receiver

from .models import UserAccount, UserProfile


@receiver(post_save, sender=UserAccount)
def create_profile(sender, instance, created, **kwargs):
    """
    Signal to create user profile when new user is created
    """
    if created:
        UserProfile.objects.create(user=instance)