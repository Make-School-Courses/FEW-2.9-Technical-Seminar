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
1. Describe Websockets
1. Implement a websocket server
1. Implement a websocket client

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

This example creates a simple server using Express.js and a web page that communicates with the server via a websocket.

<!-- > -->

There two pieces to this example. 

- The server handles a websocket connections and broadcasts messages received to all connected clients. This portion, in `server.js`, is written with node and express. The code here is specific to that environment! 
- The client code is written using the browser websocket API. This code is written in `index.js`. This client code opens a websocket connection with the server. It sends messages to the server and receives messages from the server.

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

### Websockey Challenges

<!-- > -->

**Challenge 1 - Implement and test websocket example**

Implement the code above and test your code.

- launch the server with `node server.js` or `nodemon server.js`
- Open `index.html` in two windows or tabs
- Sending a message from on of the tabs/windows should display that message in both windws. 

Every tab/window running the client should get messages broadcast by the server. 

<!-- > -->

**Challenge 2 - Mod the client**

Here the client is made up of a couple functions: 

- `init()` - initializes the web socket 
- `showMessage()` - displays a new line of text

Currently the text displayed is just added to the `innerHTML` of the `messages` element. Wrap the message in an html tag. 

- Wrap the message in the list element `<li>` and `</li>`
- In `index.html` change the `<pre id="messages">` to `<ul id="messages">`

<!-- > -->

**Challenge 3 - Mod the client**

Let's mod the client and in;cude a name with each message. 

- Add a input field to add a name. 
	- `<input type="text" id="input-name">`
- Create a reference to the new element
	`const nameInput = document.querySelector('#name-input')`
- When sending the message you need to send both the name and the message. You can do this one of two ways. In both cases you'll be modifying the data that is sent to the websocket. This appears on the last line. 
	1. Combine both the name and message into a single string. 
	2. Send an object with two fields. This solution will require that you modify the show message function since `message` would now be an object. 
- Show the name before the message.  

To solve this problem you will have to convert the data sent to the server to JSON and parse the JSON from the server back to JS. The data field is always a string for websockets! 

This means at the send button: 

```JS
// Create an object:
const data = { message: messageInput.value, name: nameInput.value }
// Convert to JSON to send to server
ws.send(JSON.stringify(data))
showMessage(data)
```

When receivibg data you'll need to parse the JSON into JS: 

```JS
showMessage(JSON.parse(e.data))
```

The ouptut should look something like: 

```
Andy: Hello
Bob: World
```



<!-- > -->

### Websocket Resources

- https://github.com/websockets/ws
- Simple Websocket example in JS: https://dev.to/karlhadwen/node-js-websocket-tutorial-real-time-chat-room-using-multiple-clients-24ad

<!-- > -->

## Using Prisma Studio

<!-- > -->

Prisma provides a tool called Studio. You can use this to browse and edit your databases. 

<!-- > -->

Launching Prisma Studio...
Tour Prisma Studio...

<!-- > -->

## After Class 

<!-- > -->

Finish the Hackernews Node.js tutorial!

- Complete the following chapters by the next class: `Realtime GraphQL Subscriptions`, `Filtering, Pagination & Sorting` and `Summary`

<!-- > -->

### Evaluate your progress

1. Describe Subscriptions
1. Describe Websockets
1. Implement a websocket 
1. Implement a websocket client

| - | Does not meet expectations | Meets expectations | Exceeds expectations | 
|:---:|:---:|:---:|:---:|
| Conprension of Subscriptions | Can't explain GraphQL subscriptions | Can explain GraphQL subscriptions | Could teach the basics of GraphQL subscriptions to another student |
| Websockets | Can't describe websockets | Can describe websockets | Could describe uses cases for websockets |
| Implementing websocket server | Can't implement a simple web socket | Can implement a websocket server | Could expand upon the challenge solution server |
| Create a Websocket client | Can't create a simple websocket client | Can create a simple websocket client | Could expand on the challenge solution |

<!-- > -->

## Resources

<!-- > -->

1. https://github.com/websockets/ws
1. Simple Websocket example in JS: https://dev.to/karlhadwen/node-js-websocket-tutorial-real-time-chat-room-using-multiple-clients-24ad
1. https://github.com/prisma/studio