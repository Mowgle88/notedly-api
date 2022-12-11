const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
require("dotenv").config();
const db = require("./db");
const models = require("./models");

const port = process.env.PORT || 4000;
const DB_HOST = process.env.DB_HOST;

let notes = [
  { id: "1", content: "This is a note", author: "Adam Scott" },
  { id: "2", content: "This is another note", author: "Harlow Everly" },
  { id: "3", content: "Oh hey look, another note!", author: "Riley Harrison" },
];

const typeDefs = buildSchema(`
  type Note {
    id: ID!
    content: String!
    author: String!
  }
  type Query {
    hello: String
    getAllNotes: [Note!]!
    getNote(id: ID!): Note!
  }
  type Mutation {
    newNote(content: String!): Note!
  }
`);

const resolvers = {
  hello: () => "Hello world!",
  getAllNotes: async () => {
    return await models.Note.find();
  },
  getNote: async (args) => {
    return await models.Note.findById(args.id);
  },
  newNote: async (args) => {
    return await models.Note.create({
      content: args.content,
      author: "Adam Scott",
    });
  },
};

const app = express();
db.connect(DB_HOST);

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
