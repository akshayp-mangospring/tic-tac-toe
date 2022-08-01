FROM node:lts-alpine

COPY package*.json ./

RUN npm install

WORKDIR /server

RUN npm install

COPY . .

EXPOSE 4000

CMD [ "npm", "start" ]
