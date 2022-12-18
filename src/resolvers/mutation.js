const models = require("../models");

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
};
