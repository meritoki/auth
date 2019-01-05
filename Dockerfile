FROM node:8-alpine
WORKDIR /
COPY ./ /
RUN apk add git
RUN apk add nano
RUN npm install
CMD node index.js
EXPOSE 3000
