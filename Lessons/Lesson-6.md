# FEW 2.9 GraphQL Subscriptions

<!-- > -->

## Review

<!-- > -->

- Q: What is an ORM?
- Q: What is Prisma? 

<!-- > -->

## Learning Objectives

<!-- > -->

1. Describe Subscriptions
1. Use Subscriptions with GraphQL
1. Use Graphiql to test subscriptions
1. Describe Websockets
1. Implement a websocket 

<!-- > -->

## GraphQL Subscriptions

<!-- > -->

Subscriptions represent a real time presistent connection to a GraphQL server.

Use them to send push notifications and real time updates to connected GraphQL clients.

<!-- > -->

GraphQL *doesn't* implement the code that backs up subscriptions. This is handled by the framework or library that implements the GraphQL Spec. For web based projects this is most often a websocket. 

<!-- > -->

### Websockets

<!-- > -->

Websockets represent a persistent connection. Which is different from the standard call and response cycle we use most often.

<!-- > -->

Normally when we connect to a web server we make a temporary connection that sends a message, notes that the message was received and then close down the connection. 

<!-- > -->

When you create a connection with a websocket the connection is persistent and allows for data to be passed back and forth without the overhead of opening and closing a connection with each transaction. 

<!-- > -->

What can you do with a websocket? 

- Chatrooms
- Push notifications
- Real time communications

<!-- > -->

Simple Websocket example in JS: https://dev.to/karlhadwen/node-js-websocket-tutorial-real-time-chat-room-using-multiple-clients-24ad

<!-- > -->

...

<!-- > -->

## Using Prisma Studio

<!-- > -->

Prisma provides a tool called Studio. You can use this to browse and edit your databases. 

<!-- > -->

Launching Prisma Studio...

<!-- > -->

Tour Prisma Studio...

<!-- > -->

## After Class 

<!-- > -->

Continue the tutorial...

<!-- > -->

## Resources

<!-- > -->

1. 