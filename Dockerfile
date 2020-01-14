FROM node:latest
WORKDIR /
COPY . .
RUN npm install
EXPOSE 3000

# Start Node server
CMD [ "npm", "start" ]