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
- What features/functionalities are best GraphQL subscriptions best used for?

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

<!-- > -->
### JSX

JSX is an extension of the JavaScript language that gives us an HTML-like syntax to write our UI code.
It is a set of instructions to tell React what content we want to display. It tells React to either create HTML elements or show another component.

- JSX has its own special syntax

<!-- > -->
### ReactDOM

Whenever we work with React, we work with two separate libraries: React library itself and  the ReactDOM.

- React creates and manipulates a virtual DOM to make the process of updating the DOM a faster one.
- The ReactDOM looks at the virtual DOM, compares it to the real DOM and makes changes where necessary.
- Making changes to the DOM directly will not work as expected a React App.
- Manipulating the DOM in React Apps should be handled mostly by a [Component](#components)

<small>Read [here](https://reactjs.org/docs/faq-internals.html) for more on the Virtual DOM</small>

<!-- > -->

Putting these all together, here's a very simple React block of code with these three features.
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
    document.querySelector('#root')
)

```

<!-- > -->
#### Props

Props are values passed into a component from outside.

#### State

Stateful components can hold values internally this is called state.

### Challenge

The challenge today is to build a React App

### Async (fetch, async await)

### Hooks

### After Class
