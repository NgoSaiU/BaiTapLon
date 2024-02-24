import django_filters
from houseapp.models import Post

class PostFilter(django_filters.FilterSet):

    class Meta:
        model = Post
        fields = {
            'title': ['icontains'],
            'price': ['lt', 'gt'],
            'numberOfPerson': ['exact'],
            'address': ['icontains']
        }