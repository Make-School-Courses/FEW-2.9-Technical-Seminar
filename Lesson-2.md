# Schemas and Types

Use a schema to define what your GraphQL API can provide.

Types allow strong typing of data provided from the API.

## GraphQL and Express

Today we will look at a simple example implementing GraphQL with Express. This is important since it puts GraphQL in a context that you have experience with.

## Class Learning Objectives/Competencies

1. Define a GraphQL Schema
1. Define a GraphQL Resolver
1. Use GraphQL Queries
1. Define GraphQL Resolver
1. Use GraphiQL

## Getting Started

- Create a new directory with the command `mkdir GraphQLExpress`
- change in to that directory `cd GraphQLExpress`
- Create a `server.js` file with the command `touch server.js`. This file will contain code to start up and run the server
- Now run these commands to setup your project:
  - `npm init`
  - `npm install --save express express-graphql graphql`
- In your `package.josn` file include the start script to your scripts:

```json
  "scripts": {
    "start": "node server.js"
  }
```

- Setup a default boilerplate express project in `server.js`:

Import dependencies

```JavaScript
// server.js file

const express = require('express')

// express-graphql is a glue or compatibility layer betwwen GraphQL and Express
// see docs <https://www.npmjs.com/package/express-graphql> for more information

const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')
```

### Define a schema

Schemas tell GraphQL about type of data one is working with and how different pieces of data are related. a schema is simply a collection of GraphQL types. Schemas are mostly defined using object types. Each field in these object types is mapped to another type. The syntax for defining an schema type looks like this:

```JavaScript
type object_type_name
{
  field1: dataType
  field2: dataType
  // ...
  fieldn: dataType
}
```

 _fields_ are the names given to the data to be returned and _dataType_ can be primitive data types - **Int, Float, String, Boolean and ID (a unique identifier )**.

_dataType_ can also be of List type; lists can be used to represent an array of values of a specific type. Lists are defined with a `[]` that wraps the specific type. Syntax for a list type will look like this:

```JavaScript
field: [dataType]
```

The code snippet below returns a `User` schema definition with named fields and datatypes that include primitive types and a list type:

```JavaScript
type User {
  userId: ID!
  firstName: String
  age: Int
  balance: Float
  friends: [String]
}

```

By default, these types can return a value or they can have no value on query. To specify that a field must be defined, an exclamation mark (!) can be appended to a dataType. This will make sure that the value of that field is returned by a query. In the example above, the `ID!` dataType implements this functionality.

Schema definitions must also include a `Query` type. Query type is one of the root-level types in GraphQL.

Our example includes an `About` object type and a `Query` type. In your `server.js` file, include this:

```JavaScript
// Defining a GraphQL schema

const schema = buildSchema(`
  type About {
  message: String
 }

 type Query {
    getAbout: About
  }
`)
```

### Define a resolver

A resolver is a function on a GraphQL server that's responsible for fetching the data for a single field. Resolver function keys/names must match the schema under query, and return values that match the type.

In our example, `getAbout` in the query maps to `getAbout` in the resolver we are goin to define. This function is required to returned an object with a key of `message` that has a value type of String.

The root object below provides resolver functions. Resolvers return the data asked for by queries. Resolvers are used to determine what is returned from a query. At the bottom of the file, include this:

```JavaScript
const root = {
  getAbout: () => {
    return { message: 'Hello World' }
  }
}
```

### Create Express, add middelware, and start the app

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

The whole file should look like this:

```JavaScript
const express = require('express');
// express-graphql is a glue or compatibility layer betwwen GraphQL and Express
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

const app = express();

// Define a schema
const schema = buildSchema(`
  type About {
  message: String
 }

 type Query {
    getAbout: About
  }
