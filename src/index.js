const express = require("express");
const { graphqlHTTP } = require("express-graphql");
require("dotenv").config();
const db = require("./db");
const models = require("./models");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");

const port = process.env.PORT || 4000;
const DB_HOST = process.env.DB_HOST;

const app = express();
db.connect(DB_HOST);

app.use(
  "/graphql",
  graphqlHTTP({
    schema: typeDefs,
    rootValue: resolvers,
    graphiql: true,
    context: () => {
      return { models };
    },
  })
);

app.listen({ port }, () =>
  console.log(`GraphQL Server running at http://localhost:${port}/graphql`)
);
