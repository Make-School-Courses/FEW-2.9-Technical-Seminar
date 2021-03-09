# Why you should know this or industry application (optional) (5 min)

GraphQL represents a new way to work with network transactions. It provides many benefits over REST. You should know GraphQL

## Class Learning Objectives/Competencies (5 min)

1. Compare REST with GraphQL
1. Define RESTful routes
1. Descride the benefits of GraphQL







Watch How to GraphQL
- Introduction - 5:36
- GraphQL is the Better REST
Answer Questions 
- General GraphQL Questions
	- Quick one line description of REST
	- Quick one line description of GraphQL
	- Name three problems with REST
	- Name three solutions offered by GraphQL
	- What is underfetching? 
	- What is overfetching?
	- Name three companies that use GraphQL? 
	- How many endpoints does a typical GraphQL application use? 
- GraphQL Queries
	- What is a GraphQL Schema? 
	- What is the root field? 
	- What is the payload?
	- What is a mutation? 
	- Name three things a mutation can do? 
	- What is a subscription? 
	- What are the three root types of a schema? 
	- Create a schema for an API that...

	type Query {
		allUsers(last: Int): [User!]!
		allPictures(last: Int): [Picture!]!
	}

	type Mutation {
		createUser(name: String!): User!
		updateUser(id: ID!, name: String!): User! 
		deleteUser(id: ID!): User!
		createPicture(title: String!, fileName: String!): Picture!
		updatePicture(id: ID!, title: String!, fileName: String!): Picture!
		deletePicture(id: ID!): Picture!
	}

	type Subscription {
		newPicture: Picture!
	}

	type User {
		id: ID!
		name: String!
		pictures: [Picture!]!
	}

	type Picture {
		id: ID!
		title: String!
		author: User!
	}




















## What is REST? 

Before we look at GraphQL lets take a look at REST. This is important because GraphQL seeks to solve many issues and pain points of using REST. 

- WHAT is REST?
- Let's define a REST API
	- Imagine a REST API that has three resources
		- Images 
		- Users
		- Comments
	- Define routes for these

## What is GraphQL? 

GraphQL is both a language and a specification. The language allows you to query a server. The specification defines how the server should respond to those requests. 

- Imagine the same set of resources
	- Images 
	- Users
	- Comments
- Write GraphQL queries to access these resources

## Compare REST and GraphQL

- What are the pros of REST? 
- What are the cons of REST? 
- What problems do you think GraphQL is trying to solve over REST? 
- Are there any drawbacks to GraphQL? 

## Core features of GraphQL

GraphQL has a few core features.

- Schema Definition Language
	- Types 
	- Introspection
- Resolvers
- Query Language
	- Query
	- Mutation
- Subscription

## After Class 

Learn more about GraphQL. Follow the lessons here: 

https://www.howtographql.com

Complete both sections 

- GraphQL Fundamentals
- Advanced GraphQL