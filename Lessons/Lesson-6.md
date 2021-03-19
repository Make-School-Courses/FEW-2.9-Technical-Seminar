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

- Push notifications
- Real time communications

<!-- > -->

What are these good for? 

- Social media
- Games
- Real time updates

<!-- > -->

### Try out Websockets

<!-- > -->

Start by making a new Node project: 

- `npm init -y`
- `npm install ws express`

<!-- > -->

Create a server: 

- Create: `server.js`

<!-- > -->

Add this code to server.js:

```JS
// Import dependencies
const express = require('express');
const http = require('http');
const WebSocket = require('ws');
```

<!-- > -->

```JS
// Define a port
const port = 6969;
// create a server
const server = http.createServer(express);
// Open a web socket
const wss = new WebSocket.Server({ server })
```

<!-- > -->

```JS
// Handle a web socket connection
wss.on('connection', function connection(ws) {
	// After making a connection start listening for messages
	console.log('client connecting')

  ws.on('message', function incoming(data) {
		// For each client broadcast the data
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    })
  })
})
```

<!-- > -->

```JS
// Start the server
server.listen(port, function() {
  console.log(`Server is listening on ${port}!`)
})
```

<!-- > -->

Make a client. This will be a simple web page that will connect to the server.

- Create index.html

<!-- > -->

```HTML
<!DOCTYPE html>
<html>
	<head></head>
	<link href="styles.css" rel="stylesheet">
	<body>
		<h1>Real Time Messaging</h1>

		<pre id="messages"></pre>
		
		<input type="text" id="message-input" placeholder="Type your message here">

		<button id="send" title="Send Message!" style="width: 100%; height: 30px;">Send Message</button>
		
		<script src="index.js"></script>
	</body>
</html>
```

<!-- > -->

Create index.js and add the following: 

```JS
// Get references to DOM elements
const sendBtn = document.querySelector('#send');
const messages = document.querySelector('#messages');
const messageInput = document.querySelector('#message-input');

let ws;

function showMessage(message) {
  messages.innerHTML += `${message}\n\n`;
  messages.scrollTop = messages.scrollHeight;
  messageInput.value = '';
}

function init() {
  // Clean up before restarting a websocket connection
  if (ws) {
    ws.onerror = ws.onopen = ws.onclose = null;
    ws.close();
  }

  // Make a new Websocket
  ws = new WebSocket('ws://localhost:6969');
  // Handle the connection when it opens
  ws.onopen = () => {
    console.log('Connection opened!');
  }
  // handle a message event
  ws.onmessage = ({ data }) => showMessage(data);
  // Handle a close event
  ws.onclose = function () {
    ws = null;
  }
}

// Handle button clicks
sendBtn.onclick = function () {
  // Send a message
  if (!ws) {
    showMessage("No WebSocket connection :(");
    return;
  }

  ws.send(messageInput.value);
  showMessage(messageInput.value);
}

init();
```

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

Finish the Hackernews Node.js tutorial!

- Complete the following chapters by the next class: `Realtime GraphQL Subscriptions`, `Filtering, Pagination & Sorting` and `Summary`

<!-- > -->

## Resources

<!-- > -->

1. 