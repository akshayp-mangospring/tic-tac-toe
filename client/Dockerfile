FROM node:lts-alpine

COPY package*.json ./

RUN npm install

WORKDIR /client

COPY . .

RUN npm install

EXPOSE 3000

CMD [ "npm", "start" ]
