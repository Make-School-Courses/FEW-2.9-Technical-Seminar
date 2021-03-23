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
4. Build an app that works with a public API using use fetch to load data
5. Use Hooks

<!-- > -->

## Review

<!-- > -->

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

- Components return [JSX](#jsx) and handle user events using event handlers.
- Components can have children(a component shown inside another) or be the child to another component.
- The App (in the App.js) component in a React Project is the base or parent component for all other components.
- Components in React can either be Functional components or Class Components
- When we write React Compnents we shpuld target making them Simple, Stateful(where needed) and easily reusable throughout the application.
- Each **Class based** component has several lifecycle methods that can be used at particular times. Some of the commonly used ones are:

| LifeCycle Method | When it's called |
| ----------- | ----------- |
| [`constructor()`](https://reactjs.org/docs/react-component.html#constructor) | When component is being created and inserted into the DOM |
| [`render()`](https://reactjs.org/docs/react-component.html#render) | When component is being created and inserted into the DOM(rendered) and when it being re-rendered or updated. It is a required method. |
| [`componentDidMount()`](https://reactjs.org/docs/react-component.html#componentdidmount) |  After the component is rendered |
| [`componentDidUpdate()`](https://reactjs.org/docs/react-component.html#componentdidupdate) | After a component updates|
| [`componentWillUnmount()`](https://reactjs.org/docs/react-component.html#componentwillunmount) | Before a component is destroyed. It is a clean up method.|

[Common React Lifecyle methods](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)

<!-- > -->

- A component can be written as a function or a class.
- A component must return JSX
- Components can contain other components.

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

React uses a virtual DOM to increase effeciency. The virtual DOM is managed through `ReactDOM`.

Since the virtual DOM is used to generate the real DOM you should never modify the DOM directly with JS! Instead make changes only via components.

<small>Read [here](https://reactjs.org/docs/faq-internals.html) for more on the Virtual DOM</small>

<!-- > -->

Putting these all together, here's a very simple React block of code with these three features. This code will show a simple form with a button that reads 'Click Me'.

Check out the comments for some more details:

```js
//Import React and ReactDOM librariea
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

            {/* Notice the use of "className" attribute instead of "class"
             * the use of "htmlFor" instead of "for"
             */}

            <label className="label" htmlFor="name">Enter Name:</label>
            <input id="name" type="text" />
            
            {/*
            * Inline styling also has a different syntax
            * notice the html attribute 'background-color' is written as camel case 'backgroundColor'
            */}
            <button style={{backgroundColor:'blue', color: 'white'}}>

            {/*
            * Referencing a variable in JSX we make use of curly braces around the variable name
            * In this example we refrence the {buttonText} variable we declared before
            */}

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

Every component receives props as a parameter. Keys on the props object are assigned via attributes where the component is defiend.  

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

In this example, we would be using two components namely : `App`(parent component) and `Message`(child component). The `Message` component will be receiving props `header` and `text` from the parent `App` component.

<!-- > -->

Again, go through the comments for more details:

```js
// import libraries. Destructure Component to enable creating Class based React components
import React, { Component } from "react";
import ReactDOM from "react-dom";

/*
* This example creates Class-Based React Components. It follows the class defintion syntax for ES6 classes
* In writing a class component we have to make sure the compnent inherits(extends) 
* from the Component class avaliable by default in the react library
* Components can be referred to in other components using the syntax <ComponentName/>
* In this example, the Message component is referred to in its parent component with </Message>
*/

// create the App Component
class App extends Component {
  
  // the render method is used to return a block a JSX. 
  // It is an important method in class based React compnents
  render() {
      return (
          <div>
          {/* The App component here sends a text and header prop with their respective values*/}
          <Message text="Sending text prop" header="Header Prop"/>
          </div>
      );

  }
}

// create the Message component
class Message extends Component {
    
  render() {
      return (
          <div className="ui message">
            {/* 
            * The header and text prop sent from the App component is consumed here in the Message component
            * Their values are available on the this.props object
            */}
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

```js
/*
* This examples uses the browser's native geolocation object
* to fetch the latitude of of a current positon
*
*/

class App extends Component {
  // the state object is initialized in the constructor of the class
  constructor(props) {
    super(props);
    // the state object is usually defualted to a reasonable value. In this case, the null value
    // initialising the state object is the only time we do direct assignment to this.state
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

Handling state and implementing operations **similar** to the [lifecycle methods](https://reactjs.org/docs/react-component.html) in Functional React Components takes a different approach.
The Hooks system in React takes charge of this approach. Some popular Hook mehtods are:

- `useState()` : gives access to state in a functional component
- `useEffect()` : helps implement some similar operations to the lifecycle methods
- `useRef()` : creates 'ref' in a functional component

#### useState

 The code snippet below show a simple implementation of the `useState` method. Check the comments for more details.

```js
// import the useState method from the library
import React, { useState } from 'react';

function Example() {
  // Initialization: Declare a new state variable, which we'll call "count"
  /*
  * whenever we call useState(), we get back an array with exactly two items.
  * First item = the piece of state; Second item = setter function used to update state
  * Destructure two items from the useState function with Array destructuring
  * here the state value= count, setter = setCount
  * set default value of count to 0
  */
  const [count, setCount] = useState(0);

  return (
    <div>
    {/* Referencing the state value {count} */}
      <p>You clicked {count} times</p>
      {/* updating state: call setter function - setCount() - on button click to update state value */}
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

#### useEffect

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

The challenge today is to build a React App that fetches weather data from your GraphQL Weather server. We would be using the Apollo client for GraphQL.

To get started

- Your GraphQL server needs to support Cross-Origin Resource Sharing (CORS)
  - Go to your server directory and run `npm i cors`
  - include the following piece of code to your GraphQL server file

  ```js
  // after importing other dependencies
  const cors = require( `cors` );
    //Schema code here
  // Create an express app
    const app = express()
    app.use(cors());
  ```

- Start your GraphQL Weather server
- Create a new react project
- install Apollo `npm install @apollo/client graphql`

<!-- > -->
### Create Component - APP.js

We would first create an App component that displays an input field.
In your project folder the `src/App.js` include this piece of code. Take note of the comments for more details

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

`Async` and `await` are keywords that are used for Promises in JavaScript.

- The `Async` keyword identifies an asyncronous function. An `Async` function always returns a Promise!

- The `await` keyword only works within an `Async` function. Use await at the beginning of any expression that would return a Promise. JavaScript will wait at that line until the Promise resolves.

The syntax for using Async/Await looks like so:

```js
  const AsyncFuntion = async () => {

    // wait until promise resolves
    let result = await promise
  }

```

Update your `App.js` file to include an asynchronous `fetchWeather` function.

<!-- > -->

- Wrap your App in the ApolloProvider
- Make an instance of the Apollo client
- Define a GraphQL query

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

Right now, all the work for fetching and rendering data is handled by one component - `<App/>`. Remember, components should be simple and reusable.

Your next challenge will be make sure that there is a new component - `<Weather/>` - to handle loading and displaying weather details. See starter code below.

- Create a new file `Weather.js`. This file will contain the Weather component and load and display the weather data
- Import the `Weather` component into `App.js`
- Display the `<Weather/>` compnent in `App.js`

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

## Resources

- <https://reactjs.org/tutorial/tutorial.html>
- [Component Lifecycle](https://reactjs.org/docs/react-component.html)
- [Hooks](https://reactjs.org/docs/hooks-intro.html)
- [Async/await](https://javascript.info/async-await)
- [Using Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
- [Array Destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
- <https://www.apollographql.com/docs/react/get-started/>
