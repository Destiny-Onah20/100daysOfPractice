FROM node:16

RUN mkdir /server

WORKDIR /server

ARG PORT
ENV PORT $PORT

COPY package*.json ./

RUN npm install

COPY . ./

EXPOSE $PORT

CMD ["npm", "start"]