# BUILD
# FROM node:14.17.3-alpine as build
# WORKDIR /app
# COPY task-management/package*.json ./
# RUN npm install -g @angular/cli@14.2.10
# RUN npm install
# COPY task-management/ ./
# RUN ls -la /app/*
# RUN ng build --configuration=production

# START
FROM nginx:1.17.1-alpine as nginx
WORKDIR /app
COPY  task-management/dist/task-management /usr/share/nginx/html
COPY  task-management/nginx.conf /etc/nginx/conf.d
RUN chmod -R 777 /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]

# EXPOSE 9096
