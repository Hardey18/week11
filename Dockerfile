FROM node:12

WORKDIR /var/www/graphql

COPY . .

RUN npm install

RUN npx tsc

EXPOSE 3000

CMD npm start