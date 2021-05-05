FROM node:latest

COPY * /app/

WORKDIR /app

RUN npm i

CMD npm start
