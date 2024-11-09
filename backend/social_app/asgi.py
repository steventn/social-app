# social_app/asgi.py
import os
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
import backend.chat.routing

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'social_app.settings')

application = ProtocolTypeRouter({
    'http': get_asgi_application(),
    'websocket': AuthMiddlewareStack(
        URLRouter(
            backend.chat.routing.websocket_urlpatterns
        )
    ),
})