from rest_framework import serializers
from dj_rest_auth.registration.serializers import RegisterSerializer

from .models import User


class UserDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'id', 'name', 'avatar_url'
        )


class CustomRegisterSerializer(RegisterSerializer):
    name = serializers.CharField(required=True)

    def get_cleaned_data(self):
        data = super().get_cleaned_data()
        data['name'] = self.validated_data.get('name', '')
        return data

    def save(self, request):
        print(">>> CUSTOM SERIALIZER IS RUNNING <<<")
        user = super().save(request)
        user.name = self.validated_data.get('name', '')
        user.save(update_fields=['name'])
        print(">>> NAME SET TO:", user.name)
        return user
