# Makefile

.PHONY: build-dev
build-dev:
	docker build -f Dockerfile.dev -t my-app:dev .

.PHONY: build-prod
build-prod:
	docker build -f Dockerfile.prod -t my-app:prod .