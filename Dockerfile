FROM node:24-slim

RUN mkdir /app
WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3000
ENTRYPOINT [ "/bin/bash" ]