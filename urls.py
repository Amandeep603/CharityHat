"""mypg URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.urls import path,include
from . import views
urlpatterns = [   
     
     path('support-apna-thikana/', views.contact,name="contact"),
     path('findpg/', views.findpg,name="findpg"),
     path('pg-details/<str:slug>/', views.pgdetail,name="pgdetail"),
     path('quicksearch/<str:slug>/', views.quicksearch,name="quicksearch"),
     path('booking-form-pg/<str:slug>/', views.book_pg_form,name="bookpgform"),
     path('bookpg/<str:slug>/', views.book_pg,name="bookpg"),
     path('account/<str:slug>', views.userview,name="userview"),
     path('changedetails/<str:slug>', views.change_details,name="changedetails"),
     path('changepassword/<str:slug>', views.changepassword,name="changepassword"),
     path('registerpg-grow-business/', views.registerpg,name="registerpg"),
     path('testmotional',views.testm,name="testmotional"),
     path('cancelorder/<int:sno>',views.cancel,name="cancel"),
     path('payment-success',views.payment_success,name="payment_success"),
     path('payment-success-receipt/<int:sno>',views.receipt,name="receipt"),
     
     path('payment-processing/<int:sno>',views.show_load,name="loading"),
    
     
]
