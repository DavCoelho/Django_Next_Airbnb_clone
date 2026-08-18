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

echo "===== STATIC FILE TEST ====="
python manage.py findstatic admin/css/base.css --verbosity 2
echo "===== END STATIC FILE TEST ====="

echo "===== STATIC ROOT TEST ====="
ls -la /usr/src/djangobnb_backend/
echo "----- staticfiles -----"
ls -la /usr/src/djangobnb_backend/staticfiles/ || true
echo "===== END STATIC ROOT TEST ====="

python manage.py collectstatic --noinput --verbosity 2

echo "===== AFTER COLLECTSTATIC ====="
ls -la /usr/src/djangobnb_backend/staticfiles/ || true
find /usr/src/djangobnb_backend/staticfiles/ -type f | head -20 || true
echo "===== END AFTER COLLECTSTATIC ====="

exec "$@"