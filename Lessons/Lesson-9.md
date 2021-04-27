# FEW 2.9 GraphQL Subscriptions Client

<!-- > -->

## Review

<!-- > -->

## Standup

Where are you at with the final project? Answer the questions in your group in relation to the final project for FEW 2.9: 

- What did you accomplish since the last class? 
- What are you going to work on between now and the next class? 
- Any blockers?

<!-- > -->

## Learning Objectives

<!-- > -->

- 

<!-- > -->


## Advanced Queries 

Operation Names






## GraphQL Subscriptions 🔌



## Slack Clone Client with Apollo Client

Set up

npx creat-react-app slack-client
cd slack-client
npm install @apollo/client graphql

Needed for subscriptions:
npm install subscriptions-transport-ws

Boilerplate

in src/index.js

```JS
import { ApolloProvider, InMemoryCache, ApolloClient, split, HttpLink } from '@apollo/client'
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql'
});

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:4000/graphql',
  options: {
    reconnect: true
  }
});

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

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
```

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

- React + Apollo Tutorial - Complete chapeters 3 and 4
	- [Queries: Loading Links](https://www.howtographql.com/react-apollo/2-queries-loading-links/)
	- [Mutations: Creating Links](https://www.howtographql.com/react-apollo/3-mutations-creating-links/)
- GraphQL Node Tutorial - Complete chapeters 3 and 4
	- [A simple query](https://www.howtographql.com/graphql-js/2-a-simple-query/)
	- [A simple mutation](https://www.howtographql.com/graphql-js/3-a-simple-mutation/)
- Your Custom project
	- Server - Build your data base
	- Client - Start your React Project and setup Apollo Client
- Stretch Challenge - Complete chapters 5 to 8 of the GraphQL Node tutorial (complete the entire tutorial if you can!)
	- [Adding a database](https://www.howtographql.com/graphql-js/4-adding-a-database/)
	- [Connecting The Server and Database with Prisma Client](https://www.howtographql.com/graphql-js/5-connecting-server-and-database/)
	- [Authentication](https://www.howtographql.com/graphql-js/6-authentication/)
	- [Realtime GraphQL Subscriptions](https://www.howtographql.com/graphql-js/7-subscriptions/)