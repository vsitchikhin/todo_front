# back

## Для запуска проекта необходимо

### Создать базу данных и пользователя
```
DB_NAME=bnovo_test
DB_USER=bnovo_test_user
DB_PASS=bnovo123456
```
### Записать в `.env`
```
DATABASE_URL="postgresql://bnovo_test_user:bnovo123456@localhost:5432/bnovo_test?schema=public"
PORT=4000
```


```
bun install
bun prisma generate
bun prisma migrate deploy
bun run start
```

# front

## Для запуска проекта необходимо
```
npm install
```
### Записать в `.env`
```
VUE_APP_API_HOST='http://localhost:4000/api'
```

```
npm run serve
```
Приложение будет запущено на ` http://localhost:8080/`