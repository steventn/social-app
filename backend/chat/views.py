from django.views.generic import TemplateView

class IndexView(TemplateView):
    template_name = "chat/index.html"

class RoomView(TemplateView):
    template_name = "chat/room.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["room_name"] = self.kwargs["room_name"]
        return context