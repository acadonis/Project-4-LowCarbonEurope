# Generated by Django 2.2.5 on 2019-09-05 10:05

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Destination',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('airport', models.CharField(max_length=3)),
                ('address', models.CharField(max_length=50)),
                ('longitude', models.IntegerField(blank=True, null=True)),
                ('latitude', models.IntegerField(blank=True, null=True)),
                ('cost', models.IntegerField(null=True)),
                ('image', models.CharField(max_length=200)),
                ('description', models.CharField(max_length=5000)),
            ],
        ),
    ]