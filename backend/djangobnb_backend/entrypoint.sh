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

echo "===== PREPARING STATIC FILES ====="

mkdir -p /usr/src/djangobnb_backend/staticfiles/admin

cp -r /usr/local/lib/python3.12/site-packages/django/contrib/admin/static/admin/* \
    /usr/src/djangobnb_backend/staticfiles/admin/

echo "Django admin static files copied:"
find /usr/src/djangobnb_backend/staticfiles/admin -type f | head -20

echo "===== END PREPARING STATIC FILES ====="

exec "$@"