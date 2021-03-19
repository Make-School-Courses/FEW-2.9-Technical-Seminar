# FEW 2.9 GraphQL + Express

<!-- ![banner_image](./assets/public_api_banner.jpg) -->

<!-- > -->

## Learning Outcomes

By the end of today's lesson, you should be able to...

1. Build a GraphQL API over a Public API
1. Use GraphQL and Express
1. Define Resolvers for types

<!-- > -->

## Review

**Write a resolver for the following types: **

```JS 
type Mission {
	codeName: String! 
	securityLevel: Int!
}

type Agent {
	name: String! 
	handle: String!
	securityClearance: Int!
	missions: [Mission!]!
}
```

<!-- > -->

## Overview

Today you will make a GraphQL service for a public API. 

*Why?* This will give you a chance to practice the ideas from the previous class in a different context.

<!-- > -->

## GraphQL and Express

GraphQL is a specification and a langauge. It's not a framework or library of prewritten code. 

This means people are free to write libraries or frameworks that implement the GraphQL spec. 

<!-- > -->

You'll find GraphQL libraries written for most most of popular frameworks. Today you will use Express.js and GraphQL. 

<!-- > -->

### What do we need to use GraphQL with Express? 

- express-graphql npm package
- graphql npm package
- express npm package

<!-- > -->

### How do you set this up? 

- import the npm packages
	- express, graphql, express-graphql
- define your schema
- define your resolvers
- define a route to act as the GraphQL endpoint
	- Use graphqlHTTP to handle requests at this route
		- configure graphqlHTTP with your schema and resolvers

<!-- > -->

## Challenge

The challenge today is to build GraphQL front end for a public API. 

<small>Think of this as an interview question practice.</small> 

<!-- > -->

For this example you'll use https://openweathermap.org. 

<small>Q: Why are using OpenWeatherMap.org? A: It's free and easy. It's a good choice for a 2 hour assignment.</small>

<!-- > -->

**Challenge 1 - Setup Express and GraphQL**

Follow these steps to setup Express and GraphQL. 

<!-- > -->

1. Create a new folder
1. Initialize a new npm project: `npm init -y`
1. Install dependancies: `npm install --save express express-graphql graphql`
1. Create a new file: `server.js`
1. Add `"start": "nodemon server.js"` to package.json

<!-- > -->

**Important!** Be sure to include a `.gitignore`. 

https://www.toptal.com/developers/gitignore/api/node

<!-- > -->

In `server.js` import your dependancies: 

```JS
// Import dependancies
const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')
```

<!-- > -->

Start your schema: 

```JS 
const schema = buildSchema(`
# schema here
type Test {
	message: String!
}
`)
```

<!-- > -->

Set up your resolver

```JS
const root = {
	// resolvers here
}
```

<!-- > -->

Create an express app

```js
// Create an express app
const app = express()
```

<!-- > -->

Define a route/endpoint for your GraphQL API

```js
// Define a route for GraphQL
app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true // Be sure to use graphiql
}))
```

<!-- > -->

Start your App 

```JS 
// Start this app
const port = 4000
app.listen(port, () => {
  console.log('Running on port:'+port)
})
```

<!-- > -->

Start your GraphQL server: 

`npm start`

Open graphiql: 

`http://localhost:4000/graphql`

<!-- > -->

**Challenge 3 - Get your API Key**

Go to https://openweathermap.org

1. Create an account at [openweathermap.org](https://openweathermap.org/).
1. After you make an account, click on your username, then on `My API Keys`. Enter an API key name, then click the `Generate` button to create your API key!

![api_keys](../assets/api_keys.png)

<!-- > -->

**Quick Side Note for `.env` files**

Having a `.env` file allows us to store our secrets (like an API Key) without it being exposed to the public on GitHub. Let's create that now so we can use our API Key in our project without exposing it!

1. In the folder containing the sample project, run `touch .env` in the terminal
1. Open the .env file, and place the following in it, replacing `MY_API_KEY` with your actual API Key:

```
OPENWEATHERMAP_API_KEY=MY_API_KEY
```

Save it when you're done. Alright, now we're ready to continue!

<!-- > -->

**Challenge 4 - Define Schema**

Define your schema

```JS 
type Weather {
	temperature: Float!
	description: String!
}

type Query {
	getWeather(zip: Int!): Weather!
}
```

<small>Define a weather type and a query type to get the weather.</small>

<!-- > -->

**Challenge 5 - Import node-fetch**

Import node-fetch to make network calls. You can use Axios or other library of your choice. 

`npm install node-fetch`

<!-- > -->

**Challenge 6 - Define your Resolver**

Define your resolver: 

```JS
const root = {
  getWeather: async ({ zip }) => {
		const apikey = process.env.OPENWEATHERMAP_API_KEY
		const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${apikey}`
		const res = await fetch(url)
		const json = await res.json()
		const temperature = json.main.temp
		const description = json.weather[0].description
		return { temperature, description }
	}
}
```

<small>I used `fetch` here you substitute your HTTP client of choice here</small>

<!-- > -->

**Challenge 7 - Test your work in GraphiQL**

Try out a query and solve any errors that might pop up. 

```JS
{
  getWeather(zip: 94010) {
    temperature
    description
  }
}
```

<!-- > -->

**Challenge 8 - Add units**

The weather API supports a unit of `standard`, `metric`, or `imperial`. Currently you should be getting the weather in Kelvin (standard) this is hard to understand better to allow a request to include the unit. 

<!-- > -->

Add an enum for the type to your schema.

```JS
enum Units {
	standard
	metric
	imperial
}
```

<!-- > -->

Use the unit in your getWeather query. 

```js
type Query {
	getWeather(zip: Int!, units: Units): Weather!
}
```

<!-- > -->

Handle the unit in your resolver. 

```JS
const root = {
  getWeather: async ({ zip, units = 'imperial' }) => {
		...
		const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${apikey}&units=${units}`
		...
	}
}
```

<small>Be sure add `units` to the query string!</small>

<!-- > -->

Test your work! Write a query: 

```JS
{
  getWeather(zip: 94122, units: metric) {
    temperature
    description
  }
}
```

<small>Notice that the enum value is NOT input as a string! Graphiql will code hint valid values! Go GraphQL introspection FTW!</small>

<!-- > -->

## Stretch Challenges

**Challenge 9 - Add More Fields**

Try as many of these stretch challenges as you can. 

Take a look at the JSON response here: https://openweathermap.org/current#current_JSON

<!-- > -->

Add more fields to the Weather type. 

- feels_like
- humidity
- name
- add other fields you like...

<!-- > -->

Modify the resolver to add these new fields...

<!-- > -->

**Challenge 10 - Add City API**

The OpenWeatherMap service supports weather requests by city name. 

Add a query that takes the city name and returns the weather. 

<!-- > -->

**Challenge 11 - Use another API**

Copy this project and replace the OpenWeatherMap API with another API of your choice...

<!-- > -->

## After Class

Finish up as many of the challenges and stretch challenges as you can. Submit your project on Gradscope. 

<!-- > -->

## Resources

- https://www.toptal.com/developers/gitignore/api/node
