FROM oven/bun

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
COPY .env .

# Set environment variables
ENV NODE_ENV=production

# Expose the default port (assuming 3000 from the dev script)
EXPOSE 3000

# Start both the server and make-agent
CMD ["sh", "-c", "bun run dev:server"]