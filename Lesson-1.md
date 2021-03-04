# Why you should know this or industry application (optional) (5 min)

GraphQL represents a new way to work with network transactions. It provides many benefits over REST. You should know GraphQL

## Class Learning Objectives/Competencies (5 min)

1. Compare REST with GraphQL
1. Define RESTful routes
1. Describe the benefits of GraphQL

## What is REST?

Before we look at GraphQL lets take a look at REST. This is important because GraphQL seeks to solve many issues and pain points of using REST.

- WHAT is REST?
- Let's define a REST API

A REST API is an API that follows REST-ful Routing. REST-ful routing is a set of conventions/specifications for manipulating a collection of data hosted on a server.
These conventions are common rules around the type of **HTTP request** and the **URLS** that are used for reading, updating, creating or deleting data on a server.

For instance, if we are working with a collection of Posts and User resources on a server. REST-ful routing for this type may look like this:

| URL | HTTP Method/Type | Operation |
| ----------- | ----------- |----------- |
| /posts | POST | Create new post|
| /posts| GET | Read or Fetch all posts |
| /posts/10 | PUT | Update post 10 |
| /posts/23 | DELETE | Delete post 23 |
| /posts/5 | GET | Fetch or Read post 5 |
| /users/2/posts | POST | Create a post associated with User 2 |

The last row on the table shows how REST-ful conventions are with associated or nested resources(in this case, posts and users)

- Imagine a REST API that has three resources
  - Images
  - Users
  - Comments
- Define REST-ful routes for these resources

## What is GraphQL?

GraphQL is both a query language and a specification. The language allows you to _**QUERY**_ a server for data. The specification defines how the server should respond to those requests.

Writing a query to fetch data with GraphQL on a collection of Post resources might look like this:

```js
// fetch the title of all users from server
  {
    posts {
      title
    }
  }

// fetch the title of post 46 from the server
  {
    post(id:'46') {
      title
    }
  }
```

- Imagine these same set of resources
  - Images
  - Users
  - Comments
- Write GraphQL queries to access these resources

## Compare REST and GraphQL

- What are the pros of REST? Here are some. What others can you highlight?
  - Popular with many web frameworks and languages. It has points for being around for a while and familiarity.
  - Stateless servers

- What are the cons of REST? Here are some. What others can you highlight?
  - Makes many requestes for nested or deeply associated records/data
  - Tightly coupled or server defined endpoints; the type of resource and the way it is fetched are coupled
  - Vulnerable to over fetching or under fetchng data

- What problems do you think GraphQL is trying to solve over REST? Here are some what others can you think of?
  - Clients have the ability to dictate exactly what they need from the server
  - Clients can receive data in a predictable way.

- Are there any drawbacks to GraphQL? Here is one, can you highlight any other?
  - One drawback for GraphQL is that queries always return a HTTP status code of 200 regardless of whether or not the query was successful. This can make it a little complex for error handling and monitoring.

## Core features of GraphQL

GraphQL has a few core features.

- Schema Definition Language: syntax for writing schemas.
  - Types
  - Introspection
- Resolvers
- Query Language
  - Query
  - Mutation
- Subscription

## GraphQL vs REST: a practical example

Imagine you have the following model schema defined:

```js
type User {
  id: ID
  name: String
  company: String
  followers: [User]
}

```

And we want to retrieve just a particular `User`'s name. With a REST API we would typically make a request `GET /users/<userid>` and get a JSON response that looks something like this:

```js
// GET /users/7

"data": {
  "id": 7,
  "name": "Page Grandy",
  "company": "Royal Devs",
  "followers": [
    //...more fields in here
              ]
 
}
```

We have received the entire `User` object back in our response. This is can lead to **overfetching data**. With GraphQL we only get the data we requested for.

A GraphQL query to fetch that resource will look something like this

```js
query {
  User("id": 7){
    name
  }
}
```

And our response would look like:

```json
"data": {
  "User": {
    "name": "Page Grandy"
  }
}

```

GraphQL query specifies the particular resource we are asking for and which fields we care about - in our case, the `name` field.

Imagine we also want to fetch the names of our `User`'s followers also. Typically, a REST API would have to make at least an additional request probably a `GET /followers?id=<userid>`.
With GraphQL, we have the ability to retrieve many resources in a single request. Here, we can simply put in the `followers` field to our query and receive all the names with one request:

```js
query {
  User("id":7){
    name
    followers {
      name
    }
  }
}
```

...and the response would look something like:

```json
{
  "users": {
    "name": "Page Grandy",
    "followers": [
      {"name" : "Meghan"},
      {"name": "Harry"},
    ]
  }
}
```

GraphQL helps with

## Activity

Learn more about GraphQL. Follow the lessons here:

<https://www.howtographql.com>

Complete these sections

- [GraphQL Fundamentals](https://www.howtographql.com/basics/2-core-concepts/)
- Advanced GraphQL
  - [Clients](https://www.howtographql.com/advanced/0-clients/)
  - [Server](https://www.howtographql.com/advanced/1-server/)
  - [More GraphQL Concepts](https://www.howtographql.com/advanced/2-more-graphql-concepts/)

## After Class

Complete these sections

- [Tooling and Ecosystem](https://www.howtographql.com/advanced/2-more-graphql-concepts/)
- [Security](https://www.howtographql.com/advanced/4-security/)
- [Common Questions](https://www.howtographql.com/advanced/5-common-questions/)

## Additional Resources

- [[Basic GraphQL Server using Node](https://github.com/soggybag/BasicGraphQLExample)
- [ES6 Review](https://devhints.io/es6)