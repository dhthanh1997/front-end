# ## BUILD
# FROM node:14.17.3-alpine as build
# WORKDIR /app
# COPY package*.json ./
# RUN npm install -g @angular/cli@14.2.10
# RUN npm install
# COPY ./ ./
# # RUN ls -la /app/*
# RUN ng build --configuration=production

## START
FROM nginx:1.17.1-alpine as nginx
WORKDIR /app
# COPY  --from=build app/dist/task-management /usr/share/nginx/html
# COPY  --from=build app/nginx.conf /etc/nginx/conf.d
COPY dist/task-management/* /usr/share/nginx/html
RUN ls -la /usr/share/nginx/html/*
COPY nginx.conf /etc/nginx/conf.d
RUN chmod -R 777 /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]

# EXPOSE 9096
