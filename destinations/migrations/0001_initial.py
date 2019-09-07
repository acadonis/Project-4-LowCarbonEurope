# Generated by Django 2.2.5 on 2019-09-07 13:05

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('category', models.CharField(max_length=50, unique=True)),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='categories', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Destination',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50, unique=True)),
                ('airport', models.CharField(max_length=3)),
                ('address', models.CharField(max_length=50)),
                ('longitude', models.IntegerField(blank=True, null=True)),
                ('latitude', models.IntegerField(blank=True, null=True)),
                ('cost', models.IntegerField(null=True)),
                ('image', models.CharField(max_length=200, unique=True)),
                ('description', models.CharField(max_length=5000)),
                ('categories', models.ManyToManyField(related_name='destinations', to='destinations.Category')),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='destinations', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
