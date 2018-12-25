FROM node:8-alpine
WORKDIR /usr/src/app
COPY package.json /usr/src/app
RUN apk add git
RUN apk add nano
RUN npm install
COPY ./ /usr/src/app
CMD node index.js
EXPOSE 3000
