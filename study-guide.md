# Study Guide 

Be able to answer these questions:

- What is GraphQL
- Compare GraphQL with REST
  - What are the advantages of using GraphQL?
  - What are the disadvantages?
- Describe the Features of the GraphQL language
  - Schema
  - Query 
  - Variables
  - Types  
  - Resolvers
  - Subscriptions 
- What types of queries does GraphQL support? 
- Write a basic GraphQL query
- Write a basic GraphQL Schema 

- Can you make an app that 
  - Returns a Thing
    - Thing
      - name string
      - id string
      - thinginess WTF
    - WTF
      - id string
      - min Float
      - max Float
      - rating Int

{
  getThing(id: String) {
    name
    id
    thinginess {
      min
      max
    }
  }
}




