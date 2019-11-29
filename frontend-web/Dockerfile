FROM node:12.2.0-alpine

RUN mkdir -p /srv/app/client
WORKDIR /srv/app/client

# Install dependencies
COPY package.json /srv/app/client
COPY package-lock.json /srv/app/client
RUN npm install
RUN npm install -g nodemon

COPY . /srv/app/client

EXPOSE 3000

CMD ["npm", "start"]