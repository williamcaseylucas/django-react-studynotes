activate:
	./activate.sh

migrate:
	cd mynotes && python manage.py migrate

runserver:
	cd mynotes && python manage.py runserver