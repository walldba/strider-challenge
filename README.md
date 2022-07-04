# Strider Assessment Challenge

## Wallace Willer Jeronimo

### Linkedin: https://www.linkedin.com/in/walldba/

### Github: https://github.com/walldba

## Index

- [About](#about)
- [Usage](#usage)
- [Technologies](#technologies)
- [Postman](#postman)
- [Database Diagram](#database)
- [Critique](#critique)

## About

This app is a new social media application called Posterr. Posterr is very similar to Twitter, but it has far fewer features.

## Usage

To install all packages use the command:

```bash
yarn install
```

To run unit tests and check coverage:

```bash
yarn test:cov
```

To run e2e tests:

```bash
yarn test:e2e
```

To run the app use:

This command will create a container for the app and another container for the postgres and will run typeorm migration and will generate 4 users on database.

```bash
docker-compose up -d
```

This app run on port 3000.

To check the app health:

```bash
curl --location --request GET 'http://localhost:3000/api/'
```

## Technologies

- [NestJS](https://nestjs.com/)
- [Postgres](https://www.postgresql.org/)
- [TypeORM](https://typeorm.io/)
- [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) protocol to better organize my commits. I also used [Husky](https://github.com/typicode/husky) to add pre-commit lints and checks.

## Postman

Download the postman collection file [here](/docs/postman/striderChallenge.postman_collection.json)

This collection has the Home and User endpoints.

There is a user named Wallace90, and he has the ID: "fb33cbef-d427-4c37-92a8-5050403bfee4", this ID is being used in the Postman examples, but if you want to use another user, just check the Id's in the database.

## Database

![Alt text](/docs/databaseDiagram.png?raw=true 'Database Diagram')

## Critique

### If a had more time to code:

- I would like to write more unit tests and improve my code coverage, also would like to write a script using [Auto Cannon](https://www.npmjs.com/package/autocannon) and analyze the application using [ClinicJS](https://clinicjs.org/) to see the application behavior receiving many request at same time.

- I would like to test my queries performance because I believe they would be more performant if I wrote them natively rather than using the ORM.

### About scaling

- With the increase of posts and concurrent users, I believe that problems can happen, so I would like to use a message broker like [RabbitMQ](https://www.rabbitmq.com/) to receive new posts and users and ensure delivery and resiliency during the creation of posts and users and also be able to try again if some posts or users fail during the process.

- As we will have many simultaneous requests, I believe that using the cache would be a good option to improve our requests. So we would use [Redis](https://redis.io/) to save the latest posts and avoid the necessity to search on the database all the time.

- I think should be interesting if we can use some technology like Google Big Query or similar to find the most used words in posts and maybe use [Neo4J](https://neo4j.com/) or similar to collect insights about users and posts
