const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");

const port = process.env.PORT || 4000;

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
  getAllNotes: () => notes,
  getNote: (args) => {
    return notes.find((note) => note.id === args.id);
  },
  newNote: (args) => {
    let noteValue = {
      id: String(notes.length + 1),
      content: args.content,
      author: "Adam Scott",
    };
    notes.push(noteValue);
    return noteValue;
  },
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
