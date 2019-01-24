# Schemas and Types 

Use a schema to define what your GraphQL API can provide. 

Types allow strong typing of data provided from the API. 

## GRaphQL and Express

Today we will look at a simple example implementing GraphQL with Express. This is important since it put GraphQL in a context that you have experience with. 

## Class Learning Objectives/Competencies

1. Define a GraphQL Schema
1. Define a GraphQL Resolver
1. Use GraphQL Queries 
1. Define GraphQL Resolver
1. Use GraphiQL

## Getting Started

- `npm init`
- `npm install --save express express-graphql graphql`
- Setup a default boilerplate express project

Import dependencies 

```JavaScript 
const express = require('express')
const graphqlHTTP = require('express-graphql')
const { buildSchema } = require('graphql')
```

Define a schema 

```JavaScript 
const schema = buildSchema(`
  type About {
		message: String
	}

	type Query {
    getAbout: About
  }
`)
```

Define a resolver 

```JavaScript 
const root = {
  getAbout: () => {
    return { message: 'Hello World' }
  }
}
```

Create Express, add middelware, and start the app 

```JavaScript 
const app = express()

app.use('/graphql', graphqlHTTP({
  schema, 
  rootValue: root, 
  graphiql: true
}))

const port = 4000
app.listen(port, () => {
  console.log('Running on port:'+port)
})
```

This is equivalent of a GraphQL "Hello World"

## GraphiQL

Test your GraphQL API in GraphiQL by visiting: http://localhost:4000/graphql

GraphiQL is an IDE for exploring and testing GraphQL. Think of it like PostMan for GraphQL. 

GraphiQL has three panels.  

- Left: Code editor: Write your GraphQL queries here
- Centewr: Output: See the results of your query here
- Right: Docs: Documents your GraphQL Schema

Test a query

```GraphQL
query {
  getAbout{
    message
  }
}
```

## Simple Queries and Resolvers

Resolvers are used to determine what is returned from a query. 

Resolver keys must match the scheme under query, and returns values that match the type. In the example `getAbout` in the query maps to `getAbout` in the resolver. This function is required to returned an object with a key of `message` that has a value type of String. 

## Practice Challenges 

- You need to return the time 
- You need to return the date
- Better to get both create a type has a date and a time
- You need to return a random number
- Return a random number in a range
- You need to return an array of rolls
- Sepcify the number sides and the number rolls
- Return the total along with the rolls

## After Class 

- Start the GraphQL + Node tutorial

## Resources 

- https://graphql.org/graphql-js/graphql/
- https://github.com/graphql/express-graphql