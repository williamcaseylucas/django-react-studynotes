from rest_framework.serializers import ModelSerializer
from .models import Note


class NoteSerializer(ModelSerializer):
    class Meta:
        model = Note
        # fields = ['body', 'updated']
        # Serializes body, updated, and created
        fields = "__all__"
