# FEW 2.9 - Subscriptions

<!-- > -->

## Review 



<!-- > -->

# Learning Objectives



<!-- > -->


## Subscriptions with GraphQL

<!-- > -->

Subscriptions are described in the GraphQL docs but the implementation is left up to developers. Usually these would be implemented with a websocket.

<!-- > -->

There are several GraphQL libraries:

- express-graphql
- apollo-server-express
- graphql-yoga

<!-- > -->

This example uses Apollo Server. This seems to be the most advanced GraphQL server available at this time. 

<small>(I started with express-graphql and coudln't get subscriptions to work.)</small>

<!-- > -->

Implementing a server with Apollo is similar to implementing the express-graphql server but has a few differences. 

<!-- > -->

## Build a GraphQL chat with Subscriptions

Start a new npm project: 

```
npm init -y
```

Start by importing dependencies. For this project you'll use: 

```JS
npm install apollo-server graphql
```

For this project you are using Apollo Server you can read more about it here: 

https://www.apollographql.com/docs/

Set up your server by creating: 

```
touch server.js
```

Add a start script to your package.json: 

```
"scripts": {
    ...
    "start": "nodemon server.js"
  },
```

### Setup the server

In server.js start working on your server. 

Import your dependencies:

```JS
const { ApolloServer, gql, PubSub } = require('apollo-server');
```

This project will use Subscriptions. To handle events associated with subscriptions you'll use the PubSub class. Make an instance of PubSub

```JS
const pubsub = new PubSub();
```

You'll come back to this later. We need to put some things in place first before we make use of this pubsub instance. 

The listening for and publishing subcriptions will be handled with PubSub. Read more about it here: 

https://www.apollographql.com/docs/apollo-server/data/subscriptions/#the-pubsub-class

### Add a Schema

Add some type definitions. This is where your GraphQL schema will live for this project: 

```JS
const typeDefs = gql`
	type Post {
		message: String!
		date: String!
	}

	type Query {
		posts: [Post!]!
	}

	type Mutation {
		addPost(message: String!): Post!
	}

	type Subscription {
		newPost: Post!
	}
`
```

This defines an object type: Post, a Query type: posts, a Mutation type: addPost, and a Subscription type: newPost.

Read more about the gql function here: 

https://www.apollographql.com/docs/resources/graphql-glossary/#gql-function



**Aside: JS Template Strings**

The syntax here looks a little strange: 

```JS
const typeDefs = gql`
  ...
`
```

Following `gql` with the backquotes looks weird, what is going on? 

tl;dr gql is a function and the JS allows us to follow a function with a template string and omit the parenthesis. read the notes notes below there is more to this feature! 

Why? Using this syntax makes it include a multiline string value as a parameter to the the `gql` function. 

Read more here:

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#tagged_templates

### Mock up some Data

Define an array of post objects. Each message will have a message and date field. This matches the Post type defined in the schema. 

```JS
const data = [
	{ message: 'hello world', date: new Date() }
]
```

You'll exapnds on this in the challenges later. 

### Define your resolvers

Now define your resolvers. Apollo resolvers work the same but have a little different structure from the resolvers used with express-graphql. 

Let's build the resolvers in stages.

Start with the root level properties:

```JS
const resolvers = {
	Query: {
		// Query types
	},
	Mutation: {
		// Mutation types
	},
	Subscription: {
		// Subscription types
	}
}
```

Notice the root level properties here match the GraphQL query types: Query, Mutation, and Subscription. When you define resolvers for your query types you'll match your schema to this. 

For example, the schema shows our posts query: 

```
type Query {
	posts: [Post!]!
}
```

#### Query Resolver

You'll define the resolver for this `Query`:

```JS
const resolvers = {
	Query: {
		posts: () => {
			return data
		}
	},
	Mutation: {
		// Mutation types
	},
	Subscription: {
		// Subscription types
	}
}
```

That was an easy one. Let's try that again...

#### Mutation Resolver

Add the addPost mutation. This will go under `Mutation`:

```JS
// Resolvers 
const resolvers = {
	Query: {
		...
	},
	Mutation: {
		addPost: (_, { message }) => {
			const post = { message, date: new Date() }
			data.push(post)
			pubsub.publish('NEW_POST', { newPost: post }) // Publish!
			return post
		}
	},
	Subscription: {
		...
	}
}
```

Note: `pubsub.publish('NEW_POST', { newPost: post })`. This line will publish a post to anyone who subscribed. Anyone that subscribes to `newPost` will get a this post. You will tackle subscriptions in the next section. 

Note! The arguments for a resolver function in Apollo are different! A resolver takes 4 arguments: `parent`, `args`, `context`, and `info`. You'll be looking at the other arguments later, now let's focus on args. 

We need the `_` in place to get to the second argument, and we'll use the deconstruction syntax to turn the `args` into variables. 

```JS
const resolvers = {
  Query: {
    user(parent, args, context, info) {
      return users.find(user => user.id === args.id);
    }
  }
}
```

Read more about Apollo resolvers here: 

https://www.apollographql.com/docs/apollo-server/data/resolvers/#gatsby-focus-wrapper

#### Subscription Resolvers

Resolvers for subscriptions work a little different from other resolvers. Here is where you will use `pubsub`. 

A subscription uses a `subscribe` method. This method must return an instance of `AsyncIterator`. 

**Note!** The `PubSub` class is used for development. For production the docs suggest using the `PubSubEngine` class. 

#### Adding a subscription

Your schema defines `newPost` subscription, so you'll resolve it with a method at: `Subscription.newPost.subscribe`

```
# Schema
type Subscription {
	newPost: Post!
}
```

So our resolver will be:

```JS
const resolvers = {
	...
	Subscription: {
		newPost: {
			subscribe: () => pubsub.asyncIterator('NEW_POST')
		}
	}
}
```

This subscribe method will add a subscription for `newPost`. Notice you're calling: `pubsub.asyncIterator('NEW_POST')` to generate the instance of `AsyncIterator`. The argument: `'NEW_POST'` is a "tag" to that will identify this subscription from other subscriptions. 

Read more about it here: 

https://www.apollographql.com/docs/apollo-server/data/subscriptions/#resolving-a-subscription

### Create and Start the Server

Create an instance of ApolloServer and include the typedefs and resolvers. 

```JS
const server = new ApolloServer({ 
	typeDefs, 
	resolvers 
});
```

Start the server:

```JS
// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
```

### Testing your work! 

The next step will be test the server and test subscriptions. You do this with Graphiql browser for now since you haven't created a client application yet. 

So far the system supports the following features: 

- Returns a list of posts: `posts`
	- Each post has a message and date
- Adds a new post to the list: `addPost`
- Subscribes to new posts: `newPost`
	- This should display a post whenever a post is added

We need to test all of these features now! 

Open: http://localhost:4000/graphql? In your browser. 

The interface looks a little different but the function is the same. 

#### Aside: Operation names

When you run a query you can give it an "Operation Name". This allows you identify and describe a query with a name. 

```
# Operation name: Luke
Query GetLuke {
	person(personID: 1) {
		name
	}
}
```

You must include the query type before the Operation name! 

Read more about operation names: https://graphql.org/learn/queries/#operation-name

#### Test posts Query

Test your posts: 

```
# Operation name: Posts
query Posts {
  posts {
    message
    date
  }
}
```

Click the > button. You should see a list of posts. 


#### Test addPost Mutation

Add this new query below the existing qurey:

``` 
# Operation name: AddPost
mutation AddPost {
  addPost(message:"Foo Bar") {
    message
    date
  }
}
```

Clicking the > button should show a menu listing your named operations! Choose "AddPost". 

Now click > and choose "Posts". This should list your your posts and the new post should be in the list! 

Debug any errors you have here at this step. 

#### test newPost Subscription

If you can lists your posts and add new posts you can register a subscription for posts. Registering a subscription will display the new post when a new post is created. 

To make this work you'll need to dedicate a new tab inside the Graphiql interface. Notice at the top there are tabs. make a new one by clicking +.

Pro tip: double click to name your tabs! 

In the new tab add a subscription query: 

```
subscription NewPost {
  newPost {
    message
    date
  }
}
```

Click the > button. This should run constantly. Notice the run button now looks like a stop button. This tab is now dedicated to watching for subscriptions. 

This should register a subscription that will display message and date of new post when it is created. 

Switch the first tab and run the `AddPost` operation again. You can change the message for fun. 

Switch to the subscription tab and if everything is work you should see the new post! 

### Review 

Review your work. Answer these questions for your self: 

- What are your types? 
- Which resolver handles subscriptions? 
- Which resolver publishes the subscription? 

### Challenges!

The goal of these challenges is to make a Slack like server. To do this you need to create channels, post messages to channels, subscribe to a channel and subscribe to new channels. 

Slack would require a user object and authentication. We are going to leave of this project to scope it to the core functionality. You could add these features later if you wanted to continue working on this!

**Challenge 1 - managing Channels**

The first step is to look at your data and ask yourself where you would store channels? Here are a couple options:

Option 1: Use an object. Imagine your data storage as an object. 

```JS
{
	channel1: [ {}, {}, ... ],
	channel2: [ {}, {}, ... ]
}
```

Each property is the channel name and the value is an array of posts. Pros you can be sure that channels are unique! Cons there isn't any room for channel meta data. 

Option 2: As above but you use an object for the value of each channel property. 

```JS
{
	channel1: { name: 'Cats!', posts: [ {}, {}, ... ] },
	channel2: { name: 'Dogs', posts: [ {}, {}, ... ] }
}
```

Here you could add meta data to each channel. But your structure is more complex. 

Option 3: Use array of objects with a channel name and posts property. 

```JS
[
	{ channel: 'channel1', posts: [ {}, {}, ... ] },
	{ channel: 'channel2', posts: [ {}, {}, ... ] }
]
```

This works but you will need to keep the channel names unique. 

There are other options. You can think of your own ideas. What's important now is to understand your solution since it will affect how you answer the challenges coming up. 

Refactor your code to support channels. Include at least one channel in the refactored code! 

**Challenge 2 - Channels Query**

Slack has channels and messages can be posted to a channel. To start you'll need to define a schema for a channel type.

Create a Query type for `channels`. It should return an array of channel names. 

**Challenge 3 - addChannel Mutation**

Now that we can get a list of the channels its time to make new channels. 

Add a Mutation that creates a new channel. 

**Challenge 4 - newChannel Subscription**

Now that you can make new channels you might want to be notified when a new channel was created. 

Add a Subscription for newChannel.

**Challenge 5 - Posts need a channel**

Now that posts are stored when with a channel you'll need to supply a channel when asking for posts!

The `posts` Query might look like this now: 

```
posts(channel: String!): [Post!]
```

**Challenge 6 - Add Post to channel**

All posts need to be associated with a channel. You need to make sure when a post is created that it assigned to a channel. How you do this depends on the arrangement of your data. 

Here is a suggestion. You probably want to modify the `addPost` Mutation to look something like:

```
posts(channel: String!, message: String!): Post!
```

**Challenge 9 - New Posts Subscription**

Posts are now added to a channel we probably only want to be notified when a post is added to a channel we are interested in. 

Modify the `newPost` Subscription to support a channel. 

```
newPost(channel: String!): Post
```

**Challenge 8 - Test your work**

Build some queries in Graphiql to test your work. 

Write a query for each of the following: 

- channels - Display a list of channels
- addChannel - adds a new channel
- newChannel - subscribe to new channels
- Test new channels are added by chowing the list after you add a channel
- Test a new channel is published via subscription
- posts - show posts for a channel
- addPost - adds a new post to a channel
- Test posts added to the correct channel
- newPost - Check the subscription is showing new posts.

## After Class 

Complete the challenges here. Submit them to GradeScope. 

Start working on the final assignment. Choose one: 

- React + Apollo Tutorial - https://www.howtographql.com
- Your own Project idea 






