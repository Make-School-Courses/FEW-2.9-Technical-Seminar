# FEW 2.9 Final Assessment

## Question 1 - Setup (20pts)

Your goal is to build a GraphQL Todo application. For this assignment, you will build a server that supports your GraphQL schema. You will write the schema, resolvers, and some queries that test query types in your schema. 

# Todo GraphQL

Your goal is to make a GraphQL todo app. It should be able to display a list of todos, create new todos, and mark a todo completed.

## Challenges

### Create a Server

- Setup GraphQL server
- Enable Graphiql

### Create a Schema 

Write a schema that defines the following types:

**Type Todo**
- name 
- completed
- date 
- id

**Query**
- getAllTodos
- getTodo parameters: id => todos[]
- getComletedTodos: completed => todos[]

**Mutation**
- addTodo: name => todo
- completeTodo: id => todo

### Write a GraphQL Queries

Write queries to perform the following operations. Test these in Graphiql and paste them into a readme in your project folder.

- list all todos
- add a new todo: name: "Complete the final assessment"
- show the "Complete final assessment" todo 
- Complete the "Complete final assessment" todo
- show all completed todos
- show all not completed todos

### Stretch Challenge: Subscriptions

Add subscriptions to your work. We need a subscriptions to tell us when a new todo is created and when a todo is completed.

**Schema**

**Subscription**
- newTodo => todo
- todoCompleted => todo

**Resolver**

Write a resolver to handle the two new query types.

**Query**

Write a query for each of the subscription types above. 

## Submit your work 

Submit your completed work on GradeScope.

<!-- 

### Define a Schema

Enum Race 
- Human
- Dwarf
- Elf

Type Character
- name
- race
- power
- speed
- hp

Type Party 
- name 
- characters []

Query 
- getParty returns Party
- 

Mutation 
- createParty 
	- parameters name
	- returns Party
- creatCharacter returns Character
- addToParty return character

### Create a server 

- Setup GraphQL server 
- Define a resolver for your schema

### Write Queries 

Define the following queries

- get a party 
	- show 
 -->
