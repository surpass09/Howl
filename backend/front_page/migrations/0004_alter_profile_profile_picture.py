# Generated by Django 5.1.4 on 2025-01-15 03:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('front_page', '0003_rename_email_profile_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='profile_picture',
            field=models.ImageField(blank=True, null=True, upload_to='profile_picture/'),
        ),
    ]
