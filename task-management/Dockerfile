## BUILD
# FROM node:14.17.3-alpine as build
# WORKDIR /app
# COPY ./task-management/package*.json ./
# RUN npm cache clean --force
# RUN npm install -g @angular/cli@14.2.10
# RUN npm install
# COPY ./task-management ./
# # RUN ls -la /app/*
# # RUN npm run build --configuration=production
# RUN ng build --configuration=production

## START
FROM nginx:1.17.1-alpine as nginx
WORKDIR /app
COPY app/dist/task-management/* /app/
RUN ls -la /app
# COPY  --from=build app/dist/task-management /usr/share/nginx/html
# COPY  --from=build app/nginx.conf /etc/nginx/conf.d
RUN ls -la /usr/share/nginx/html/*
COPY ./task-management/nginx.conf /etc/nginx/conf.d
RUN chmod -R 777 /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]

# EXPOSE 9096
