# Bae Scheduler

Simple planner and scheduler to give you a hand in showing your appreciation for the special people in your life.

# Stack

Nodejs, Typescript, React, DynamoDB, AWS

# Local Server Setup

Install dependencies:

1. `cd server`
2. `npm i`

Setup DynamoDB local docker:

1. `cd server/local-development`
2. `docker-compose up` or `sudo docker-compose up`

Seed local DynamoDB with tables:

1. `cd server && npm run seed:dynamodb-local`
