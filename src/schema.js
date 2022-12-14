const { buildSchema } = require("graphql");

module.exports = buildSchema(`
scalar DateTime
type Note {
  id: ID!
  content: String!
  author: User!
  createdAt: DateTime!
  updatedAt: DateTime!
}
type User {
  id: ID!
  username: String!
  email: String!
  avatar: String
  notes: [Note!]!
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
  signUp(username: String!, email: String!, password: String!): String!
  signIn(username: String, email: String, password: String!): String!
}
`);
