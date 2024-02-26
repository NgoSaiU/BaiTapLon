from django.contrib import admin
from .models import Post, Comment, Tag, City, District, Ward, Street, Address, Media, User
from django.urls import path
from django.template.response import TemplateResponse
from houseapp import dao

# admin_site = CourseAppAdminSite(name='myapp')
# Register your models here.
from cloudinary.forms import CloudinaryFileField

# class MyModelAdmin(admin.ModelAdmin):
#     formfield_overrides = {
#         models.ImageField: {'widget': CloudinaryFileField},
#     }


class CourseAppAdminSite(admin.AdminSite):
    site_header = 'Hệ thống nhà trọ'
    def get_urls(self):
        return [
                   path('course-stats/', self.stats_view)
               ] + super().get_urls()

    def stats_view(self, request):
        return TemplateResponse(request, 'admin/static.html',{
            'stats': dao.count_user_by_month(2024)
        })

admin_site = CourseAppAdminSite(name='myapp')

admin_site.register(Post)
admin_site.register(Media)
admin_site.register(User)
admin_site.register(Comment)
admin_site.register(Tag)

admin_site.register(Address)
admin_site.register(Street)
admin_site.register(Ward)
admin_site.register(District)
admin_site.register(City)

