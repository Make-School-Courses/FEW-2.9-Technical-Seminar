# Schemas and Types

<!-- > -->

Use a schema to define what your <br> GraphQL API can provide.

Strong typing of data provide allows for introspection.

<!-- > -->

## GraphQL and Express

Today we will look at a simple example implementing GraphQL with Express. This is important since it puts GraphQL in a context that you have experience with.

<!-- > -->

## Class Learning Objectives/Competencies

1. Define a GraphQL Schema
1. Define a GraphQL Resolver
1. Use GraphQL Queries
1. Use GraphiQL

<!-- > -->

## Review 

<!-- > -->

### GraphQL Queries 

Use: https://graphql.org/swapi-graphql to answer these questions...

<!-- > -->

- Who is person 10?
  - name?
  - eyecolor?
  - height?

<!-- > -->

- What movies did they appear in? 
  - totalCount?
  - titles?

<!-- > -->

- What about vehicles?
  - totalCount?
  - names?

<!-- > -->

## GraphQL Schemas

<!-- > -->

A GraphQL Schema contains a set of Types that describe the possible you can query from a service. 

<!-- > -->

Schemas are written in the GraphQL Schema language which is similar to the Query language. 

<!-- > -->

The SWAPI might define a person like this: 

```JS
type Person {
  name: String!
  ...
}
```

name is a field and String is it's type. ! means the field is non-nullable (it will always return a value.)  

<!-- > -->

```JS
type Person {
  name: String!
  height: Int!
  eyecolor: String!
  films: [films!]!
}
```

You can use types like: Int and [ ... ] (array)

<!-- > -->

GraphQL supports: 

- Int: Integer
- Float: Decimal
- String: String
- Boolean: true or false
- ID: Special type that represents a unique value
- [Type]: Array of a type

<!-- > -->

The elements in a list are typed and they will all be the same type. 

```JS
type MyType {
  favNumbers: [Int!]!
  favFoods: [String!]!
}
```

<!-- > -->

What about a Recipe type: 

```JS 
type Recipe {
  name: String! # Name is a string and must be there
  description: String # Description is a string and 
                      # might be missing
}
```

<small>(the ! means a field must have a value)</small>

<!-- > -->

A recipe might have a list of ingredients. 

```JS 
type Recipe {
  name: String!
  description: String
  ingredients: [String!]! # Must have a list of Strings
                          # and none of those strings can be 
                          # null
}
```

<!-- > -->

The Recipe type needs some more information: 

```JS
type Recipe {
  name: String!
  description: String
  ingredients: [String!]! 
  isSpicy: Boolean!
  isVegetarian: Boolean!
}
```

<!-- > -->

### Enum

<!-- > -->

The GraphQL Schema language supports enumerations.

<!-- > -->

An enumeration is a list of set values.

<!-- > -->

The Recipe type needs some more information: 

```JS
enum MealType {
  breakfast
  lunch
  dinner
}

type Recipe {
  ...
  mealType: MealType! # Can only be breakfast, lunch or dinner
}
```

<small>(Validates and restricts values to one from the list)</small>

<!-- > -->

### Interface

<!-- > -->

An interface is a description or contract that describes types that conform to it. 

<!-- > -->

Imagine characters in the films could be humans or droids. 

```JS 
interface Character {
  name: String!
  films: [film!]!
}

type Human implements Character {
  name: String!
  eyeColor: String!
  films: [film!]!
}

type Droid implements Character {
  name: String!
  films: [film!]!
  primaryFunction: String!
}
```
<small>(Anything that implements the interface must include name and films)</small>

<!-- > -->

An interface is also a type. For example: 

```JS
type Film {
  title: String!
  cast: [Character!]! 
}
```

<small>(Here everyone in the cast is a Character but they might also be a Human or a Droid)</small>

<!-- > -->

## GraphQL and Express

<!-- > -->

Get started with GraphQL and Express. The goal of this section is to create an Express server that implements GraphQL.  

<!-- > -->

- Create a new folder
- Initialize a new npm project: `npm init -y`
- Install dependancies: `npm install --save express express-graphql graphql`
- Create a new file: `server.js`

<!-- > -->

