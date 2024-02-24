from rest_framework.pagination import PageNumberPagination


class PostsPaginator(PageNumberPagination):
    page_size = 2