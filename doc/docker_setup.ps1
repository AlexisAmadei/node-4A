# Build the Docker image
docker build -t node4a -f Dockerfile .

# Run the Docker container
docker run -d -p 80:80 --name node4a -v ${PWD}:/usr/src/app -it --entrypoint=/bin/bash node4a

# Start the Docker container
docker start node4a

# Execute a bash shell in the running container
docker exec -it node4a /bin/bash