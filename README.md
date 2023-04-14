## Setup
Install dependencies
```
npm install
```
Create docker container from docker-compose.yml file
```
docker-compose up -d
```
Run prisma to deploy the orm model on the db
```
npx prisma migrate dev
```

Run on port 5000
```
npm run start
```

Registration endpoint is on
' /api/auth/register '
it requires username, email and password which can be passed either as json with Content-Type header or via x-www-form-urlencoded

Login Endpoint is on
' /api/auth/login '
it requires username and password which can be passed either as json with Content-Type header or via x-www-form-urlencoded

Get all users endpoint is on
' /api/users/getall ' and is protected via a basic auth middleware, 
so the request authorization header must be set as basic auth (Basic 'user and password encoded in base64' )

