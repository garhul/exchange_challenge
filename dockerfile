FROM docker.io/node:18.15-slim

# Run api setup
WORKDIR /api
COPY ./dist/apps/api .
RUN npm install --omit=dev
EXPOSE 3030

# Run frontend setup
WORKDIR /frontend
COPY ./dist/apps/fe .
RUN npm install --omit=dev

# Start the server
CMD ["node", "/api/main.js"]



