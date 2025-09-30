CONTAINER_TAG = job-seekr-frontend

build:
	docker build -t $(CONTAINER_TAG) .

runDev:
	docker run -it --rm --volume .:/app --publish 3000:3000 --env-file .env $(CONTAINER_TAG)

buildRunDev:
	make build
	make runDev