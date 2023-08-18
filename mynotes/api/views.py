from django.shortcuts import render

# from django.http import JsonResponse -> django native
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Note
from .serializers import NoteSerializer


@api_view(["GET"])
# Just list what can be queried
def getRoutes(request):
    routes = [
        {
            "Endpoint": "/notes/",
            "method": "GET",
            "body": None,
            "description": "Returns an array of notes",
        },
        {
            "Endpoint": "/notes/id",
            "method": "GET",
            "body": None,
            "description": "Returns a single note object",
        },
        {
            "Endpoint": "/notes/create/",
            "method": "POST",
            "body": {"body": ""},
            "description": "Creates new note with data sent in post request",
        },
        {
            "Endpoint": "/notes/id/update/",
            "method": "PUT",
            "body": {"body": ""},
            "description": "Creates an existing note with data sent in post request",
        },
        {
            "Endpoint": "/notes/id/delete/",
            "method": "DELETE",
            "body": None,
            "description": "Deletes and exiting note",
        },
    ]

    # Return back more data than just a python dictionary
    return Response(routes)


@api_view(["GET"])
def getNotes(request):
    # Sort it by ascending order
    notes = Note.objects.all().order_by("-updated")  # Get all the notes from the db
    serializer = NoteSerializer(
        notes, many=True
    )  # We are passing in multiple objects so we want a query set
    return Response(serializer.data)


@api_view(["GET"])
# pk stands for primary key
def getNote(request, pk):
    # Grab param out of url by doing this if you had ?id=blah
    # param = request.GET.get('id')
    notes = Note.objects.get(id=pk)  # Get the note that matches the same id
    serializer = NoteSerializer(notes, many=False)
    return Response(serializer.data)


@api_view(["PUT"])
def updateNote(request, pk):
    data = request.data  # Gives us JSON data because of Django-REST-Framework
    note = Note.objects.get(id=pk)
    serializer = NoteSerializer(instance=note, data=data)

    if serializer.is_valid():
        serializer.save()

    # Will update the isntance of a note with the data information if it is valid
    return Response(serializer.data)


@api_view(["POST"])
def createNote(request):
    data = request.data  # Gives us JSON data because of Django-REST-Framework
    # The other attributes will be created themselves
    note = Note.objects.create(body=data["body"])
    serializer = NoteSerializer(note, many=False)

    return Response(serializer.data)


@api_view(["DELETE"])
def deleteNote(request, pk):
    note = Note.objects.get(id=pk)
    note.delete()
    return Response("Note was deleted!")
