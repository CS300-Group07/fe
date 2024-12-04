FROM node:20.3.0 AS build 

WORKDIR /app 

COPY . .

RUN npm install

RUN npm run build 

FROM nginx:1.21.3 

COPY --from=build /app/build /usr/share/nginx/html 

CMD ["nginx", "-g", "daemon off;"] 

