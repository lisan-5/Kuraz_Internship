# docker/backend.dockerfile
FROM node:16-alpine

WORKDIR /app
COPY backend/package*.json ./
RUN npm ci --only=production

COPY backend/ ./
EXPOSE 3000

CMD ["node", "server.js"]