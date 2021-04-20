# FEW 2.9 Advanced queries 


More ideas: 

- Variables 
- Fragments
- Directives 



Using variables with GraphQL

A query will often provide values to define and refine the expected results. GraphQL queries can define variables that may appear anywhere inside of a Query. This saves you the trouble of concatenating a long query string, and makes it easy to track variables used in a query by keeping them in one location. 

The following query looks for the first 15 market place listings via the GitHub API.

```GraphQL
query {
  marketplaceListings(first:15) {
    edges {
      node {
        id
        name
        shortDescription
      }
    }
  }
}
```

An obvious extension is to set a variable for the number of listings. 

```GraphQL
query MarketplaceListings($first: Int!) {
  marketplaceListings(first:$first) {
    edges {
      node {
        id
        name
        shortDescription
      }
    }
  }
}
```

Here a variable is defined like this: 

`MarketplaceListings($first: Int!)`

<!-- > -->

## After Class 

Finish the React + Apollo tutorial: <https://www.howtographql.com/react-apollo/0-introduction/>

- Complete the following chapters by next class: `Realtime Updates with GraphQL Subscriptions`, `Pagination`, `Summary`

<!-- > -->

### Tutorial Stretch Challenges

1. Implement the component that renders comments of authenticated users on links.
1. Finish off the Logout functionality
1. Implement a functionality that enables users to vote on comments of the links (one vote per link and user)