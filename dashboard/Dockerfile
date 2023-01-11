# BUILD
FROM node:14.17.3-alpine as build
WORKDIR /app
COPY dashboard/package*.json ./
RUN npm cache clean --force
RUN npm install -g @angular/cli@14.2.10
RUN npm install
COPY dashboard/ ./
RUN ls -la /app/*
RUN ng build --configuration=production

# START
FROM nginx:latest as nginx
COPY --from=build app/dist/dashboard /usr/share/nginx/html
COPY --from=build app/nginx.conf /etc/nginx/conf.d/default.conf
RUN chmod -R 777 /usr/share/nginx/html
# ENTRYPOINT sudo nginx -c /etc/nginx/nginx.conf -g 'daemon off;'

# EXPOSE 8094
