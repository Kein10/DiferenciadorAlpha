from django.http import HttpResponse
from django.shortcuts import render

# Create your views here.
from django.template import loader


def v_index(request):
    data = {}
    template = loader.get_template('index.html')

    return HttpResponse(template.render(context=data, request=request))
