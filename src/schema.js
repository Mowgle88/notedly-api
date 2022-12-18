const { buildSchema } = require("graphql");

module.exports = buildSchema(`
scalar DateTime
type Note {
  id: ID!
  content: String!
  author: String!
  createdAt: DateTime!
  updatedAt: DateTime!
}
type Query {
  hello: String
  getAllNotes: [Note!]!
  getNote(id: ID!): Note!
}
type Mutation {
  newNote(content: String!): Note!
  updateNote(id: ID!, content: String!): Note!
  deleteNote(id: ID!): Boolean!
}
`);
