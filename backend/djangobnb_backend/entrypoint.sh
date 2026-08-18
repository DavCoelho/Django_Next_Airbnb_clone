#!/bin/sh

if [ "$DATABASE" = "postgres" ]; then
    while ! python -c "import socket; s = socket.socket(); s.connect(('$SQL_HOST', int('$SQL_PORT')))" 2>/dev/null; do
        sleep 0.1
    done
fi

python manage.py makemigrations
python manage.py migrate

STATIC_DIR="/usr/src/djangobnb_backend/staticfiles"
DJANGO_STATIC="/usr/local/lib/python3.12/site-packages/django/contrib/admin/static/admin"

mkdir -p "$STATIC_DIR/admin"
cp -r "$DJANGO_STATIC/"* "$STATIC_DIR/admin/"

exec "$@"