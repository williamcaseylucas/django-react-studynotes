from django.urls import path
from . import views

urlpatterns = [
    # Name lets us dynamically access this later
    path("", views.getRoutes, name="routes")
]
