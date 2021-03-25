# FEW 2.9 React Review

<!-- > -->

Any type of front end client can connect to a GraphQL backend server. We will be using React.

React is a library for creating user interfaces. It is one of the most popular web frameworks.

It's efficient and has a great workflow, developer experience and community.

<!-- > -->

## Class Learning Objectives/Competencies

1. We would build a simple React app.
2. Build and use a reusable component
3. Use fundamental features JSX, State and Props
4. Use Hooks

<!-- > -->

## Review

Discuss:

- What is a subscription in GraphQL?
- What features/functionalities are GraphQL subscriptions best used for?
- How are Subscriptions implemented in a JavaScript environment?

<!-- > -->
Write a GraphQL Subscription operation(schema and resolver) that notifies clients when a new book is created

```js
 type Book {
    id: ID!
    title: String!
    pages: Int
    chapters: Int
    authors: [Author!]!
}
type Author {
    id: ID!
    name: String!
    books: [Book!]!
}

type Query {
  books: [Book!]
  book(id: ID!): Book
  authors: [Author!]
}
type Mutation {
  book(title: String!, authors: [String!]!, pages: Int, chapters: Int): Book!
}
```

<!-- > -->

## Overview

<!-- > -->

The React library has several core features let's take a look at those:

- Components
- JSX
- ReactDOM

<!-- > -->

### Components

<!-- > -->

Components are the foundational building block of React Applications. Most often a component represents a view.

Components are composable. Components can be nested within other components. Complex components are made from smaller less complex components.

