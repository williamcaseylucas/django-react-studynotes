activate:
	./activate.sh

migrate:
	cd django-backend && cd mynotes && python manage.py migrate

runserver:
	cd django-backend && cd mynotes && python manage.py runserver