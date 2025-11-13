FROM node:24-slim

RUN mkdir /app
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN chmod +x ./docker-entrypoint.sh

RUN npm run build

EXPOSE 3000

ENTRYPOINT [ "./docker-entrypoint.sh" ]