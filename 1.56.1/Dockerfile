FROM mcr.microsoft.com/playwright:v1.56.1-noble

LABEL description="Labor Digital: Playwright testing environment"

WORKDIR /app

# Add the package.json only first
ADD app/package.json /app

# Install our npm test dependencies
RUN npm cache clean --force
RUN npm install

# Now add all the other files to improve docker layer caching
ADD app/. /app
RUN chmod +x /app/test.sh
RUN chmod +x /app/test-update.sh