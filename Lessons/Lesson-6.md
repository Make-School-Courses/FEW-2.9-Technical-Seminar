# FEW 2.9 GraphQL Mutations 

Mutations are queries that make changes or you could say mutate data.

<!-- > -->

## Learning Objectives

1. Describe mutations
1. Define mutation queries
1. Use Mutations
1. Describe Resolvers
1. Write resolvers

<!-- > -->

## Warm up - Code Review (10 mins)

Break out into pairs and choose who will be the reviewer and reviewee for the challenges you were able to finish in lesson 3.

- Reviewee: Share your screen and explain what your code does from top to bottom.
- Reviewer: Listen, ask questions, and make suggestions for improvement.

After 5 minutes, switch roles.

<!-- > -->

## Review

<!-- > -->

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

To resolve `Time` we need a function that returns an object that has the fields defined by the type. 

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

<small>(Here we're resolving the `getTime` Query to a `Time` type)</small>

<!-- > -->

Here is another way you could write a resolver for the `Time` type. 

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

<small>Here the at the root is the `Time` and with a property that matches the name of each property that is a function that returns the value.</small>

<small>Here the `Time` type defines a resolver for each field.</small>

<!-- > -->

## Mutations

<!-- > -->

So far you've been using queries to get things from your GraphQL server. This is like a GET request with a REST 😴 server. 

**Mutations** are used to make changes at your GraphQL server. This is like a POST, PUT, or DELETE request with a REST server.

<!-- > -->

Mutations should probably have a name that describes what they do: 

```python
newUser
createUser
makeUserAccount
addUser
```

<!-- > -->

Define a mutation in your schema with type Mutation: 

```python
# Schema
type Mutation {
	...
}
```

<small>starts with `type Mutation`</small>

<!-- > -->

Usually a Mutation will take some parameters and resolve to a type. For example you might supply a username and password and resolve/return a User type. You might provide a url and description and Resolve to a Post type. 

<!-- > -->

Here is an example in code.

```python
# Schema
type Mutation {
	createUser(name: String!): User!
	post(url: String!, description: String!): Link!
}
```

<small>Mutations often return the thing they create, User, or Link in this example.</small>

<!-- > -->

When making a mutation **query** you start with the word "mutation"

```python
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

```python
# Query
query {
	getUsers {
		name
	}
}
```

<!-- > -->



<!-- > -->

## Mutation Challenges 

<!-- > -->

Using your code from assignment 2, solve the following challenges. 

Note! The challenges here will use an "in memory" data source so the data will only exist while the server is running.

<!-- > -->

**Challenge 1 - Serve a list of things**

Choose something to serve. This can be a list of anything pets, shoes, music, movies, whatever you want. Just make sure that it's something with a couple fields. 

Define an array of these objects. For example here's a list of pets: 

```JS
const petList = [
	{ name: 'Fluffy', species: 'Dog' },
	{ name: 'Sassy', species: 'Cat' },
	{ name: 'Goldberg', species: 'Frog' }
]
```

You'll need to define a GraphQL Type in your schema. The Pet Type might look like this:

```JS
type Pet {
	name: String!
	species: String!
}
```

Now you need a resolver to return the array. For the petList it might look like:

```JS
const root = {
	allPets: () => {	
			return petList
	}
}
```

Yopu'll know you're done when you can get the list of pets and any of their fields in Graphiql. For example the following query: 

```JS
{
  allPets {
    name
    species
  }
}
```

...would return:

```JSON
{
  "data": {
    "allPets": [
      {
        "name": "Fluffy",
        "species": "Dog"
      },
      {
        "name": "Sassy",
        "species": "Cat"
      },
      {
        "name": "Goldberg",
        "species": "Frog"
      }
    ]
  }
}
```

<!-- > -->

**Challenge 2 - Add new thing**

Now that your server serves a list of things you need to give it the ability to add new things. This will require a mutation! 

<!-- > -->

Add a mutation query in your schema. Below is an example for the `Pet` type to your schema: 

```JS
type Mutation {
	addPet(name: String!, species: String!): Pet!
}
```

Add a resolver for your mutation:

```JS
const root = {
  ...
	addPet: ({ name, species }) => {
		const pet = { name, species }
		petList.push(pet)
		return pet
	}
}
```

This new method on the resolver should take the name and species, create a new object and add it to the array of pets. 

**Stretch goal:** Use a class to define your Pet Object!

Test your work. You should be able to add a new pet with a query like this:

```JS
mutation {
  addPet(name:"Edamame", species:"Mameshiba") {
    name
    species
  }
}
```

The results for this should look like this: 

```JSON
{
  "data": {
    "addPet": {
      "name": "Edamame"
    }
  }
}
```

**Challenge 3 - Get one thing**

You need to write a new resolver that returns a single item from the array. 

To do this each item in the array will need to have a unique id. In my example a Pet's name and Species might be duplicated in the list. This means that pets must look more like this: 

```JS
type Pet {
	id: Int!
	name: String!
	species: String!
}
```

Every Pet should have an id and it can't be null. 

You could use the index of the array but break if you can remove items since the index would change. 

Now with and id for each Pet create a mutation in your GraphQL schema that lets you get a pet via it's id. Imagine the query would look like this: 

```JS
query {
  getPet(id:1) {
    species
    id
    name
  }
}
```

Should return something like: 

```JSON
{
  "data": {
    "getPet": {
      "species": "Cat",
      "id": 1,
      "name": "Sassy"
    }
  }
}
```

Getting a Pet with invalid id should return something like:

```JSON
{
  "data": {
    "getPet": null
  }
}
```

**Challenge 4 - Edit a thing**

In this challenge you'll make a new mutation that edits a thing. You'll need to include the id of the item and any fields and their values. If a field isn't included then the old value should be used. 

Write a mustation query in your schema. 

Write a a resolver. 

You should be able to edit a thing in your array with a graphql query something like: 

```JS
mutation {
  updatePet(id:1, name:"Felonious") {
    name
    id
    species
  }
}
```

And the results should be something like: 

```JSON
{
  "data": {
    "updatePet": {
      "name": "Felonious",
      "id": 1,
      "species": "Cat"
    }
  }
}
```

**Challenge 5 - Delete thing**

Add a delete mutation to complete CRUD functionality! The new mutation should take the id of a thing, remove that thing from the array, and return the the thing. If the thing doesn't exist it should return null. 

Here's an example set of queries. First add a new item: 

```JS
mutation {
  addPet(name:"Oops", species:"Adder") {
    name
    species
    id
  }
}
```

Should return soemthing like this creating a new thing: 

```JS
{
  "data": {
    "addPet": {
      "name": "Oops",
      "species": "Adder",
      "id": 3
    }
  }
}
```

Notice the id is 3. You should be able to remove the item with: 

```JS
mutation {
  deletePet(id:3) {
  	name
  }
}
```

And the returned results should be the removed item: 

```JS
{
  "data": {
    "deletePet": {
      "name": "Oops"
    }
  }
}
```

<!-- > -->

### Stretch Challenges

<!-- > -->

If you solved all of the challenges above try these stretch goals: 

Create a second array of new things. Write mutations that enable CRUD operations. 

Create an array of owners that have the fields and things where things is an array of the thing Type you created earlier. 

<!-- > -->

## After Class

<!-- > -->

Compelete the challenegs above and submit them to gradescope. 

<!-- > -->

### Evaluate your work

1. Describe mutations
1. Define mutation queries 
1. Use Mutations 
1. Describe Resolvers
1. Write resolvers

| - | Does not meet expectations | Meets Expectations | Exceeds Expectations |
|:---:|:---:|:---|:---:|
| Comprehension | Can't describe GraphQL mutations | Can describe GraphQL mutations | Could describe potential use cases for GraphQL mutations |
| Mutation Queries | Can't write a mutation query | Can write mutation queries | Can write mutation queries that expand on the challenge solutions |
| Mutation Resolvers | Can't write a Mutation reolsver | Can write a mutation resolver | Could write mutation resolvers that expand upon the solutions to the challenges |

<!-- > -->

## Resources

- 