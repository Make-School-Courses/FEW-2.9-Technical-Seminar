# FEW 2.9 React Review

Any type of front end client can connect to a GraphQL backend server. We will be using React.
This class will be a fast review of React.

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

Discuss:

- What is a subscription in GraphQL?
- What features/functionalities are GraphQL subscriptions best used for?

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

The React library has several core features let's take a look at those:

### Components

React Projects are built from components. They encapsulate logic(methods and code), state(properties) and the view of a React App.

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

![React Lifecyle methods](https://reactjs.org/docs/react-component.html)

<!-- > -->
### JSX

JSX is an extension of the JavaScript language that gives us an HTML-like syntax to write our UI code.

- It is a set of instructions to tell React what content we want to display.
- It tells React to either create HTML elements or show another component.
- **IMPORTANT** JSX has its own special syntax

<!-- > -->
### ReactDOM

Whenever we work with React, we work with two separate libraries: React library itself and  the ReactDOM.

- React creates and manipulates a virtual DOM to make the process of updating the DOM a faster one.
- The ReactDOM looks at the virtual DOM, compares it to the real DOM and makes changes where necessary.
- Making changes to the DOM directly will not work as expected a React App.
- Manipulating the DOM in React Apps should be handled mostly by a [Component](#components)

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

Some of the other React features we would look at are built into the first three:

### Props

Props are values passed into a component from outside. It essentially allows for communication between a parent component and its child component.

- The parent component provides data/information and the child consumes that data/information.

Let's look at an example.

In this example, we would be using two components namely : `App`(parent component) and `Message`(child component). The `Message` component will be receiving props `header` and `text` from the parent `App` component.

Agian, go through the comments for more details:

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

Components can hold values internally this is called state.
The State system in React is all about managing data inside of the application. Specifically data that will change over time.

- In React, `state` is a JavaScript Object that contains some amount of data strictly relevant to a single component
_ `state` must be initialised when a component is created
- `state` can only be updaed using the `setState` method.
- updating `state` will cause components to almost instantly render

The code snippet below shows an App component that has a state object initialized and updated.

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

Generating a new React project with a template project structure is as easy as running the npm executable `npm create-react-app your_app_name`. Where `your_app_name` is the title you choose to give your poject.

To make this run you should first

- The `create-react-app` helps install and set up dependencies (Babel, Webpack and Webpack Dev Server)
- It sets up a project directory structure. In the new project folder it creates you will find:
  - `src` folder -  will contain all React source code we write
  - `public` folder - will contain static files and folders for app (e.g. html file, image file etc.)
- Start your app with `npm start`

<!-- > -->
## Challenge

The challenge today is to build a React App that fetches weather data from a public API.
The app gets zip code from its users and returns data with weather details of the area with that zip code.

We would be using the free and easy to use [OpenWeatherMap.org](https://openweathermap.org/) API

To get started:

- create a new React Project `npx create-react-app search-weather`
- Go to <https://openweathermap.org>
- Make an account or sign in to your account
- Go to settings > API Keys
- Generate an API Key
- create a `.env` file in the root of your new project directory
- Paste your newly generated API Key into your `.env` file
  - It should follow this format `REACT_APP_MY_VAR=some_value_123`
  
  For example:

  ```env
  REACT_APP_WEATHER_API_KEY=<your-api-key-here>
  ```

<!-- > -->
### Create Component - APP.js

We would first create an App component that displays an input field.
In your project folder the `src/App.js` include this piece of code. Take note of the comments for more details

```js
import React, {Component} from 'react'

// ! Get your own API key !
const apikey = process.env.REACT_APP_WEATHER_API_KEY

class App extends React.Component {

    constructor(props){
      super(props)

      //initialize state
      this.state = {
                    inputValue: '94010', // Used to store value entered in the input field - the zip  value
                    weatherData: null, // Used to store the data loaded from the weather API
                }
    }

     render() {
        return (
            <div className="container">
            
            <div className= "segment">
                <form className ="form" }>
                    <div className= "field">
                        <label>Input Zip Code</label>
                      {/** 
                      This pattern is called controlled component patterm
                      * used for input and other form elements 
                      * Set the value of the input to a value held in component's state
                      * Set the value held in component state when a change occurs(onChange) at the input
                      * the OnChange method is a event handle available in React and is called everytime a change occurs on our input element  
                      */}
                        <input type="text" 
                        value= {this.state.inputValue} 
                        onChange={(e)=> this.setState({inputValue: e.target.value})}/>
                    </div>
                    
                </form>
            </div>
        </div>
        )
     }
}

export default App;

```

<!-- > -->
### Render the Weather Details - Async (fetch, async, await)

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

The Fetch API provides a global `fetch()` method that provides an easy way to fetch data asynchronously across the HTTP network.

We would be using this method here to fetch data when we make an API request to our weather API.

Update your `App.js` file to include a `handleFormSubmit` method, a fetch request and a `renderWeather` method
that displays the details of the fetched data:

```js
import { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);

    //initialize state

    this.state = {
      inputValue: "94010", // Used to store value entered in the input field - the zip  value
      weatherData: null, // Used to store the data loaded from the weather API
    };
  }
  // this method is called when the form is submitted and 
  // it is triggered by the onSubmit eventhandler <form onSubmit={this.handleFormSubmit}>
  async handleFormSubmit(e) {
    e.preventDefault();
    // ! Get your own API key !
    const apikey = process.env.REACT_APP_WEATHER_API_KEY;
    // Get the zip from the input
    const zip = this.state.inputValue;
    // Form an API request URL with the apikey and zip
    const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zip},us&appid=${apikey}`;

    // make a GET request from the weather API
    const response = await fetch(url);
    // convert the data from JSON to a Javascript Object with json() method
    const data = await response.json();
    // If the request was successful assign the data to component state weatherData
    this.setState({ weatherData: data });
  }

  renderWeather() {
    if (this.state.weatherData === null) {
      // If there is no data return this
      return <div>Oops! No weather Data here... </div>
    }

    console.log(this.state.weatherData);
    // Take the weather data apart to more easily populate the component
    const { main, description, icon } = this.state.weatherData.weather[0];
    const {
      temp,
      pressure,
      humidity,
      temp_min,
      temp_max,
    } = this.state.weatherData.main;

    return (
      <div>
        <div>Title: {main}</div>
        <div>Desc: {description}</div>
        <div>Icon: {icon}</div>
        <div>Temp: {temp}</div>
        <div>Pressure: {pressure}</div>
        <div>Humidity: {humidity}</div>
        <div>
          Temp Min: {temp_min} Max:{temp_max}
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="container">
        <div className="segment">
                      {/** 
                      * the onSubmit method is a event handle available in React and is called everytime the form is submitted  
                      */}
          <form className="form" onSubmit={(e) => this.handleFormSubmit(e)}>
            <div className="field">
              <label>Input Zip Code</label>
                     {/** 
                      This pattern is called controlled component patterm
                      * used for input and other form elements 
                      * Set the value of the input to a value held in component's state
                      * Set the value held in component state when a change occurs(onChange) at the input
                      * the onChange method is a event handle available in React and is called everytime a change occurs on our input element  
                      */}
              <input
                type="text"
                value={this.state.inputValue}
                onChange={(e) => this.setState({ inputValue: e.target.value })}
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default App;

```
<!-- > -->

### Create a child component - Weather.js

Right now, all the work for fetching and rendering data is handled by one component - `<App/`. Remember we mentioned components should be simple and reusable.

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
  import { Component } from "react";

  class Weather extends Component {
    constructor(props){
      super(props)
      // todo: initialiaze state here. Remember this component will have to 
      // support the values in state - this.state.InputValue and this.state.weatherData
      this.state = {}
    }
    render() {
      // todo: write code for loading and displaying weather details here
    }
    
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
  import { Component } from "react";
  //import Weather component into App.js
  import Weather from "./weather";

  class App extends Component {

    constructor(props){
      super(props)
      // todo: initialise state here where necessary
    }

    render() {
      // todo: Display the Weather Component with its props

      return(
        <div>
          <Weather/>
        </div>
      );
    }
    
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

## Resources

- <https://reactjs.org/tutorial/tutorial.html>
- [Component Lifecycle](https://reactjs.org/docs/react-component.html)
- [Hooks](https://reactjs.org/docs/hooks-intro.html)
- [Async/await](https://javascript.info/async-await)
- [Using Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
- [Array Destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
