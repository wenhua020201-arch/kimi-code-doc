FROM nginx:latest
ADD nginx.conf /etc/nginx/nginx.conf
ADD .vitepress/dist /usr/share/nginx/html/code/docs
