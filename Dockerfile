# Multi-stage build: build client + server, then run single Node server
FROM node:20-alpine AS build
WORKDIR /app

# Install root and server dependencies
COPY package*.json ./
COPY server/package*.json ./server/
RUN npm ci && npm --prefix server ci

# Copy source
COPY . .

# Build client and server
RUN npm run build:full

# Runtime image
FROM node:20-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production

# Copy built artifacts and server package
COPY --from=build /app/dist ./dist
COPY --from=build /app/server/dist ./server/dist
COPY --from=build /app/server/package.json ./server/package.json
COPY --from=build /app/server/package-lock.json ./server/package-lock.json

# Install only server production deps
RUN npm --prefix server ci --omit=dev

# Expose and run
ENV PORT=8080
EXPOSE 8080
CMD ["node", "server/dist/index.js"]
