const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");

const port = process.env.PORT || 4000;

const typeDefs = buildSchema(`
  type Query {
    hello: String
  }
`);

const resolvers = {
  hello: () => "Hello world!",
};

const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    schema: typeDefs,
    rootValue: resolvers,
    graphiql: true,
  })
);

app.listen({ port }, () =>
  console.log(`GraphQL Server running at http://localhost:${port}/graphql`)
);
