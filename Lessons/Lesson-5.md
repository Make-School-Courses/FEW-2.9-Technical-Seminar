# FEW 2.9 

<!-- > -->

## Review 

Mutations 

<!-- > -->

## Prisma 

Prisma is an ORM (Object-Relationship Mapper) you'll use this to connect your GraphQL resolvers to your data through your database. 

<!-- > -->

### Prisma Schema

The Prisma Schema describes the data model used by your GraphQL server and how it should map your database. 

<!-- > -->

#### Prisma Datasource

The datasource is the connection to the database that holds your data. 

The tutorial uses Sqlite but Prisma can work with any other database. 

<!-- > -->

#### Prisma Generator

Generates the Prisma client. 

<!-- > -->

#### Prisma Data Model 

Defines your resources that are stored in your database. These map to the types in your GraphQL schema. 

<!-- > -->



<!-- > -->


### Prisma Notes 

<!-- > -->

#### Summary of your workflow

To recap, this is the typical workflow you will follow when updating your data:

- Manually adjust your Prisma data model.
- Migrate your database using the prisma migrate CLI commands we covered.
- (Re-)generate Prisma Client
- Use Prisma Client in your application code to access your database.

<!-- > -->























One of GraphQLs biggest advantages is nested queries. 

## In Class 

The example project mocks up a Twitter like service. The service has several types that are referenced by other types.

The example mocks up a database in memory for simplicity. 

The schema defines several types 

- Tweet - An object representing a post
	- id
	- body
	- date 
	- Author
	- Stats
- User - An object describing a user in the system
	- id 
	- username
	- first_name
	- last_name
	- full_name
- Stat - An object with statistics about a Tweet
	- views
	- likes 
	- retweets
	- responses
- Notification - 
	- id
	- date
	- type 
	
## Nested Queries 

One of the biggest advantages of GraphQl is being able to query nested data. 

The root resolver doesn't allow for nested queries. Set up a resolver that handles nested queries by defining your schema. Then defining a object with property names that match your schema. 

The resolver needs to define sub properties representing each of the fields that can be requested by a query. 

## After Class 

Start GraphQL Node tutorial - due class 7 https://www.howtographql.com/graphql-js/0-introduction/