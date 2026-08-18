#!/bin/sh

if [ "$DATABASE" = "postgres" ]; then
    echo "Checking if database is running..."

    while ! python -c "import socket; s = socket.socket(); s.connect(('$SQL_HOST', int('$SQL_PORT')))" 2>/dev/null; do
        sleep 0.1
    done

    echo "The database is up and running :-D"
fi

python manage.py makemigrations
python manage.py migrate

echo "===== STATIC FILE SETUP ====="

STATIC_DIR="/usr/src/djangobnb_backend/staticfiles"
DJANGO_STATIC="/usr/local/lib/python3.12/site-packages/django/contrib/admin/static/admin"

mkdir -p "$STATIC_DIR/admin"

echo "Source directory:"
ls -la "$DJANGO_STATIC"

echo "Copying admin static files..."

cp -rv "$DJANGO_STATIC/"* "$STATIC_DIR/admin/"

echo "===== STATIC DIRECTORY AFTER COPY ====="
find "$STATIC_DIR" -type f | head -30

echo "===== CHECKING BASE.CSS ====="
if [ -f "$STATIC_DIR/admin/css/base.css" ]; then
    echo "SUCCESS: base.css exists"
    ls -l "$STATIC_DIR/admin/css/base.css"
else
    echo "ERROR: base.css DOES NOT EXIST"
fi

echo "===== END STATIC FILE SETUP ====="

exec "$@"