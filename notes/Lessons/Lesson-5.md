# Nested Queries and Resolvers

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