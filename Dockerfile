FROM node:18-alpine
RUN mkdir -p /app
COPY . /app
WORKDIR /app
RUN yarn install
EXPOSE 3000

