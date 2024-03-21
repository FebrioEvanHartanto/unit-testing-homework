FROM node:18-alpine3.19

COPY package*.json .

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 8080

CMD ["npm", "run", "docker"]