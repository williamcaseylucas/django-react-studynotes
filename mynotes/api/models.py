from django.db import models


# Create your models here. -> Meant for db models
class Note(models.Model):
    body = models.TextField(null=True, blank=True)  # can't be null and can't be empty
    updated = models.DateTimeField(
        auto_now=True
    )  # Takes a time stamp when a note is saved
    created = models.DateTimeField(auto_now_add=True)  # Takes timestamp only once

    def __str__(self):
        return self.body[0:50]
