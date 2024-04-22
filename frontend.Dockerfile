# Base image
FROM node:16-slim

# Create app directory
WORKDIR /front-end

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm install --no-optional

# Bundle app source
COPY front-end .

RUN npm i svelte
RUN npm i @sveltejs/kit
RUN npm i vite

# Start the server using the production build
CMD [ "npm", "run", "dev" ]