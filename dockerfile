FROM docker.io/node:18.15-slim

WORKDIR /app
COPY ./dist/apps/ .
RUN npm install --omit=dev
EXPOSE 3030

# Start the server
CMD ["node", "/app/api/main.js"];