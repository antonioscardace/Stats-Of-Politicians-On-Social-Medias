docker compose down
docker volume rm $(docker volume ls -q)

docker compose build mysql-politics
docker compose build grafana-charts
docker compose build py-crawler
docker compose build node-ui

docker compose up -d
