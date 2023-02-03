FROM node:latest
ENV PORT = 80
RUN mkdir /app
WORKDIR /app
COPY . /app
RUN npm install
EXPOSE 80
CMD [ "node", "server.js" ]