`)

// Define a resolver

const root = {
  getAbout: () => {
    return { message: 'Hello World' }
  }
}

// add middelware, and start the app

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

## GraphiQL and Simple Queries

Start your server in your terminal with `npm start`

Test your GraphQL API in GraphiQL by visiting: <http://localhost:4000/graphql>

GraphiQL is an IDE for exploring and testing GraphQL. Think of it like PostMan for GraphQL.

GraphiQL has three panels:

![GraphiQL Interface Expanded](./assets/graphiql-expanded.png)

- Left: Code editor: Write your GraphQL queries here
- Center: Output: See the results of your query here
- Right: Docs: Documents your GraphQL Schema

Test a query: Input this query below into the GraphiQL Code Editor and press th play button:

```JavaScript
query {
  getAbout{
    message
  }
}
```

You should get an output response that looks like this:

```json
{
  "data": {
    "getAbout": {
      "message": "Hello World"
    }
  }
}
```

This is equivalent to a GraphQL "Hello World".

## Practice Challenges - Resolvers and Simple Queries

### Tell the Weather

Let's include an example that would return weather details we specify in our query. We would take these steps:

- Define a `TellWeather` class that will take care of the logic for determining the weather.

- Include a Weather type in our schema definition `type Weather`. It will return an object with two fields : `desc`; type `String` for description of the weather and `temp`; type `Float` for weather temperature.

- Include a resolver key function `getWeather` as a field in `type Query` and map its value to the `Weather` type. This function returns the data asked for by the query to get weather details.

- Write out the `getWeather` resolver function definition

Let's see this in code:

```JavaScript
  // define the DisplayWeather class: holds logic to deternine the weather
  // include this at the top of your file after your dependency imports

  class TellWeather {
    // set default types on constructor
    constructor(desc = 'overcast', temp = 56) {
      this.desc = desc;
      this.temp = temp;
    }
  }

  // Include the Weather type into our schema definiton so GraphQL knows to return it as data
  // in your schema  definition, include this with its fields.

  const schema = buildSchema(`
  type About {
    message: String
  }

  type Weather {
    desc: String
    temp: Float
  }

  type Query {
    getAbout: About
    getWeather: Weather
  }
  `)

```

In the `Query` type the `getAbout` function maps to the About type and the getWeather function maps to the `Weather` type

Now, let's defne the resolver function. In the `root` object, include the `getWeather` function definiton:

```JavaScript
const root = {
   // Simple resolver returns a string
  getAbout: () => {
    return { message: 'Hello World' }
  },
  // Resolver returns a DisplayWeather object with fields - desc and temp
  getWeather: () => {
    return new TellWeather()
  }
}
```

We are set to make our query in GraphiQL now! Start up your server again, `npm start`, in your terminal and visit <http://localhost:4000/graphql> in your browser. In your GraphiQL editor, include the new query for weather details:

```JavaScript
query {
 getAbout{
   message
 }
 getWeather{
   desc
   temp
 }
}
```

Your response should look like this:

```json
{
  "data": {
    "getAbout": {
      "message": "Hello World"
    },
    "getWeather": {
      "desc": "overcast",
      "temp": 56
    }
  }
}
```

You could try out other query requests on GraphiQL to return just one of the weather fields(remove the desc or temp field) instead of the two; see in action the flexibility we get from using GraphQL.

## Tell the curent Time and Date

- Include a schema type definition `type Time`. It should return two fields `time`; of type `String` and `date`; of type `String` too.

- Define a resolver `getTime`. `getTime` should be an object that holds two function definitions for time and date. Use the defalut `Date` Object to tell/return the current time and date.

- Remember to include the field to map the resolver defintion `getTime` to `Time` in the Query schema.

```js
// Resolver getTime
 getTime: {
   time: '', // () => define function to return time,
   date: '' // () => define function to return date
 }
```

## Stretch Challenges

- You need to return a random number
- Return a random number in a range
- You need to return an array of rolls
- Sepcify the number sides and the number rolls
- Return the total along with the rolls

## After Class

- Start the GraphQL + Node tutorial

## Resources

- <https://graphql.org/graphql-js/graphql/>
- <https://www.howtographql.com/basics/2-core-concepts/>
- [Schemas and Types](https://graphql.org/learn/schema/)
- <https://github.com/graphql/express-graphql>
- [Schemas, TypeDefs and Resolvers Explained](https://www.prisma.io/blog/graphql-server-basics-the-schema-ac5e2950214e)
