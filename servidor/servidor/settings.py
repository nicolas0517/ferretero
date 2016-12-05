import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SECRET_KEY = '9yz%mg+@!0=unet59kliu&=y5!r*sqw+*$!ip70@m8ro@@rlq#'
DEBUG = True
ALLOWED_HOSTS = []

INSTALLED_APPS = [
    'corsheaders',
    'ferretero'
]

MIDDLEWARE = [
    'django.middleware.common.CommonMiddleware',
    'corsheaders.middleware.CorsMiddleware'
]

CORS_ORIGIN_ALLOW_ALL = True

ROOT_URLCONF = 'servidor.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'servidor.wsgi.application'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.oracle',
        'NAME': 'xe',
    	'USER': 'nicolas',
    	'PASSWORD': 'nicolas',
    'NAME': 'xe',
	'HOST': '127.0.0.1',
	'PORT': '1521',
    }
}

LANGUAGE_CODE = 'es-co'

TIME_ZONE = 'UTF'

USE_I18N = True

USE_L10N = True

USE_TZ = True

STATIC_URL = '/static/'
