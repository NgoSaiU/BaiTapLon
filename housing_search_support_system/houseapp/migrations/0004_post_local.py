# Generated by Django 4.2.8 on 2024-02-24 09:01

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('houseapp', '0003_post_description'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='local',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='houseapp.address'),
        ),
    ]
