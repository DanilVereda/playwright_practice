# Base Image
FROM mcr.microsoft.com/playwright:v1.58.2-noble

# Set working directory
WORKDIR /tests

# Copy test files and configuration
COPY . .

# Run tests
CMD ["npx", "playwright", "test"]