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

