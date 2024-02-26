from django.urls import path, include
from rest_framework import routers
from houseapp import views

router = routers.DefaultRouter()

# router.register('categories', views.CategoryViewSet, basename='categories')
# router.register('courses', views.CourseViewSet, basename='courses')
# router.register('lessons', views.LessonViewSet, basename='lessons')
# router.register('users', views.UserViewSet, basename='users')
# router.register('comments', views.CommentViewSet, basename='comments')

router.register('posts', views.PostViewSet, basename='posts')
router.register('users', views.UserViewSet, basename='users')
router.register('comment', views.CommentViewSet, basename='comment')


urlpatterns = [
    path('', include(router.urls))

]