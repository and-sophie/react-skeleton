FROM node:6.10-alpine

RUN mkdir -p /var/app/andigital-catalogue-web

WORKDIR /var/app/andigital-catalogue-web
COPY package.json ./
RUN npm install --only=production --silent

COPY server.js ./
COPY index.html ./
COPY build ./build

EXPOSE 8080

CMD node server.js
