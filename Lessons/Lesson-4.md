#  Mutations 

Mutations are queries that make changes or you could say mutate data. 

<!-- > -->

## Learning Objectives

1. Describe mutations
1. Define mutation queries 
1. Use Mutations 
1. Describe Resolvers

<!-- > -->

## Review

Write a Query and a Resolver for this schema: 

```JS
enum Zodiac {
	...
}
type Horoscope {
	date: String! 
	zodiac: Zodiac!
	desc: String!
}
```

Your resolver should take the a zodiac sign as a parameter and return a Horoscope.

<!-- > -->

## Resolvers 

Resolvers are where most of the magic happens in a GraphQL server. 

<!-- > -->

Each field in your schema is backed by a resolver function whose responsibility it is to return the data for that field. 

<!-- > -->

To turn that around, GraphQL queries are possible because there is a resolver function for each field. 

<!-- > -->

Imagine the type: 

```JS
type Time {
	hour: Int!
	minute: Int!
	second: Int!
}

type Query {
	getTime: Time!
}
```

<!-- > -->

To resolve Time we need a function that returns an object that has the fields defined by the type. 

```JS
const root = {
	getTime: () => {
		const now = new Date()
		const hour = now.getHours()
		const minute = now.getMinutes()
		const second = now.getSeconds()
		return { hour, minute, second }
	}
}
```

<small>(Here we're resolving the getTime Query to a Time type)</small>

<!-- > -->

Here is another way you could write a resolver for the Time type. 

```JS
type Query {
	Time: Time!
}
```

```JS
const root = {
	Time: {
		hour: () => new Date().getHours(),
		minute: () => new Date().getMinutes(),
		second: () => new Date().getSeconds()
	}
}
```

<small>Here the at the root is the Type and with a property that matches the name of each property that is a function that returns the value.</small>

<small>Here the Time type defines a resolver for each field.</small>

<!-- > -->

## Mutations

<!-- > -->

So far you've been using queries to get things from your GraphQL server. This is like a GET request with a REST server. 

Mutations are used to make changes at your GraphQL server. This is like a POST, PUT, or DELETE request with a REST server. 

<!-- > -->

Define a mutation in your schema with: 

```JS
# Schema
type Mutation {
	...
}
```

<small>starts with `type Mutation`</small>

<!-- > -->

Usually a Mutation will take some parameters and resolve to a type: 

```JS
# Schema
type Mutation {
	createUser(name: String!): User!
	post(url: String!, description: String!): Link!
}
```

<small>Mutations often return the thing they create, User, or Link in this example.</small>

<!-- > -->

When making a mutation **query** you'll start with the word "mutation"

```JS
# Query 
mutation {
	createUser(name: "Jo") {
		name
		id
	}
}
```

<!-- > -->

Note! Queries start with the key word Query. But we've been omitting it. 

```JS
# Query
query {
	getUsers {
		name
	}
}
```

<!-- > -->

## Mutation Challenges 

<!-- > -->

Using assignment 2 solve these challenges. 

<!-- > -->

**Challenge 1 - Add new thing**

Your server should serve a list of things from an array.

Add a mutation that adds a new thing to the list. Yout mutation function should take all of the required parameters need to create the new thing. 

<!-- > -->

Your type might look similar to this:

```JS
type Shoe {
	size: Float!
	color: Color!
	style: String!
}
```

<!-- > -->

Add a mutation query in your schema: 

```JS
type Mutation {
	addShoe(size: Float!, color: Color!, style: String!): Shoe!
}
```

<!-- > -->

**Challenge 2 - Add a resolver**

Add a resolver for your mutation. 

```JS
const root = {
  ...
	addShoe: ({ size, color, style }) => {
		const pet = { size, color, style }
		shoeList.push(shoe)
		return shoe
	}
}
```

<!-- > -->

**Challenge 3 - Test your work**

Test your work by writing a query. Start your server and use the Graphiql browser to write a mutation query: 

```JS
mutation {
  addShoe(size:9.5, color:Red, style: "Casual") {
    size
		color
  }
}
```

<!-- > -->

## start the Hackernews clone

<!-- > -->

The next assignment is to create a hacknews clone with GraphQL 

<!-- > -->

This assignment will use Apollo Server. Apollo is a GraphQL Server built on Node.

<!-- > -->

The project will also use Prisma. Prisma is an Object-Relationship Mapper (ORM.) Prisma will connect your resolvers to a data base. 

<!-- > -->

## Challenges

<!-- > -->

In class start on the Hacknews Clone: https://www.howtographql.com/graphql-js/0-introduction/

<!-- > -->

Get through the first 4 sections: 

- Introduction
- Getting Started 
- A Simple Query
- A Simple Mutation 

<!-- > -->

Explore the Apollo Browser. 

- Take a look at Docs on the right side
- Take a look Schema on the right side

<!-- > -->

**Stretch Challenge**

Solve the exercise at the end of section 4: A simple Mutation. 

<!-- > -->

## After Class 

- Start the GraphQL Node Tutorial: https://www.howtographql.com/graphql-js/0-introduction/

<!-- > -->

## Resources

- https://www.howtographql.com/graphql-js/0-introduction/
- https://www.prisma.io
- https://github.com/apollographql/apollo-server/tree/main/packages/apollo-server
