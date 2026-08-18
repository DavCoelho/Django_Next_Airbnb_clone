FROM python:3.12-slim

WORKDIR /usr/src/djangobnb_backend

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV DJANGO_SETTINGS_MODULE djangobnb_backend.settings

RUN apt-get update && apt-get install -y netcat-openbsd

RUN pip install --upgrade pip
COPY ./requirements.txt .
RUN pip install -r requirements.txt

COPY ./entrypoint.sh .
RUN sed -i 's/\r$//g' /usr/src/djangobnb_backend/entrypoint.sh
RUN chmod +x /usr/src/djangobnb_backend/entrypoint.sh

COPY . .

RUN SECRET_KEY=dummy-build-key \
    DJANGO_SETTINGS_MODULE=djangobnb_backend.settings_build \
    python manage.py collectstatic --noinput

ENTRYPOINT [ "/usr/src/djangobnb_backend/entrypoint.sh" ]
CMD ["daphne", "-b", "0.0.0.0", "-p", "8000", "djangobnb_backend.asgi:application"]