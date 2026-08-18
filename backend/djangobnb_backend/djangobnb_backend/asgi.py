import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'djangobnb_backend.settings')
django.setup()

from channels.routing import ProtocolTypeRouter, URLRouter
from chat import routing
from chat.token_auth import TokenAuthMiddleWare
from django.core.asgi import get_asgi_application

application = ProtocolTypeRouter({
    'http': get_asgi_application(),
    'websocket': TokenAuthMiddleWare(
        URLRouter(
            routing.websocket_urlpatterns
        )
    )
})