- Components must return [JSX](#jsx) and handle user events using event handlers.
- Components in React can either be Functional components or Class Components i.e. they can be written as a function or a class

<!-- > -->
Class components have several lifecycle methods that can be used at particular times. Some of the commonly used ones are:

| LifeCycle Method | When it's called |
| ----------- | ----------- |
| [`constructor()`](https://reactjs.org/docs/react-component.html#constructor) | When component is being created and inserted into the DOM |
| [`render()`](https://reactjs.org/docs/react-component.html#render) | When component is being created and inserted into the DOM(rendered) and when it being re-rendered or updated. It is a required method. |
| [`componentDidMount()`](https://reactjs.org/docs/react-component.html#componentdidmount) |  After the component is rendered |
| [`componentDidUpdate()`](https://reactjs.org/docs/react-component.html#componentdidupdate) | After a component updates|
| [`componentWillUnmount()`](https://reactjs.org/docs/react-component.html#componentwillunmount) | Before a component is destroyed. It is a clean up method.|

<!-- > -->

Example component

```JS
function Header(props) {
 return (
  <h1>{props.title}</h1>
 )
}
```

<!-- > -->

### JSX

<!-- > -->

- JSX is an extension of the JavaScript language.
- JSX uses an HTML like syntax based on XML
- JSX is translated to HTML
- We use JSX to render our views

<!-- > -->

JSX example:

```JS
function Header(props) {
 return (
  <header>
   <h1 className="Header-title">{props.title}</h1>
   <p className="Header-subtitle">{props.subtitle}</p>
   <PostDate date={props.date} />
  </header>
 )
}
```

<!-- > -->

### ReactDOM

<!-- > -->

React uses a virtual DOM to increase efficiency. The virtual DOM is managed through `ReactDOM`.

Since the virtual DOM is used to generate the real DOM you should never modify the DOM directly with JS! Instead make changes only via components.

<small>Read [here](https://reactjs.org/docs/faq-internals.html) for more on the Virtual DOM</small>

<!-- > -->
The next block shows a very simple React app with these three features.

<!-- > -->

```js
//Import React and ReactDOM libraries
import React from 'react';
import ReactDOM from 'react-dom';


// Create a simple React Functional component named App
const App = () => {
    //declaring a variable for use within the JSX block
    const buttonText = 'Click Me';

    // A JSX block. The App component here returns a block of JSX for display
    // JSX uses similar tags like with HTML. Take note of the important differences in syntax here
    return (
        <div>

            <label className="label" htmlFor="name">Enter Name:</label>
            <input id="name" type="text" />
            <button style={{backgroundColor:'blue', color: 'white'}}>

                {buttonText}
            </button>
        </div>
    );
}

// ReactDOM - the renderer - takes the component and renders it to the DOM
ReactDOM.render(
    <App />,
    document.getElementById('root')
)
```

<!-- > -->

### Props

<!-- > -->

Props are values passed into a component from outside. It essentially allows for communication between a parent component and its child component. Use props to configure a component.

<!-- > -->

Every component receives props as a parameter. Keys on the props object are assigned via attributes where the component is defined.  

<!-- > -->

```JS
function Title(props) {
 return (
  <h1>{props.title}</h1>
 )
}

function Header() {
 return (
  <header>
   <Title title="Hello World!" />
  </header>
 )
} 
```

<!-- > -->

- The parent component provides data/information and the child consumes that data/information.

<!-- > -->

Let's look at an example.

<!-- > -->

```js
import React, { Component } from "react";
import ReactDOM from "react-dom";

// Create App parent component
class App extends Component {
  
  render() {
      return (
          <div>
          <Message text="Sending text prop" header="Header Prop"/>
          </div>
      );

  }
}

// create Message child component
class Message extends Component {
    
  render() {
      return (
          <div className="message">
              <div className="header">{this.props.header}</div>
              <p>{this.props.text}</p>
          </div>
      );

  }
}
// The ReactDOM renderer looks into the html document for the element with id whose id is "root"
ReactDOM.render(
    <App />,
  document.getElementById('root')
);
```

<!-- > -->

### State

<!-- > -->

Components can hold values internally this is called state.
The State system in React is all about managing data inside of a component.

The state of a component controls it's appearance since a component will render when it's state changes.

<!-- > -->

State can be used with class based components and it stored on `this.state` within the component.

State can be used with function based components using the `useState` hook.

<!-- > -->
State with Class Component

```js

class App extends Component {
  constructor(props) {
    super(props);
    // initialise state
    this.state = { lat: null };

    window.navigator.geolocation.getCurrentPosition(
      position => {
        // update the state object with latittude using setState
        this.setState({lat: position.coords.latitude})
      },
      (err) => console.log(err)
    );
  }
  
  render() {
    return (
      <div>
        Latitude: {this.state.lat}
      </div>
    )
  }
}
```

<!-- > -->

State with Function Component

```js
import { useState, useEffect } from 'react'

function App(props) {
 const [lat, setLat] = useState(undefined)

 useEffect(() => {
  window.navigator.geolocation.getCurrentPosition(
      position => {
        // update the state object with latittude using setLat
        setLat({lat: position.coords.latitude})
      },
      (err) => console.log(err)
    )
 }, [lat])

 return (
  <div>
   Latitude: {lat}
  </div>
 )
}
```

<!-- > -->

### Hooks

<!-- > -->
Handling state and implementing operations **similar** to the [lifecycle methods](https://reactjs.org/docs/react-component.html) in Functional React Components takes a different approach.
The Hooks system in React takes charge of this approach. Some popular Hook mehtods are:

- `useState()` : gives access to state in a functional component
- `useEffect()` : helps implement some similar operations to the lifecycle methods
- `useRef()` : creates 'ref' in a functional component

<!-- > -->
 The code snippet below shows a simple implementation of the `useState()` method.

```js
// import the useState method from the library
import React, { useState } from 'react';

function Example() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```
<!-- > -->

<!-- > -->

 The code snippet below shows a simple implementation of the `useEffect()` method.

```js
//  import the useEffect method from the react library
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

<!-- > -->
## Generating a new React Project

<!-- > -->

Follow these

- `npx create-react-app <project-name>`
- Start your app with `yarn start`

<!-- > -->

## Challenge

<!-- > -->

You will build a React App that fetches weather data from your GraphQL Weather server. It will be use the Apollo client for GraphQL for query.

<!-- > -->

To get started, your GraphQL server needs to support Cross-Origin Resource Sharing (CORS)

<!-- > -->

What's CORS?

Cross-Origin Resource Sharing is a mechanism that uses additional HTTP headers.

It uses these headers to tell a browser to let a web application running at one origin have permission to access selected resources from a server at a different origin.

<!-- > -->
- Go to your GraphQL server directory and run `npm i cors`
- `cors` is a node.js package that can be used to enable CORS.

<!-- > -->
Include the following piece of code to your GraphQL server file

  ```js
  // after importing other dependencies
  const cors = require( `cors` );
    //Schema code here
  // Create an express app
    const app = express()
    app.use(cors());
  ```

<!-- > -->
- Start your GraphQL Weather server
- Create a new react project
- install Apollo `npm install @apollo/client graphql`

<!-- > -->
### Create Component - APP.js

<!-- > -->
We would first create an App component that displays an input field.
In your project folder the `src/App.js` include this piece of code.

```js
// import dependencies
import { useState, useEffect } from 'react'
import { gql } from '@apollo/client';
import { client } from './index'

function App() {
  // initialize state and the setter method to set the zip value
  const [zip, setZip] = useState('') 
  // initialize state and the setter method to set weather data
  const [weather, setWeather] = useState(null)

  return (
    <div className="App">
        <form>
        <label>Input Zip Code</label>
        {/** 
        This pattern is called controlled component patterm
        * used for input and other form elements 
        * Set the value of the input to a value held in component's state
        * Set the value held in component state when a change occurs(onChange) at the input
        * the OnChange method is a event handler available in React and is called everytime a change occurs on our input element  
        */}
          <input
            type="text" 
            placeholder="zip code"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
          />
        </form>
    </div>
  );
}

export default App;
```

<!-- > -->
### Render the Weather Details - Asynchronous operations (async, await)

<!-- > -->
`Async` and `await` are keywords that are used for Promises in JavaScript.

- The `Async` keyword identifies an asyncronous function. An `Async` function always returns a Promise!

- The `await` keyword only works within an `Async` function. Use await at the beginning of any expression that would return a Promise. JavaScript will wait at that line until the Promise resolves.

<!-- > -->
The syntax for using Async/Await looks like so:

```js
  const AsyncFuntion = async () => {

    // wait until promise resolves
    let result = await promise
  }

```

<!-- > -->
- Update your `App.js` file to include an asynchronous `fetchWeather` function.
- Wrap your App in the ApolloProvider
- Make an instance of the Apollo client
- Define a GraphQL query

<!-- > -->
```js
import { useState, useEffect } from 'react'
import { gql } from '@apollo/client';
import { client } from './index'


async function fetchWeather(zip, setter) {
  try {
    // define a query
    const json = await client.query({
      query: gql`
        query {
          getWeather(zip:${zip}) {
            temperature
            description
          }
        }
      `
    });
    setter(json)
  } catch(err) {
    console.log(err.message)
  }
}


function App() {
  const [zip, setZip] = useState('') 
  const [weather, setWeather] = useState(null)

  return (
    <div className="App">
      <header className="App-header">
        {weather ? <h1>{weather.data.getWeather.temperature}</h1>: null}
        <form
          onSubmit={(e) => {
            e.preventDefault()
            fetchWeather(zip, setWeather)
          }}
        >
          <input
            type="text" 
            placeholder="zip code"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
          />
        </form>
      </header>
    </div>
  );
}

export default App;
```

<!-- > -->
### Create a child component - Weather.js

<!-- > -->
Right now, all the work for fetching and rendering data is handled by one component - `<App/>`. Remember, components should be simple and reusable.

Your next challenge is to create a new component - `<Weather/>` - to handle loading and displaying weather details.

<!-- > -->
- Create a new file `Weather.js`. This file will contain the Weather component and load and display the weather data
- Import the `Weather` component into `App.js`
- Display the `<Weather/>` compnent in `App.js`

<!-- > -->
```js
  /*
  * Weather.js file
  * This file contains the Weather  component
  *
  */
 import { useState, useEffect } from 'react';
 import { gql } from '@apollo/client';
import { client } from './index';

  function Weather(props) {
      // todo: initialiaze state here. Remember this component will have to 
      // support the values in state - zip and weather
  
    async fetchWeather() {
      // todo: write code for loading and displaying weather details here
    }

    return (
      // to do: write jsx block to render weather data
    )
    
  }

  // export the component as a module
  export default Weather;
```

<!-- > -->
```js
  /*
  * App.js file
  * This file contains the App parent component
  *
  */

  //import Weather component into App.js
  import Weather from "./Weather";

  function App() {
      // todo: Display the Weather Component with its props, if any

      return(
        <div>
          <Weather/>
        </div>
      );
    
  }

  
  export default App;
```

<!-- > -->

### Stretch Challenges

Finish up the [Node + GraphQL](https://www.howtographql.com/graphql-js/1-getting-started/) tutorial and build the following functionalities off the completed version:

- Implement a functionality on your GraphQL Server that allows your users add comments to the links
- Implement a functionality on your GraphQL Server that allows users to upvote comments

<!-- > -->

## After Class

Time to start working on the frontend of hacker news!

Start working on the React + Apollo tutorial: <https://www.howtographql.com/react-apollo/0-introduction/>

- Complete the following chapters by next class: `Introduction`, `Getting Started`, `Queries: Loading Links`

<!-- > -->
## Resources

- <https://reactjs.org/tutorial/tutorial.html>
- [Component Lifecycle](https://reactjs.org/docs/react-component.html)
- [Hooks](https://reactjs.org/docs/hooks-intro.html)
- [Async/await](https://javascript.info/async-await)
- [Using Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
- [Array Destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
- <https://www.apollographql.com/docs/react/get-started/>

<!-- > -->