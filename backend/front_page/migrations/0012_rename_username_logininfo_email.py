# Generated by Django 5.1.4 on 2025-01-18 22:26

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('front_page', '0011_rename_user_customuser'),
    ]

    operations = [
        migrations.RenameField(
            model_name='logininfo',
            old_name='username',
            new_name='email',
        ),
    ]
