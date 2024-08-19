FROM node:20

WORKDIR /app

COPY package.json /app
RUN npm install

COPY . /app

RUN npm run build

FROM nginx:alpine

COPY --from=0 /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

