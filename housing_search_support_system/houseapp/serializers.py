from houseapp.models import User, Post, Comment, Tag
from rest_framework import serializers

# làm CURD Post trước
class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['title', 'price', 'address', 'numberOfPerson', 'user', 'tags']


class FavouritePostSerializer(PostSerializer):
    favourited = serializers.SerializerMethodField()

    def get_favourited(self, post):
        request = self.context.get('request')
        if request.user.is_authenticated:
            return post.favourite_set.filter(active=True).exists()

    # class Meta:
    #     model = PostSerializer.Meta.model
    #     fields = PostSerializer.Meta.fields + ['favourited']
    class Meta:
        model = PostSerializer.Meta.model
        fields = PostSerializer.Meta.fields + ['favourited']

class UserSerialzier(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'username', 'password', 'email', 'avatar']
        extra_kwargs = {
            'password': {
                'write_only': True
        }

            }
    def create(self, validated_data):
        data = validated_data.copy()
        user = User(**data)
        user.set_password(data['password'])
        user.save()
        return user

class UserFollowSerializer(UserSerialzier):
    class Meta:
        model = UserSerialzier.Meta.model
        fields = PostSerializer.Meta.fields + ['follow']


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'name']


class UserFollowSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'follow']


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['id', 'content', 'user']

