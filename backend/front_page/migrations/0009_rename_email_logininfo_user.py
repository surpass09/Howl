# Generated by Django 5.1.4 on 2025-01-18 21:13

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('front_page', '0008_remove_logininfo_logged_in_at_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='logininfo',
            old_name='email',
            new_name='user',
        ),
    ]
