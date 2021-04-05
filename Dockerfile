FROM node:15-alpine

WORKDIR /dependencies
EXPOSE 5000

ADD package.json package.json
ADD package-lock.json package-lock.json

RUN npm install

ENV NODE_PATH=/dependencies/node_modules

RUN rm package.json package-lock.json

WORKDIR /app