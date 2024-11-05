FROM oven/bun:latest

WORKDIR /app

# Copy package.json and other configuration files
COPY package.json .
COPY tsconfig.json .
COPY bun.lockb .

# Install dependencies
RUN bun install

# Copy source files
COPY src/ src/
COPY index.ts .

# Set environment variables
ENV NODE_ENV=production
ENV PORT=10000

# Expose the port used by render.com
EXPOSE 10000

# Start the server
CMD ["bun", "run", "prod:server"]