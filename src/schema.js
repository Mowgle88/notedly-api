const { buildSchema } = require("graphql");

module.exports = buildSchema(`
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
