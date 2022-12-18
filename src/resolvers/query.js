const models = require("../models");

module.exports = {
  getAllNotes: async () => {
    return await models.Note.find();
  },
  getNote: async (args) => {
    return await models.Note.findById(args.id);
  },
};
