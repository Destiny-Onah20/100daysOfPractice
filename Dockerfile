FROM node:16

RUN mkdir /app

WORKDIR /app

ARG PORT
ENV PORT $PORT

COPY package*.json ./

RUN npm install

COPY . ./

EXPOSE $PORT

CMD ["npm", "start"]