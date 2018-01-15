FROM nginx:1.13
MAINTAINER Lolo

# Add all necessary configurations
COPY conf/nginx.conf /etc/nginx/nginx.conf

# Expose HTTP
EXPOSE 80

VOLUME /var/log/nginx

CMD nginx
