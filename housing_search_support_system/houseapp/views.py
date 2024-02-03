# from django.shortcuts import render
from rest_framework import viewsets, generics, parsers, permissions, status
from houseapp import serializers
from houseapp import perms
from houseapp.models import Post, User, Comment, Favourite
from rest_framework.response import Response
from rest_framework.decorators import action


from rest_framework.views import APIView
from django.shortcuts import get_object_or_404


# from courses import perms

# Create your views here.s
# viewsets.ModelViewSet là sẽ ra 6 API
class PostViewSet(viewsets.ViewSet, generics.RetrieveAPIView, generics.DestroyAPIView,
                  generics.ListAPIView, generics.CreateAPIView, generics.UpdateAPIView):
    queryset = Post.objects.all()
    serializer_class = serializers.PostSerializer, generics.UpdateAPIView
    permission_classes = [permissions.AllowAny]

    def get_permissions(self):
        if self.action in ['add_comment', 'favourite']:
            return [permissions.IsAuthenticated()]

        return self.permission_classes
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


class UserViewSet(viewsets.ViewSet, generics.CreateAPIView, generics.UpdateAPIView):
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


class CommentViewSet(viewsets.ViewSet, generics.DestroyAPIView, generics.UpdateAPIView):
    queryset = Comment.objects.all()
    serializer_class = serializers.CommentSerializer
    permission_classes = [perms.OwnerAuthenticated]







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