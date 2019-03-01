# Lesson 8 

## Advanced queries 

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

