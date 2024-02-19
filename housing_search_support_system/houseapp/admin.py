from django.contrib import admin
from .models import Post, Comment, Tag, City, District, Ward, Street, Address, Media, User


# admin_site = CourseAppAdminSite(name='myapp')
# Register your models here.
from cloudinary.forms import CloudinaryFileField

# class MyModelAdmin(admin.ModelAdmin):
#     formfield_overrides = {
#         models.ImageField: {'widget': CloudinaryFileField},
#     }

admin.site.register(Post)
admin.site.register(City)
admin.site.register(Media)
admin.site.register(User)
admin.site.register(Comment)
admin.site.register(Tag)

