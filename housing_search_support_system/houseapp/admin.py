from django.contrib import admin
from .models import Post, Comment, Tag, City, District, Ward, Street, Address, Media, User
from django.urls import path
from django.template.response import TemplateResponse

from django.contrib.auth.models import Group

from houseapp import dao


class CourseAppAdminSite(admin.AdminSite):
    site_header = 'Hệ thống nhà trọ'
    def get_urls(self):
        return [
           path('month-statistic/', self.statistic_month),
           path('quarter-statistic/', self.statistic_quarter),
           path('year-statistic/', self.statistic_year),
       ] + super().get_urls()
    def statistic_month(self, request):
        return TemplateResponse(request, 'admin/statistic_month.html',{
            'stats': dao.count_user_by_month(2024)
        })
    def statistic_quarter(self, request):
        return TemplateResponse(request, 'admin/statistic_quarter.html',{
            'stats': dao.count_user_by_quarter(2024, 2025)
        })
    def statistic_year(self, request):
        return TemplateResponse(request, 'admin/statistic_year.html',{
            'stats': dao.count_user_by_year(2024, 2025)
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


admin.site.unregister(Group)



