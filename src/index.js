const express = require("express");
const { graphqlHTTP } = require("express-graphql");
require("dotenv").config();
const db = require("./db");
const models = require("./models");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const jwt = require("jsonwebtoken");

// Получаем информацию пользователя из JWT
const getUser = (token) => {
  if (token) {
    try {
      // Возвращаем информацию пользователя из токена
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      // Если с токеном возникла проблема, выбрасываем ошибку
      new Error("Session invalid");
    }
  }
};

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
    context: ({ req }) => {
      // Получаем токен пользователя из заголовков
      const token = req.headers.authorization;
      // Пытаемся извлечь пользователя с помощью токена
      const user = getUser(token);
      // Пока что будем выводить информацию о пользователе в консоль:
      console.log(user);
      // Добавляем модели БД и пользователя в контекст
      return { models, user };
    },
  })
);

app.listen({ port }, () =>
  console.log(`GraphQL Server running at http://localhost:${port}/graphql`)
);
