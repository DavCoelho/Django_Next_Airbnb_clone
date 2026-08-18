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

echo "===== CREATING STATIC DIRECTORY ====="
mkdir -p /usr/src/djangobnb_backend/staticfiles
echo "Static directory created:"
ls -la /usr/src/djangobnb_backend/staticfiles
echo "===== END CREATING STATIC DIRECTORY ====="

echo "===== COLLECTING STATIC FILES ====="
python manage.py collectstatic --noinput --clear --verbosity 2
echo "===== END COLLECTING STATIC FILES ====="

echo "===== CHECKING COLLECTED FILES ====="
ls -la /usr/src/djangobnb_backend/staticfiles/
find /usr/src/djangobnb_backend/staticfiles/ -type f | head -20
echo "===== END CHECKING COLLECTED FILES ====="

exec "$@"