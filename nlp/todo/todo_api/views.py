from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Task
from .serializers import TaskSerializer
from .getKeywords import extract_keywords
import json

class ExtractKeywordsView(APIView):
    def post(self, request):
        paragraph = request.data['paragraph']
        keywords = extract_keywords(paragraph)
        if paragraph:
            return Response(json.loads(keywords), status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)
