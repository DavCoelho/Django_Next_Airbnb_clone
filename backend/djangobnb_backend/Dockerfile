FROM python:3.12-slim

WORKDIR /usr/src/djangobnb_backend

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN apt-get update && apt-get install -y netcat-openbsd

RUN pip install --upgrade pip
COPY ./requirements.txt .
RUN pip install -r requirements.txt

COPY ./entrypoint.sh .
RUN sed -i 's/\r$//g' /usr/src/djangobnb_backend/entrypoint.sh
RUN chmod +x /usr/src/djangobnb_backend/entrypoint.sh

COPY . .

RUN python manage.py collectstatic --noinput --settings=djangobnb_backend.settings
RUN SECRET_KEY=dummy-build-key python manage.py collectstatic --noinput

ENV DJANGO_SETTINGS_MODULE djangobnb_backend.settings

ENTRYPOINT [ "/usr/src/djangobnb_backend/entrypoint.sh" ]
CMD ["daphne", "-b", "0.0.0.0", "-p", "8000", "djangobnb_backend.asgi:application"]