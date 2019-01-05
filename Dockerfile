FROM node:8-alpine
WORKDIR /
COPY package.json /
RUN apk add git
RUN apk add nano
RUN npm install
RUN newman run ./postman/auth.postman_collection.json --reporters cli,junit --reporter-junit-export newman.xml --insecure
COPY ./ /
CMD node index.js
EXPOSE 3000
