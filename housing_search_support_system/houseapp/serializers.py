from urllib.parse import urljoin

from cloudinary import config
from houseapp.models import User, Post, Comment, Tag, Media
from rest_framework import serializers

# làm CURD Post trước
class PostSerializer(serializers.ModelSerializer):
    images = serializers.SerializerMethodField('get_images')
    phone = serializers.SerializerMethodField()
    class Meta:
        model = Post
        fields = ['id', 'title', 'description','price', 'address', 'numberOfPerson', 'created_date', 'user', 'phone', 'acreage', 'tags', 'images']
        # fields = ['id', 'title']
    def get_images(self, obj):
        return MediaSerializer(obj.media_set.all(), many=True).data

    def get_phone(self, obj):
        # Access the phone number from the related User instance
        return obj.user.phone_number

class MediaSerializer(serializers.ModelSerializer):
    link = serializers.SerializerMethodField()

    class Meta:
        model = Media
        fields = ['link']
    def get_link(self, obj):
        if obj.link:
            # return f"http://res.cloudinary.com/{'du1qx5ncz'}/{obj.avatar}"
            return urljoin(f"http://res.cloudinary.com/{'du1qx5ncz'}/", str(obj.link))
        return None

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
    avatar_url = serializers.SerializerMethodField()
    class Meta:
        model = User
        fields = ['id','first_name', 'last_name', 'username', 'password', 'email', 'role', 'avatar', 'avatar_url']
        extra_kwargs = {
            'password': {
                'write_only': True
        }

            }

    def get_avatar_url(self, obj):
        if obj.avatar:
            # return f"http://res.cloudinary.com/{'du1qx5ncz'}/{obj.avatar}"
            return urljoin(f"http://res.cloudinary.com/{'du1qx5ncz'}/", str(obj.avatar))
        return None

    # def get_avatar_url(self, obj):
    #     if obj.avatar:
    #         config(cloud_name=obj.avatar.public_id.split('/')[0])
    #         return obj.avatar.url
    #     return None

    # def get_avatar_url(self, obj):
    #     if obj.avatar:
    #         cloud_name = obj.avatar.public_id.split('/')[1]
    #         config(cloud_name=cloud_name)
    #         return obj.avatar.url
    #     return None
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
    user = UserSerialzier()
    class Meta:
        model = Comment
        fields = ['id', 'content', 'user']

