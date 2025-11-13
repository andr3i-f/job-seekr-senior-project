CONTAINER_TAG = job-seekr-frontend

buildDev:
	docker build -t $(CONTAINER_TAG) -f ./.docker/development.dockerfile .

runDev:
	docker run -it --rm --volume .:/app --publish 3000:3000 --env-file .env $(CONTAINER_TAG)

buildProd:
	docker build -t $(CONTAINER_TAG) .

runProd:
	docker run -it --rm --publish 3000:3000 --env-file .env $(CONTAINER_TAG)

buildRunProd:
	make buildProd
	make runProd

buildRunDev:
	make buildDev
	make runDev