FROM node:12.16.2-alpine3.11 as builder

ENV NG_CLI_ANALYTICS=false

WORKDIR /app

COPY package.json yarn.lock ./

# Doing this in a separate layer will prevent unnecessary dependency resolution
# on each build
RUN yarn install

COPY . .

# Build the angular app in production mode. Artifacts will be stored in dist/
RUN $(yarn bin)/ng build --prod --build-optimizer

FROM nginx:1.18.0-alpine

# Remove default nginx website
RUN rm /etc/nginx/conf.d/default.conf && rm -rf /usr/share/nginx/html/*

COPY kashti.nginx.conf /etc/nginx/conf.d/kashti.conf

# Make a directory where we can later put Brigade API server reverse proxy
# configuration
RUN mkdir -p /etc/nginx/kashti.conf.d

# Copy build artifacts from build stage
# COPY --from=builder /app/dist/kashti /usr/share/nginx/kashti
COPY --from=builder /app/dist/kashti /usr/share/nginx/kashti

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
