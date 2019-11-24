FROM node:12.2.0-alpine
LABEL maintainer="Christopher Feltner <chris.feltner@knights.ucf.edu>"

# Create app directory in container
RUN mkdir -p /srv/app/server
WORKDIR /srv/app/server

ENV NODE_ENV=development

# Install dependencies
COPY package.json /srv/app/server
COPY package-lock.json /srv/app/server
RUN npm install
RUN npm install -g nodemon

COPY . /srv/app/server

# Run the server
CMD ["npm", "run", "dev"]