Edit `package.json`

```json
  "scripts": {
    "start": "nodemon server.js"
  }
```

You can now run your project with: 

```bash
npm start
```

<!-- > -->

Add the following to `server.js`. Import dependancies:

```JS
// Import dependancies
const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')
```

<!-- > -->

Build a schema. Add the following to `server.js`.  

```JS
// Create a schema
const schema = buildSchema(`
type About {
  message: String!
}

type Query {
  getAbout: About
}`)
```

<small>(The schema is written in the GraphQL schema language, buildSchema() takes the schema as a string and returns a schema object)</small>

<!-- > -->

Define a resolver. A resolver 

```JS
// Define a resolver
const root = {
  getAbout: () => {
    return { message: 'Hello World' }
  }
}
```

<small>(A resolver is a function that's responsible for returning the results of a query. You might a say a resolver resolves a query.)</small>

<!-- > -->

Create an Express app: 

```JS
// Create an express app
const app = express()
```

<small>(Standard Express.)</small>

<!-- > -->

Define a route. Use `graphqlHTTP` to handle requests to this route. 

```JS
// Define a route for GraphQL
app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true
}))
```

We need to supply the schema, the root resolver, and last we'll activate the GraphiQL browser. 

<!-- > -->

last, start your app: 

```JS
// Start this app
const port = 4000
app.listen(port, () => {
  console.log('Running on port:'+port)
})
```

<small>(Standard Express app)</small>

<!-- > -->

Test your work! 

- `npm start` run your app
- http://localhost:4000/graphql

This should open GraphiQL in your browser. 

GraphiQL allows us to test our GraphQL Queries. Its the same tool you used in the last class. 

<!-- > -->

Try a query: 

```JS
{
  getAbout {
    message
  }
}
```

Compare this to schema and the resolver. 

- query type: getAbout
  - returns Type About
    - An About has a field message of type String

<!-- > -->

Let's follow this backwards. Starting with this query: 

```JS
{
  getAbout {
    message
  }
}
```

<!-- > -->

GraphQL handles with a resolver: 

```JS
const root = {
  getAbout: () => {
    return { message: 'Hello World' }
  }
}
```

It returns an object with a message property that is type string. 

<!-- > -->

The Resolver checked this against the schema. 

```JS
type About {
  message: String!
}

type Query {
  getAbout: About
}
```

The getAbout query returns an About which always has a message of type String. 

<!-- > -->

## GraphQL Resolvers 

<!-- > -->

A resolver is responsible for resolving a query. Resolvers can be hierarchical and complicated. It's probably where most of your work will go when building a GraphQL system. 

<!-- > -->

This is the root resolver. <br> It maps queries to the schema.

```JS
const root = {
  getAbout: () => {
    return { message: 'Hello World' }
  }
}
```

<small>(getAbout maps to the query type with the same name)</small>

<!-- > -->

Let's do it again from the top. 

<!-- > -->

Imagine you're making making API for yourself. Imagine a query is like asking you a question. The repsonse is like the answer you might provide. 

<!-- > -->

Define a new type in your schema. If someone asks what to eat? You would reply with a meal type. 

```JS
type Meal {
	description: String!
}
```

<!-- > -->

Add a query type to handle meal queries. It will return a Meal. 

```JS
type Query {
  getAbout: About
	getmeal: Meal
}
```

<!-- > -->

Add a resolver function. This function returns something that must match the Meal type (has description field of type string)

```JS
const root = {
  getAbout: () => {
    return { message: 'Hello World' }
  },
	getmeal: () => {
		return { description: 'Noodles' }
	}
}
```

<!-- > -->

Some times it takes some information to get some information. Often you'll need to provide parameters to the data that you need. 

<!-- > -->

Queries can take parameters. You saw this in SWAPI. You can add arguments to your queries. 

<!-- > -->

Imagine there is a different meal depending on the time: breakfast, lunch, or dinner. 

The Meal type will stay the same since it will still be a field description that is a string. 

<!-- > -->

Modify the Query type to accept an argument. 

```JS
type Query {
  getAbout: About
	getmeal(time: String!): Meal
}
```

<small>(getMeal now takes an argument: time, of type String which is required)</small>

<!-- > -->

Modify the resolver to work with this argument. 

```JS
const root = {
  getAbout: () => {
    return { message: 'Hello World' }
  },
	getmeal: ({ time }) => {
		const allMeals = { breakfast: 'toast', lunch: 'noodles', dinner: 'pizza' }
		const meal = allMeals[time]
		return { description: meal }
	}
}
```

<small>(The resolver receives an args object with all of the parmeters defined in the query type)</small>

<!-- > -->

Test your query:

```JS
{
  getmeal(time: "lunch") {
    description
  }
}
```

Should return:

```JSON
{
  "data": {
    "getmeal": {
      "description": "noodles"
    }
  }
}
```

<!-- > -->

### Working with Collections

<!-- > -->

Ofert you'll want to work collections. You more often have posts, or users, or foods. Less often you have a single post, user, or food.

<!-- > -->

Imagine you want to define a list of pets. You might start with a Pet type. 

```JS 
type Pet {
  name: String!
  species: String!
}
```

<!-- > -->

Imagine you have an array of pets. A query type might look like this: 

```JS
type Query {
  ...
  getPet(id: Int!): Pet # Add a query to get a single pet
  allPets: [Pet!]!      # Returns an array of type Pet
}
```

<!-- > -->

Now set up a resolver for each of the new queries. 

```JS 
const root = {
  ...
	getPet: ({ id }) => {	
		return petList[id]
	},
	allPets: () => {	
		return petList
	},
	...
}
```

<small>(getPet(id) takes the id an returns the pet at that index, allPets returns an array of all pets)</small>

<!-- > -->

Better define the petList! This could be defined by a database!

```JS
const petList = [
	{ name: 'Fluffy', species: 'Dog' },
	{ name: 'Sassy', species: 'Cat' },
	{ name: 'Goldberg', species: 'Frog' }
]
```

<!-- > -->

Now write a query. Notice you can choose fields to fetch. 

```JS
{ # Get the names of all pets
  allPets {
    name
  }
}
```

```JS
{ # Get pet 2 species
  getPet(id: 2) {
    species
  }
}
```

<!-- > -->

## Challenges 

<!-- > -->

Try these challenges. 

<!-- > -->

Challenge 1 

Make a list of your pets, or a list of things, song you wrote, favorite recipes, movies you've watched, anything really. 

Make a type for this thing with at least three fields. 

- Pet: name, species, age
- Song: title, genre, length
- Movie: title, genre, rating

<!-- > -->

Challenge 2 

Make an array of the things with data for each. You should be able to get an array of things with a query like this: 

```JS 
{
  Pets {
    name
  }
}
```

<!-- > -->

Challenge 3

Make a query type for your collection. 

Make a query that will return all of the things.

Make another query that will take the index of a thing as the argument and return 1 of the things. 

```JS 
{
  Pet(id: 1) {
    name
  }
}
```

<!-- > -->

Challenge 4

Test your work by writing a query in GraphiQL. 

Write queries: 

- get all the things
- get one of the things
- query for a several fields

<!-- > -->

Challenge 5

You need a server that returns the time. Write a type for the time. It should properties for: 

- hour
- minute
- year

Write a resolver that gets the time and returns an object with the properties: hour, minute, year. 

```JS
{
  getTime {
    hour
    year
    minute
  }
}
```

<!-- > -->

Challenge 6 

We need a server that returns a random number. 

```JS
{
  getRandom(range: 100)
}
```

Should return: 

```JS
{
  "data": {
    "getRandom": 77
  }
}
```

<!-- > -->

Challenge 7 

We need a type that represents a die roll. It should take the number of dice and the number of sides. 

```JS 
{
  getRoll(sides:6, rolls: 3) {
    total, 
    sides,
    rolls
  }
}
```

<!-- > -->

## After Class

- Complete the challenges here. Submit them on GradeScope.
- Watch https://www.howtographql.com videos up to the GraphQL Node Tutorial.

<!-- > -->

## Resources

- https://www.howtographql.com
- https://medium.com/codingthesmartway-com-blog/creating-a-graphql-server-with-node-js-and-express-f6dddc5320e1
