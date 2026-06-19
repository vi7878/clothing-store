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
seed:
	docker compose exec backend sh backend/scripts/setup_db.sh
frontend-logs:
	docker compose logs -f frontend
frontend-shell:
	docker compose exec frontend sh
install-frontend:
	docker compose exec frontend npm install
