from django.contrib import admin

# Register your models here.
from .models import Note

# Register model to our admin panel
admin.site.register(Note)
