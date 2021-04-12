# FEW 2.9 React Review

<!-- > -->

Your GraphQL Projects need a frontend!

<!-- > -->

Any type of front end client can connect to a GraphQL backend server. We will be using React.

<!-- > -->

React is a library for creating user interfaces. It is one of the most popular web frameworks.

<!-- > -->

Why use React?

<!-- > -->

It's efficient and has a great workflow, developer experience and community.

<!-- > -->

## Class Learning Objectives/Competencies

1. Build a React app
2. Create reusable components
3. Use JSX, State and Props
4. Use Hooks

<!-- > -->

## Review

<!-- > -->



<!-- > -->

## Overview

<!-- > -->

The React library has several core features let's take a look at those:

- Components
- JSX
- ReactDOM

<!-- > -->

## Creating a React App

<!-- > -->

Creat a React using: 

```
npx create-react-app <app-name>
```

This creates a new folder containing a complete React project. 

<!-- > -->

Let tour the project.

- public/
- src/
  - index.js
  - index.css
  - App.js
  - App.css

<!-- > -->

### Components

<!-- > -->

Components are the foundational building block of React Applications. Most often a component represents a view.

<!-- > -->

Components are composable. Components can be nested within other components. Complex components are made from smaller less complex components.

- Components must return [JSX](#jsx)
- Components can be built from a function or a class

<!-- > -->

This is a Component

```JS
function Header(props) {
 return (
  <h1>{props.title}</h1>
 )
}
```

<small>In it's simplest form a Component is a function that returns JSX.</small>

<!-- > -->

What's JSX? 

JSX is an extension of the JavaScript Lanaguage. 

JSX === JavaScript and XML. 

<!-- > -->

JSX provides a HTML like syntax that compiles to standard JS. For example: 

```js
<h1>{props.title}</h1>
```

Becomes: 

```JS
React.createElement("h1", null, props.title);
```

<small>The magic is that the first line looks exactly like what will be generated for the browser to display.</small> 

<!-- > -->

Why use JSX? 

- Looks like the HTML it will generate
- Easier to reason about

<!-- > -->

## JSX has it's own rules! 

<!-- > -->

1. Must have a top level node

```JS
// Good!
<div>
  <h1>Hello</h1>
  <p>World</p>
</div>
```

```JS
// Error!
<h1>Hello</h1>
<p>World</p>
```

<!-- > -->

If you don't want to create an extra tag use a fragment!

```JS
// Good!
<>
  <h1>Hello</h1>
  <p>World</p>
</>
```

<!-- > -->

Can't use `class`, use `className` instead!

```JS
// Good!
<div className="App">
  <h1 className="title">Hello</h1>
  <p>World</p>
</div>
```

```JS
// Error!
<div class="App">
  <h1 class="title">Hello</h1>
  <p>World</p>
</div>
```

<!-- > -->

A tag with no children can be self closing by adding a `/` be the closing `>`.

```JS
// Error!
<div class="App">
  <br />
  <img />
  <hr />
  <Game />
  <Map />
</div>
```

<!-- > -->

Values in JSX are strings (use double quotes!) Other values use `{}`.

```JS
<div>
  <img src={url} width={100} height={150} />
</div>
```

<small>Imagine `url` is a variable</small>

<!-- > -->

Any JS expression can be used in a JSX expression as long as it appears in the `{}`.

```JS
<div>
  <img 
    src={`${path}/${filename}`} 
    width={w * 0.5} 
    height={h * 0.5} 
    onClick={() => {
      ...
    }}
  />
</div>
```

<small>Move attributes to their own line for clarity.</small>

<!-- > -->

### Composing Components

<!-- > -->

Store components each in their own file. 

```JS
// Title.js
function Title() {
  return <h1>Hello World</h1>
}

export default Title
```

```JS
// App.js
import Title from './Title.js'

function App() {
  return <Title />
}
```

<!-- > -->

If you're returning more than one line of JSX wrap in `()`.

```JS
// App.js
import Title from './Title.js'

function App() {
  return (
    <div className="App">
      <Title />
    </div>
  )
}
```

<!-- > -->

## Props

<!-- > -->

Props are values passed to a component. 

When props change the component renders. 

Props come from outside the component and are passed into the the component.

<!-- > -->

Pass props to a component via attributes: 

```JS
// Imagine we're using the component somewhere
<Heading title="Hello" subtitle="world" />
```

```JS
// Heading.js
function Heading(props) {
  // { title: "Hello", subtitle: "world" }
  return (
    <>
      <h1>{props.title}</h1>
      <p>{props.subtitle}</p>
    </>
  )
} 
```

<!-- > -->

## State 

<!-- > -->

State presents values the component stores internally. 

When state change the component renders. 

<!-- > -->

Define state like this: 

```JS
import { useState } from 'react'

function Counter() {
  const [ count, setCount ] = useState(0)
  return (
    <>
      <h1>{count}</h1>
      <button 
        onClick={() => setCount(count + 1)}
      >Add 1</button>
    </>
  )
}
```

<small>Here `count` is increased by 1 with each click.</small>

<!-- > -->

## Controlled Component Pattern

<!-- > -->

The controlled component pattern is used to handle form elements. 

<!-- > -->

```JS
import { useState } from 'react'

function Counter() {
  const [ zip, setZip ] = useState('')
  return (
    <>
      <input 
        value={zip}
        onChange={(e) => setZip(e.target.value)}
      />
    </>
  )
}
```

<small>Here state holds the value set on the input and is updated when the input changes.</small>

<!-- > -->

## Connecting a Client to GraphQL

<!-- > -->

For the client side you'll be using Apollo GraphQL client.

<!-- > -->

The goal of this project is to create a client built with React that connects to your GraphQL OpenWeatherMap server. 

<!-- > -->

The server will run at locahost:4000 and the client will run on localhost:3000. You need so start both for the project ti work locally. 

<!-- > -->

I find it easier to keep both projects in seprate folders.

<!-- > -->

## Apollo Client

<!-- > -->

Your React project should import

<!-- > -->




Steps 

- npx create-react-app weather-client
- npm install @apollo/client
- In index.js - setup Apollo client
```js
// make an instance of the Apollo client
export const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
});
```
- Still in index.js Wrap your app in the ApolloProvider
```js
ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
```
- The following can be used in any component that is a child of App!
- Import your `client` and `gql`
```js
import { gql } from '@apollo/client'
import { client } from './index'
```

































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

## After Class

Finish up the [Node + GraphQL](https://www.howtographql.com/graphql-js/1-getting-started/) tutorial

<!-- > -->

### Stretch Challenges

Finish up the [Node + GraphQL](https://www.howtographql.com/graphql-js/1-getting-started/) tutorial and build the following functionalities off the completed version:

- Implement a functionality on your GraphQL Server that allows your users add comments to the links
- Implement a functionality on your GraphQL Server that allows users to upvote comments

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