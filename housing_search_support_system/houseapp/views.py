# from django.shortcuts import render
from cloudinary.auth_token import generate
from rest_framework import viewsets, generics, parsers, permissions, status
from houseapp import serializers, paginators
from houseapp import perms
from houseapp.models import Post, User, Comment, Favourite
from rest_framework.response import Response
from rest_framework.decorators import action

from django_filters.rest_framework import DjangoFilterBackend
from houseapp.filters import PostFilter


from rest_framework.views import APIView
from django.shortcuts import get_object_or_404


# from courses import perms

# Create your views here.s
# viewsets.ModelViewSet là sẽ ra 6 API
class PostViewSet(viewsets.ViewSet, generics.RetrieveAPIView, generics.DestroyAPIView,
                  generics.ListAPIView, generics.CreateAPIView, generics.UpdateAPIView):

    queryset = Post.objects.prefetch_related('media_set').all()
    serializer_class = serializers.PostSerializer

    filter_backends = (DjangoFilterBackend,)
    filterset_class = PostFilter

    permission_classes = [permissions.AllowAny()] #có ngoặc
    # permission_classes = [perms.OwnerAuthenticated]
    pagination_class = paginators.PostsPaginator

    def get_permissions(self):
        if self.action in ['get_comment']:
            return [permissions.AllowAny()]
        # if self.action == 'create':  # Kiểm tra action của viewset
        #     return [permissions.IsAuthenticated()]
        if self.action in ['add_comment', 'favourite']:
            return [permissions.IsAuthenticated()]
        return self.permission_classes

    @action(methods=['get'], url_path='comment', detail=True)
    def get_comment(self, request, pk):
        post = self.get_object()
        comments = Comment.objects.filter(post=post)
        serializer = serializers.CommentSerializer(comments, many=True, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(methods=['post'], url_path='comments', detail=True)
    def add_comment(self, request, pk):
        c = Comment.objects.create(user=request.user, post=self.get_object(), content=request.data.get('content'))

        return Response(serializers.CommentSerializer(c).data, status=status.HTTP_201_CREATED)

    @action(methods=['post'], url_path='favourite', detail=True)
    def favourite(self, request, pk):
        favourite, created = Favourite.objects.get_or_create(user=request.user, post=self.get_object())
        if not created:
            favourite.active = not favourite.active
            favourite.save()
        return Response(serializers.FavouritePostSerializer(self.get_object(), context={'request': request}).data,
                        status=status.HTTP_200_OK)

    # lấy bài post mà user đã favourite
    @action(methods=['get'], url_path='post-favourite', detail=True)
    def get_post_favourite(self, request, pk):
        user_id = pk
        user = get_object_or_404(User, pk=user_id)
        favourite_posts = user.favourite_set.filter(active=True).values_list('post', flat=True)
        posts = Post.objects.filter(id__in=favourite_posts)

        paginator = paginators.PostsPaginator()
        result_page = paginator.paginate_queryset(posts, request)
        serializer = serializers.PostSerializer(result_page, many=True)
        return paginator.get_paginated_response(serializer.data)

        # serializer = serializers.PostSerializer(posts, many=True)
        # return Response(serializer.data, status=status.HTTP_200_OK)


class UserViewSet(viewsets.ViewSet, generics.CreateAPIView, generics.UpdateAPIView, generics.ListAPIView):
    queryset = User.objects.filter(is_active=True).all()
    serializer_class = serializers.UserSerialzier

    parser_classes = [parsers.MultiPartParser]

    def get_permissions(self):
        if self.action in ['add_ follow', 'follow']:
            return [permissions.IsAuthenticated()]
        if self.action.__eq__('current_user'):
            return [permissions.IsAuthenticated()]

        # return self.permission_classes
        return [permissions.AllowAny()]


    @action(methods=['get'], url_path='current-user', url_name='current-user', detail=False)
    def current_user(self, request):
        return Response(serializers.UserSerialzier(request.user).data)

    @action(methods=['post'], url_path='follow', detail=True)
    def add_follow(self, request, pk):
        user_id = request.data.get('pk')  # Lấy id của user mà bạn muốn follow
        try:
            user_to_follow = User.objects.get(id=user_id)
            self.follow.add(user_to_follow)
            return Response({'message': 'Successfully followed user'}, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({'message': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

    @action(methods=['post'], url_path='theodoi', detail=True)
    def follow(self, request, pk): #nên viết gọn code lại
        # favourite, created = Favourite.objects.get_or_create(user=request.user, post=self.get_object())
        # if not created:
        #     favourite.active = not favourite.active
        #     favourite.save()
        # return Response(serializers.FavouritePostSerializer(self.get_object(), context={'request': request}).data,
        #                 status=status.HTTP_200_OK)

        user_id = request.data.get('pk')  # Lấy id của user mà bạn muốn follow
        try:

            user_to_follow = User.objects.get(id=3)
            user = request.user
            # if user == user_to_follow:
            #     return Response({'error': 'You cannot follow yourself'}, status=status.HTTP_400_BAD_REQUEST)
            user.follow.add(user_to_follow)
            user.save()
            return Response({'message': f'You are now following user {user_to_follow.id}'}, status=status.HTTP_200_OK)
            #

            # user_to_follow = User.objects.get(id=3)
            # self.follow.add(user_to_follow)
            # return Response(serializers.UserFollowSerializer(self.get_object(), context={'request': request}).data,
            #                 {'message': 'Successfully followed user'}, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({'message': 'User not found'}, status=status.HTTP_404_NOT_FOUND)


class CommentViewSet(viewsets.ViewSet, generics.DestroyAPIView, generics.UpdateAPIView, generics.ListAPIView):
    queryset = Comment.objects.all()
    serializer_class = serializers.CommentSerializer
    permission_classes = [perms.OwnerAuthenticated]


# class FavouriteListAPIView(viewsets.ListAPIView):
#     queryset = Favourite.objects.filter(active=True)
#     serializer_class = serializers.FavouriteSerializer
#
#     # Lọc theo user
#     def get_queryset(self):
#         queryset = super().get_queryset()
#         user_id = self.kwargs['pk']
#         return queryset.filter(user_id=user_id)

# class CustomerViewSet(viewsets.ViewSet, generics.CreateAPIView):
#     queryset = User.objects.all()
#     serializer_class = serializers.CustomserSerialzier
#     parser_classes = [parsers.MultiPartParser]

# class FollowUserView(APIView):
#     def post(self, request, pk, format=None):
#         user = self.request.user
#         try:
#             user_to_follow= get_object_or_404(User,pk=pk)
#             user.follow.add(user_to_follow)
#             user.save()
#             return Response(status=status.HTTP_200_OK)
#         except Exception as e:
#             return Response(status=status.HTTP_400_BAD_REQUEST)