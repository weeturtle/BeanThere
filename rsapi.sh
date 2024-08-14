# Stop the server-api container
docker compose stop server-api
docker compose build server-api
docker compose up -d server-api
