from django.db import models
from django.contrib import admin
from django.contrib.auth.models import User


class Resource(models.Model):
    """Represents a generic user-created or user-uploaded resource."""

    id = models.SlugField(max_length=150, primary_key=True)
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    created_by = models.ForeignKey(User,
                                   null=True,
                                   related_name='created_by',
                                   on_delete=models.SET_NULL)
    created_date = models.DateTimeField(null=True)

admin.site.register(Resource)

