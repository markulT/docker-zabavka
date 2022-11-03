FROM node:16
WORKDIR /usr/src/app
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY /server/package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY /server .

# Creates a "dist" folder with the production build
RUN npm run build

# Start the server using the production build
CMD [ "node", "dist/main.js" ]