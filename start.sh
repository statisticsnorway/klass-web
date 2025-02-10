#!/bin/sh
# Create nginx temp directories
mkdir -p /tmp/nginx/client_body
mkdir -p /tmp/nginx/proxy
mkdir -p /tmp/nginx/fastcgi
mkdir -p /tmp/nginx/uwsgi
mkdir -p /tmp/nginx/scgi

# Start nginx
exec nginx -g 'daemon off;'