FROM sitespeedio/node:ubuntu-22-04-nodejs-20.10.0

# Install SQLite
RUN apt-get update && apt-get install -y sqlite3 libsqlite3-dev

# Set application working directory
WORKDIR /usr/src/app

# Copy files
COPY . .

# Expose port 80
EXPOSE 80

# Run application
CMD /bin/bash
