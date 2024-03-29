from _ast import Name

from django.core.validators import RegexValidator
from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from cloudinary.models import CloudinaryField
from ckeditor.fields import RichTextField
from phone_field import PhoneField


# Create your models here.

class User(AbstractUser):
    follow = models.ManyToManyField('self', blank=True, symmetrical=False, related_name='UserFollow')
    phone_number_regex = RegexValidator(regex=r'(0[0-9]{9,10})$',
                                        message='Please enter correct format phone number, ex: 0987654321')
    phone_number = models.CharField(max_length=11, validators=[phone_number_regex], null=True, unique=True)
    avatar = CloudinaryField('avatar', null=True)

    # def save(self, validated_data):
    #     data = validated_data.copy()
    #     user = User(**data)
    #     user.set_password(data['password'])
    #     user.save()
    #     return user

    class Role(models.TextChoices):
        ADMIN = "ADMIN", 'Admin'
        CUSTOMER = "CUSTOMER", 'Customer'
        LANDLORD = "LANDLORD", 'Landlord'

    base_role = Role.CUSTOMER
    role = models.CharField(max_length=50, choices=Role.choices, blank=True)

    def save(self, *args, **kwargs):
        if not self.role:
            self.role = self.base_role
            return super().save(*args, **kwargs)

class CustomerManager(BaseUserManager):
    def get_queryset(self, *args, **kwargs):
        results = super().get_queryset(*args, **kwargs)
        return results.filter(role=User.Role.STUDENT)
class Customer(User):
    base_role = User.Role.CUSTOMER
    customer = CustomerManager()
    class Meta:
        proxy = True
        abstract = True
class LandlordManager(BaseUserManager):
    def get_queryset(self, *args, **kwargs):
        results = super().get_queryset(*args, **kwargs)
        return results.filter(role=User.Role.LANDLORD)
class Landlor(User):
    base_role = User.Role.LANDLORD
    landlors = LandlordManager()
    class Meta:
        proxy = True
        abstract = True


class BaseModel(models.Model):
    created_date = models.DateField(auto_now_add=True, null=True)
    updated_date = models.DateField(auto_now=True, null=True)
    active = models.BooleanField(default=True)

    class Meta:
        abstract = True

class ContentModel(BaseModel):
    content = models.CharField(max_length=255, null=False)

    def __str__(self):
        return self.content
    class Meta:
        abstract = True

class Chat(ContentModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE)


class Post(BaseModel):
    # thộc tính price phải là string
    # thêm thuộc tính số điện thoại
    title = models.CharField(max_length=255, null=False)
    description = RichTextField(null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    address = models.CharField(max_length=255, null=False)
    numberOfPerson = models.SmallIntegerField(default=0)
    acreage = models.DecimalField(max_digits=3, decimal_places=1,null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    tags = models.ManyToManyField('Tag')
    local = models.ForeignKey("Address", on_delete=models.CASCADE, null=True)


    def __str__(self):
        return self.title


    # class Meta:
    #     abstract = True

class Comment(ContentModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    reply = models.ManyToManyField('self', symmetrical=False, related_name='ReplyComment', blank=True)
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='post')

class Media(models.Model): #
    link = CloudinaryField('link', null=True)
    # avatar = CloudinaryField('avatar', null=True)
    postMotel = models.ForeignKey('Post', on_delete=models.CASCADE)

    @property
    def url(self):
        return self.link.url
    def __str__(self):
        return str(self.url)

    # def get_image_url(self):
    #     return '{}{}'.format(settings.CLOUDINARY_ROOT_URL, self.image_field)

    # def get_absolute_url(self):
    #     return f"https://res.cloudinary.com/du1qx5ncz/{self.link}"


# class Notification(ContentModel):
#     pass

###### Kế thừa model BasePost

# class PostMotel(PostWantRent):
#
#     pass

####### Lớp chứa 2 khóa ngoại User - Post Motel
class User_PostMotel(BaseModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=False)
    post = models.ForeignKey(Post, on_delete=models.CASCADE, null=False)

    class Meta:
        abstract = True

class Favourite(User_PostMotel):
    active = models.BooleanField(default=True)

    class Meta:
        unique_together = ('user', 'post')


# class RoomChat(User_PostMotel):
#     pass
# class Follow(User_PostMotel):
#     pass


# Tạm thời chưa quan tâm cái này ngen!!!!
# class Rating(User_PostMotel):
#     pass




###### Lớp kế thừa Name
class NameModel(models.Model):
    name = models.CharField(max_length=255, null=False)
    def __str__(self):
        return self.name

    class Meta:
        abstract = True
class City(NameModel):
    pass
class District(NameModel):
    city = models.ForeignKey(City,on_delete=models.CASCADE)
class Ward(NameModel):
    dictrict = models.ForeignKey(District, on_delete=models.CASCADE)
class Street(NameModel):
    ward = models.ForeignKey(Ward, on_delete=models.CASCADE)
class Address(NameModel):
    street = models.ForeignKey(Street, on_delete=models.CASCADE)


class Tag(BaseModel):
    name = models.CharField(max_length=50, unique=True)
    def __str__(self):
        return self.name

class Category(models.Model):
    name = models.CharField(max_length=50, null=False)






