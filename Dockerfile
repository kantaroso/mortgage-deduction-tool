FROM node:18.13-alpine3.16

WORKDIR /var/www/app

RUN apk update && apk add git

