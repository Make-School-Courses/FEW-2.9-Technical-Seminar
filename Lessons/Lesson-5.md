# FEW 2.9 - GraphQL ORM

<!-- > -->

## Review 

Imagine you are working on a GraphQL card game. 

```JS
enum Suit {
	...
}

type Card {
	value: Int!
	suit: Suit!
}

type Hand {
	cards: [Card!]!
}
```

<!-- > -->

- Define a mutation that draws a card. 
- Define a mutation that discards a card.

<!-- > -->

# Learning Objectives

1. Describe Object Relation Mapper
1. Describe Prisma
1. Use ORM (Prisma)
1. Use Apollo Server

<!-- > -->

## Prisma 

Prisma is an ORM (Object-Relationship Mapper) you'll use this to connect your GraphQL resolvers to your data through your database. 

<!-- > -->

Prisma integrates with many databases: PostgreSQL, MySQL, SQLite.  

<!-- > -->

Much like GraphQL Prisma uses a Schema to define data models and relationships.

In the tutorial you'll be defining models for Users, and Links. You'll also define a relationship: A Link is associated with a User, and Users have a list of Links. 

<!-- > -->

Prisma isn't the database. Instead it's the Glue that conttects the database with a client. 

Client <-- --> **Prisma** <-- --> Database 

<!-- > -->

Prisma integrates with Express.js, GraphQL, Apollo and more. 

<!-- > -->

### Prisma Schema

The Prisma Schema describes the data model used by your GraphQL server and how it should map your database. 

<!-- > -->

#### Prisma Datasource

<!-- > -->

The datasource is the connection to the database that holds your data. 

The tutorial uses Sqlite but Prisma can work with any other database. 

We need to tell Prisma what type of database we're working with. 

<!-- > -->

#### Prisma Generator

<!-- > -->

Generates the Prisma client. Someone needs to write all of the code that connects Prisma with your database. 

```JS
generator client {
  provider = "prisma-client-js"
}
```

This generates the Prisma client code code. 

<!-- > -->

Take a look in: node_modules/prisma/prisma-client

The code here is created by the generator. 

<!-- > -->

#### Prisma Data Model 

<!-- > -->

Defines your resources that are stored in your database. These map to the types in your GraphQL schema. 

<!-- > -->

A model should mirror your GraphQL types. 

<!-- > -->

```JS
model Link {
	// field  Type     is an id and the value is atomatically generated
  id          Int      @id @default(autoincrement())
	// field  Type     Automatically generated
  createdAt   DateTime @default(now())
  description String
  url         String
	// name  Type      
  postedBy    User?    @relation(fields: [postedById], references: [id])
  postedById  Int?
}
```

<!-- > -->

### Prisma Notes 

<!-- > -->



<!-- > -->

## Apollo Server

<!-- > -->

Apollo Server is ...

<!-- > -->



<!-- > -->


#### Summary of your workflow

To recap, this is the typical workflow you will follow when updating your data:

- Manually adjust your Prisma data model.
- Migrate your database using the prisma migrate CLI commands we covered.
- (Re-)generate Prisma Client
- Use Prisma Client in your application code to access your database.

<!-- > -->

<!-- > -->

## In Class 

<!-- > -->

Work on the Hackernews clone tutorial. 

- https://www.howtographql.com/graphql-js/0-introduction/

<!-- > -->

## After Class 

- Continue the Hackernews clone GraphQL tutorial