FROM node:lts-alpine

WORKDIR /client

COPY . .

RUN npm install

EXPOSE 3000

CMD [ "npm", "start" ]
