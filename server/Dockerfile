FROM node:12.2.0-alpine
LABEL maintainer="Christopher Feltner <chris.feltner@knights.ucf.edu>"

# Create app directory in container
RUN mkdir -p /install/server
WORKDIR /install/server

# Install dependencies
COPY package.json /install/server
COPY package-lock.json /install/server
RUN npm install
RUN npm install -g nodemon

ENV NODE_PATH=/install/server/node_modules

RUN mkdir -p /srv/app/server
WORKDIR /srv/app/server
COPY . /srv/app/server

EXPOSE 5000

# Run the server
CMD ["npm", "run", "dev"]
