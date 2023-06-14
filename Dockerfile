FROM node:16 AS dist

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run dist

FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY --from=dist /app/dist ./dist

ARG PORT
ENV PORT $PORT

EXPOSE $PORT

CMD ["node", "./dist/server.js"]
