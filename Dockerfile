FROM node:16 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY --from=build /app/dist ./dist

ARG PORT
ENV PORT $PORT

EXPOSE $PORT

CMD ["node", "./dist/server.js"]
