# Outline 

Intro



- Class 1 - What is GraphQl focus on Query
	- Review of REST 
		- What is REST? 
		- What does REST do? 
		- 
	- REST vs GraphQL
		- It's a language and a Specification
		- 
	- Basic GraphQL concepts 
		- Query
		- Schema
		- Mutation
		- Focus on Query
	- Assignment 
		- Practice GraphQL query syntax with an online source
	- ===
	- GitHub API !!! Might be too tough due to GitHubs implementation with Edges... Could be a stretch challenge
		- Try out some GraphQL with GraphiQL
			- https://github.com/graphql/graphiql
		- Assignment these ideas to develop queries that might be used to build an app around the GitHub API
			- Join the GitHub developer program
				- https://developer.github.com/program/
				- https://developer.github.com/v4/guides/intro-to-graphql/
					- Note! I couldn't sign in with Safari but, Chrome worked. 
					
https://medium.com/@katopz/how-to-search-with-github-graphql-e6c142dc61ed

Some Example Queries

{
  repository(owner: "soggybag", name: "really-random") {
    owner {
      id
      avatarUrl
    }
  }
}
	- ===

---				
					
- Class 2 - Schema, Query, Mutation, focus Schema
	- Working with GraphQL 
		- Review Schema, Query, Mutation
	- GraphQL and Node
		- What is Express-GraphQl? 
	- Resolvers 
		- Root resolver 
		- args 
	- Getting started 
		- Install 
			- `npm i --save express express-graphql graphql`
			- `touch server.js`
		- Setup
			`const express = require('express')`
			`const graphqlHTTP = require('express-graphql')`
			`const { buildSchema } = require('graphql')`
		- Build a Schema
			- See Example Project: few-2-9-class-2
	- After Class: Define a schema with types. The goal is to mock up an API. Imagine an API for an application you want to build. The goal of this assignment is to mock up this API with GraphQL and Node.
		- Make a Schema with types that return
			- A Simple String
			- An Object with Fields 
			- ...
	- Resources 
		- 

---

- Class 3 - GraphQL Mutations and Array types 
	- What are mutations?
	- Why use mutations?
	- Passing values
	- Array Types
	- Args and Req
		- Resolvers take two params args and req
	- Resouces
		- https://graphql.org/graphql-js/mutations-and-input-types/

--- 

- Class 4 - Add a GraphQL layer on top of a REST API
	- Why do this? 
		- Using GraphQL makes your frontend work easier
		- Allows you to customize response to better fit your app
		- Optimizes data transfer efficiency
	- Quick Review Fetch and promise
		- We'll use fetch to get data from an API
		- Fetch returns a Promise 
		- Quick example fetching JSON from OpenWeatherMap
	- What is a resover? 
		- It's a function that resolves a GraphQl query
		- Parameters 
		- Types 
	- Getting started
		- Create a GraphQL Express Project 
		- Define a Schema
			- inlcude types
			- include Query type 
		- Defines an Class describes your type 
			- properties represent fields 
		- Define root resolver
			- Keys match type names
			- Remember params are passed as an object
			- Write a resolver that gets JSON from an external API. Be sure to return 
		- After class 
			- Choose a JSON API
			- Build a GraphQL API that modifies the JSON API

---
			
- Class 5 - Build the Front End (? Maybe skip this and start with Prisma here ?)
	- React Review 
		- Create React App
		- Install and run
		- Components
		- Props and State 
		- Using Proxy
		- Connect the React App to your GraphQL back end
	- Getting Started 
		- Intall the demo project React API project
		- 
	- After Class 


---

https://marmelab.com/blog/2017/09/06/dive-into-graphql-part-iii-building-a-graphql-server-with-nodejs.html#handling-relationships

few-2-9-class-

---

- Class 5 - Prisma 
	

- Class # - GraphQL Auth
	- 
	
- Class # - Mutations
	- Prisma 

















