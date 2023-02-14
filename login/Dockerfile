# BUILD
FROM node:14.17.3-alpine as build
WORKDIR /app
COPY login/package*.json ./
RUN npm cache clean --force
# RUN npm install -g @angular/cli@14.2.10
RUN npm install
# COPY login/ ./
RUN ls -la /app/*
RUN ng build --configuration=production
# # RUN ng serve --port 4250

# START
FROM nginx:latest as nginx
COPY login/dist/dashboard /usr/share/nginx/html
# RUN rm -rf /etc/nginx/conf.d/default.conf
# COPY --from=build app/default.conf /etc/nginx/conf.d
COPY login/nginx.conf /etc/nginx/conf.d/default.conf
# COPY dashboard/proxy.conf /etc/nginx/conf.d/default.conf
# COPY dashboard/fastcgi.conf /etc/nginx/conf.d/default.conf
# COPY dashboard/mime.types /etc/nginx/conf.d/default.conf
# RUN chmod -R 777 /usr/share/nginx/html
# ENTRYPOINT sudo nginx -c /etc/nginx/nginx.conf -g 'daemon off;'

# # EXPOSE 8094
