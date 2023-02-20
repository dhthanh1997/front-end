# BUILD
FROM node:14.17.3-alpine as build
WORKDIR /app
COPY login/package*.json ./
RUN npm cache clean --force
RUN npm install -g @angular/cli@14.2.10
RUN npm install
COPY login/ ./
RUN ls -la /app/*
RUN ng build --configuration=production
# # RUN ng serve --port 4250

# START
FROM nginx:latest as nginx
COPY --from=build app/dist/login /usr/share/nginx/html
COPY --from=build app/nginx.conf /etc/nginx/conf.d
RUN chmod -R 777 /usr/share/nginx/html

# # EXPOSE 8094
