from rest_framework import serializers
from .models import FinancialEntry, ExpenseEntry,FinancialGoal


class FinancialEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = FinancialEntry
        fields = '__all__'
        extra_kwargs = {
            'salary': {'allow_null': True},
            'business_income': {'allow_null': True},
            'rent_income': {'allow_null': True},
            'remittances': {'allow_null': True},
            'other': {'allow_null': True},
        }

    

class ExpenseEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = ExpenseEntry
        fields = '__all__'


class FinancialGoalSerializer(serializers.ModelSerializer):
    class Meta:
        model = FinancialGoal
        fields = ['id', 'user', 'name', 'description', 'amount', 'deadline', 'saved', 'remaining', 'created_at']
        read_only_fields = ['id', 'user', 'created_at']

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.description = validated_data.get('description', instance.description)
        instance.amount = validated_data.get('amount', instance.amount)
        instance.deadline = validated_data.get('deadline', instance.deadline)
        instance.saved = validated_data.get('saved', instance.saved)
        instance.remaining = validated_data.get('remaining', instance.remaining)

        instance.save()
        return instance
    # def create(self, validated_data):
    #     self.utilities = -abs(self.utilities) if self.utilities is not None else None
    #     utilities = validated_data.pop('utilities', 0)