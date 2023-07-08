# FROM node:16

# RUN mkdir /server

# WORKDIR /server

# ARG PORT
# ENV PORT $PORT

# COPY package*.json ./

# RUN npm install

# COPY . ./

# EXPOSE $PORT

# CMD ["node", "./dist/server.js"]

FROM node:alpine

RUN apk add --no-cache git openssh

RUN mkdir /app

WORKDIR /app

# COPY yarn*.lock ./

COPY package*.json ./

RUN npm install


# COPY .env ./

COPY tsconfig.json ./

COPY . ./

# RUN npm build

CMD ["npm", "start"]