FROM node:15-alpine

WORKDIR /app
EXPOSE 5000

ADD package.json ./package.json
ADD package-lock.json ./package-lock.json

RUN npm install
