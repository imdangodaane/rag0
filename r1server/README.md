# zeRO (Service)

## Tools (development only)
<em>This is brain dump cheatsheet from current maintainer, please remove it in production</em>
### Generate Entities (schema/model) using typeorm-model-generator from PostgresDB (Docker)
```
npx typeorm-model-generator -h localhost -p 3306 -d zeROtest -u root -x password -e mysql -o src/
```
### Create new migration file
```
npx typeorm migration:create -n <migration_name> -d src/migrations
```
### Import database to mysql docker
```
docker exec -i <container_id> mysql -u"root" -p"password" <database_name> < all_files.sql
```
### Go to mysql container
```
docker exec -it <containter_id> mysql -u"root" -p"password"
```