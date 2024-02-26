# from datetime import datetime
from django.utils.timezone import datetime
from houseapp.models import User
from houseapp import models
from django.db.models import Count, DateField
# thống kê số lượng người dùng (CUSTOMER)
#  Theo tháng
def count_user_by_month(year):

    result = {}
    for month in range(1,13):
        users_by_month = User.objects.filter(date_joined__year=year, date_joined__month=month).values('role','date_joined__month').annotate(total=Count('id'))
        result[month] = list(users_by_month)

    return result


    # month = datetime.date.today().month
    # Thống kê số lượng người dùng theo tháng cho từng loại
    # return User.objects.filter(
    #     date_joined__month='2',
    #     role=User.Role.CUSTOMER,
    # ).annotate(
    #     count=Count('id')
    # ).values("id", "count")
    # today = datetime.today()

    # return Category.objects.annotate(count=Count('courses__id')).values("id", "name", "count").order_by('-count')

#  Theo năm
def count_Customer_by_year():

    pass
#  Theo quý
def count_Customer_by_quarterly():

    pass

# thống kê số lượng chủ trọ (LANDLORD)
#  Theo tháng
#  Theo năm
#  Theo quý


