FROM mhart/alpine-node

WORKDIR /usr/src/app

COPY package.json .

RUN yarn install

COPY . .
COPY .env_docker .env

EXPOSE 3000

CMD ["yarn", "start"]