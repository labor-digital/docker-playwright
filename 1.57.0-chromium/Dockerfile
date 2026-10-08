# Chromium-only variant of 1.57.0 (~1 GB instead of ~2.6 GB).
#
# Same OS, Node, fonts and system libraries as mcr.microsoft.com/playwright:v1.57.0-noble
# (it follows that image's Dockerfile.noble), minus Firefox, WebKit and full
# Chromium: only the Chromium headless shell is installed, which is what
# Playwright runs for headless Chromium since 1.49. Snapshots therefore render
# the same as with 1.57.0. Projects that test Firefox/WebKit or run headed
# Chromium keep using 1.57.0.
FROM ubuntu:noble

ARG DEBIAN_FRONTEND=noninteractive
ARG TZ=America/Los_Angeles
ARG NODE_VERSION=24
ARG PLAYWRIGHT_VERSION=1.57.0

ENV LANG=C.UTF-8
ENV LC_ALL=C.UTF-8

RUN apt-get update && \
    apt-get install -y curl wget gpg ca-certificates && \
    mkdir -p /etc/apt/keyrings && \
    curl -sL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg && \
    echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_${NODE_VERSION}.x nodistro main" >> /etc/apt/sources.list.d/nodesource.list && \
    apt-get update && \
    apt-get install -y nodejs && \
    apt-get install -y --no-install-recommends git openssh-client && \
    npm install -g yarn && \
    rm -rf /var/lib/apt/lists/* && \
    adduser pwuser

ENV PLAYWRIGHT_BROWSERS_PATH=/ms-playwright

# --with-deps installs the same fonts as the full image (Playwright installs its
# font set for every browser), so text renders identically.
RUN mkdir /ms-playwright && \
    mkdir /ms-playwright-agent && \
    cd /ms-playwright-agent && npm init -y && \
    npm i playwright-core@${PLAYWRIGHT_VERSION} && \
    npm exec --no -- playwright-core install --with-deps --only-shell chromium && \
    rm -rf /var/lib/apt/lists/* && \
    rm -rf /ms-playwright-agent && \
    rm -rf ~/.npm/ && \
    chmod -R 777 /ms-playwright

LABEL description="Labor Digital: Playwright testing environment (Chromium only)"

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
