## Slack Clone Client with Apollo Client











## Building the Slack Client

The goal is build a client to interact with your simple Slack-like GraphQL server. 

You will likely need to adjust this to fit your server. 

### Create your react App

Create the default project:

```
npx creat-react-app slack-client
cd slack-client
```

Import your dependencies:

```
npm install @apollo/client graphql
```

Needed for subscriptions:

```
npm install subscriptions-transport-ws
```

Setup a connection to the GraphQL server. 

in src/index.js

```JS
// Dependencies
import { ApolloProvider, InMemoryCache, ApolloClient, split, HttpLink } from '@apollo/client'
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';

// Used for Query and Mutation Queries
const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql'
});

// Use for Subscription Queries
const wsLink = new WebSocketLink({
  uri: 'ws://localhost:4000/graphql',
  options: {
    reconnect: true
  }
});

// Routes Queries to the http:// or ws:// depending on the type
const splitLink = split(
	({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

// make an instance of the Apollo client
export const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache()
});

// Lets share the client with child components
ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
```

You may need to adjust the port number here to match your server. 

**Note:** Since this project will be using Subscriptions it will need to use the `ws://` protocol for those. 

Query and Mutation will still need to use `http://`. 

You're using `split()` here to look at the at the query and route it to `wsLink` if it's a subscription and to the `httpLink` if it's a Query or Mutation. 










Fetch some channels: 

```JS

```


Get subscriptions from a component:

```JS
import { useSubscription, gql } from '@apollo/client'

const NEW_CHANNEL_SUBSCRIPTION = gql`
  subscription NewChannel {
    newChannel {
      name
    }
  }
`;

function TestNewChannel() {
  const sub = useSubscription(
    NEW_CHANNEL_SUBSCRIPTION
  );

  console.log(sub)
  const { data, loading } = sub

  return <h4>New Channel: { !loading && data.newChannel.name }</h4>;
}

export default TestNewChannel
```







### Connecting to the Server



### Displaying Channels



### Displaying Posts 



### Create a new channel



### Create a new Post



### Subscribe to new Channels



### Subscribe to a channel


## After Class 

You should decide an what you are going to do for the final project

- React + Apollo Tutorial - Complete chapeters 5 and 6
  - [Routing](https://www.howtographql.com/react-apollo/4-routing/)
  - [Authenication](https://www.howtographql.com/react-apollo/5-authentication/)
- GraphQL Node Tutorial - Complete chapeters 5 and 6
	- [Adding a Database](https://www.howtographql.com/graphql-js/4-adding-a-database/)
  - [Connecting The Server and Database with Prisma Client](https://www.howtographql.com/graphql-js/5-connecting-server-and-database/)
- Your Custom project
	- Server - Solve problems and add subscriptions
	- Client - Solve problems displaying data from the server
- Stretch Challenge - Complete the GraphQL Node tutorial and start the React + Apollo tutorial. 
  - [Filtering, Pagination & Sorting](https://www.howtographql.com/graphql-js/8-filtering-pagination-and-sorting/)
  - [Summary](https://www.howtographql.com/graphql-js/9-summary/)
  - [Introduction](https://www.howtographql.com/react-apollo/0-introduction/)
	- [Getting started](https://www.howtographql.com/react-apollo/1-getting-started/)
  - [Queries: Loading Links](https://www.howtographql.com/react-apollo/2-queries-loading-links/)
