# Ethereum Scan

### Run
1. Create /.env file with following content
```
POSTGRES_PORT=5432
POSTGRES_USERNAME=secretuser
POSTGRES_PASSWORD=secretpass
POSTGRES_DATABASE=exchanger
PGDATA=./var/lib/postgresql/data
```
2. Create /.production.env file with following content
```
NODE_ENV=production

PORT=5050

POSTGRES_HOST=exchanger-postgres
POSTGRES_PORT=5432
POSTGRES_USERNAME=secretuser
POSTGRES_PASSWORD=secretpass
POSTGRES_DATABASE=exchanger

START_BLOCK_NUMBER=17583000
```
3. Run ``docker compose -f ./docker-compose.production.yml up -d --build``