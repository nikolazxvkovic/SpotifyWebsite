# Base image
FROM node:16-slim

# Create app directory
WORKDIR /rest-api

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

RUN apt-get update
RUN apt-get install -y openssl

# Install app dependencies
RUN npm install

# Bundle app source
COPY rest-api .

# Start the server using the production build
CMD [ "npm", "run", "start:dev" ]