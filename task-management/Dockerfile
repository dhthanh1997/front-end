# BUILD
FROM node:14.17.3-alpine as build
WORKDIR /app
COPY task-management/package*.json ./
RUN npm install
COPY task-management/ ./
RUN ng build --configuration=production

# START
FROM nginx:1.17.1-alpine as nginx
COPY --from=build app/dist/task-management /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d
RUN chmod -R 777 /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]

EXPOSE 80
