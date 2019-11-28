FROM node:12.2.0-alpine

RUN mkdir -p /srv/app/client
WORKDIR /srv/app/client

# ENV PATH /app/node_modules/.bin:$PATH

COPY package.json /srv/app/client
COPY package-lock.json /srv/app/client

RUN npm install

COPY . /srv/app/client

EXPOSE 3000

CMD ["npm", "start"]