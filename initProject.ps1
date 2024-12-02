docker build -t node4a -f Dockerfile .
docker run -d -p 80:80 --name node4a -v $(pwd):/usr/src/app -it --entrypoint=/bin/bash node4a
docker start node4a
docker exec -it node4a /bin/bash