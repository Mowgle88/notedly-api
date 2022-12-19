const models = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const GraphQLError = require("graphql");
require("dotenv").config();
const gravatar = require("../util/gravatar");

module.exports = {
  newNote: async (args) => {
    return await models.Note.create({
      content: args.content,
      author: "Adam Scott",
    });
  },
  deleteNote: async ({ id }) => {
    try {
      await models.Note.findOneAndRemove({ _id: id });
      return true;
    } catch (err) {
      return false;
    }
  },
  updateNote: async ({ content, id }) => {
    return await models.Note.findOneAndUpdate(
      {
        _id: id,
      },
      {
        $set: {
          content,
        },
      },
      {
        new: true,
      }
    );
  },
  signUp: async ({ username, email, password }) => {
    // Нормализуем имейл
    email = email.trim().toLowerCase();
    // Хешируем пароль
    const hashed = await bcrypt.hash(password, 10);
    // Создаем url gravatar-изображения
    const avatar = gravatar(email);
    try {
      const user = await models.User.create({
        username,
        email,
        avatar,
        password: hashed,
      });
      // Создаем и возвращаем json web token
      return jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    } catch (err) {
      console.log(err);
      // Если при регистрации возникла проблема, выбрасываем ошибку
      throw new Error("Error creating account");
    }
  },
  signIn: async ({ username, email, password }) => {
    if (email) {
      // Нормализуем e-mail
      email = email.trim().toLowerCase();
    }
    const user = await models.User.findOne({
      $or: [{ email }, { username }],
    });
    // Если пользователь не найден, выбрасываем ошибку аутентификации
    if (!user) {
      throw new GraphQLError("my message", {
        extensions: {
          code: "UNAUTHENTICATED",
          myExtension: "Error signing in",
        },
      });
    }
    // Если пароли не совпадают, выбрасываем ошибку аутентификации
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new GraphQLError("my message", {
        extensions: {
          code: "UNAUTHENTICATED",
          myExtension: "Error signing in",
        },
      });
    }
    // Создаем и возвращаем json web token
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  },
};
