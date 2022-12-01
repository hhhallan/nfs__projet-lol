# Need4Lol project

---

### Project create by Sahel, Hallan, Médéric

---

##### To install project in local

###### To install API (in project root) run :

- `composer install`

After install. Create `.env.local` file and past a content of `.env`

###### Replace default values by your values like :

- `APP_SECRET` An alphanumeric key `exemple : d4q54JKDQHFH56jkKJ4J8654`
- `DATABASE_URL` The information to connect to the database
- `API_KEY` API Key from your Riot account
- `CHAMPIONS_VERSION` Version of champions `exemple : 12.22.1`

###### After this create your database and load your fixtures :

if you use Symfony CLI start you commande with `symfony`

else use `php bin`

- `symfony console d:d:c`

- `symfony console d:m:m`

- `symfony console d:f:l --no-interaction`

##### To run dev serveur

- `symfony serve --no-tls`

---

###### To install front project. In root of project run :

- `cd client`

- `npm install`

##### To run devs serveur 

- `ng serve`

---

##### To run test

###### For API test (in project root) :

Create `.env.test.local` file and past a content of `.env.test`

###### Replace default values by your values like :

- `DATABASE_URL` The information to connect to the database
- `API_KEY` API Key from your Riot account
- `CHAMPIONS_VERSION` Version of champions `exemple : 12.22.1`

###### After this create your test database and load your fixtures :

- `symfony console --env=test d:d:c`

- `symfony console --env=test d:s:c`

- `symfony console --env=test d:f:l --no-interaction`

###### To run test

- `php bin/phpunit`

###### For Angular unit test (in client folder) :

- `ng test`
