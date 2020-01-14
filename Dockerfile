FROM node:latest
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 3000

# Start Node server
CMD [ "npm", "start" ]