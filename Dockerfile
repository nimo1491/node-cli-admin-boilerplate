FROM mhart/alpine-node:7.10.0
MAINTAINER Nimo Hsieh <nimo1491@gmail.com>

WORKDIR /www

ADD . .

RUN npm install -g yarn
RUN yarn install
RUN yarn run build

EXPOSE 8080
CMD ["node", "built/server/server.js"]
