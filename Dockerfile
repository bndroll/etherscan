FROM node:16-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY ./package*.json ./
RUN npm install
COPY . ./
EXPOSE 5050
RUN npm run build
CMD npm run migration:run && node dist/src/main.js
