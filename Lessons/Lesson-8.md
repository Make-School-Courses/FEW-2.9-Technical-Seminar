# FEW 2.9 - Lab

<!-- > -->

## Review 



<!-- > -->

# Learning Objectives



<!-- > -->


## Subscriptions with GraphQL

<!-- > -->

Subscriptions are described in the GraphQL docs but the implementation is left up to developers. Usually these would be implemented with a websocket.

<!-- > -->

There are several GraphQL librasries:

- express-graphql
- apollo-server-express
- graphql-yoga

<!-- > -->

For this I chose graphql-yoga. It seemed be to be the easiest to use. 

<small>(I started with express-graphql and coudln't get subscriptions to work.)</small>

<!-- > -->

### Build a GraphQL chat with Subscriptions 

Make a new folder for this project and navigate to that folder. 

Start by initializing a new npm project. 

```bash
npm init -y
```

Install graphql-yoga:

```bash
npm install graphql-yoga
```

Create a new file: server.js

In server.js follow these steps: 

Import dependencies: 

```JS
const { GraphQLServer, PubSub } = require('graphql-yoga')
```

Define the GraphQL Schema:

```JS

```
