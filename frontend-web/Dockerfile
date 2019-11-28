FROM node:12.2.0-alpine

# Create app directory in container
RUN mkdir -p /install/client
WORKDIR /install/client

# Install dependencies
COPY package.json /install/client
COPY package-lock.json /install/client
RUN npm install
RUN npm install -g nodemon

ENV NODE_PATH=/install/client/node_modules

RUN mkdir -p /srv/app/client
WORKDIR /srv/app/client
COPY . /srv/app/client

EXPOSE 3000

CMD ["npm", "start"]