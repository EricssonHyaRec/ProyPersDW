# Generated by Django 5.1.3 on 2024-11-21 07:42

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Cita',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fecha', models.DateField()),
                ('asunto', models.CharField(max_length=80)),
                ('medico', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.persona')),
            ],
        ),
    ]
