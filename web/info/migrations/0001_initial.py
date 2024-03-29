# Generated by Django 5.0 on 2024-01-18 15:16

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='ExpenseEntry',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('utilities', models.DecimalField(blank=True, decimal_places=2, max_digits=10000000000, null=True)),
                ('groceries_shopping', models.DecimalField(blank=True, decimal_places=2, max_digits=10000000000, null=True)),
                ('transportation', models.DecimalField(blank=True, decimal_places=2, max_digits=10000000000, null=True)),
                ('cafe_restaurant', models.DecimalField(blank=True, decimal_places=2, max_digits=10000000000, null=True)),
                ('health', models.DecimalField(blank=True, decimal_places=2, max_digits=10000000000, null=True)),
                ('other', models.DecimalField(blank=True, decimal_places=2, max_digits=10000000000, null=True)),
                ('entry_date', models.DateTimeField(auto_now_add=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='FinancialEntry',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('salary', models.DecimalField(blank=True, decimal_places=2, max_digits=10000000000, null=True)),
                ('business_income', models.DecimalField(blank=True, decimal_places=2, max_digits=10000000000, null=True)),
                ('rent_income', models.DecimalField(blank=True, decimal_places=2, max_digits=10000000000, null=True)),
                ('remittances', models.DecimalField(blank=True, decimal_places=2, max_digits=10000000000, null=True)),
                ('other', models.DecimalField(blank=True, decimal_places=2, max_digits=10000000000, null=True)),
                ('entry_date', models.DateTimeField(auto_now_add=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
