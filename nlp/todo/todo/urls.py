from django.urls import path
from todo_api.views import ExtractKeywordsView

urlpatterns = [
    path('api/extract-keywords/', ExtractKeywordsView.as_view(), name='extract-keywords'),
]
