FROM nginx:latest

WORKDIR /usr/share/nginx/html/

EXPOSE 81

COPY ./dist/pelucas-angular .