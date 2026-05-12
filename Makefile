up:
	docker compose up -d
down:
	docker compose down
migrate:
	docker compose exec backend python manage.py migrate
shell:
	docker compose exec backend python manage.py shell
logs:
	docker compose logs -f backend
frontend-logs:
	docker compose logs -f frontend
frontend-shell:
	docker compose exec frontend sh
install-frontend:
	docker compose exec frontend npm install
