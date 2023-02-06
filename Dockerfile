FROM node:17-alpine

WORKDIR /app
COPY .output .

EXPOSE 3000 

ENTRYPOINT ["node", "server/index.mjs"]