const mongoose = require("mongoose");
const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },

    imageUrl: {
      type: String,
      require: true,
    },

    userID: {
      type: String,
      require: true,
    },

    userObject: {
      type: Object,
      require: true,
    },

    city: {
      type: String,
    },

    state: {
      type: String,
    },

    country: {
      type: String,
    },

    category: {
      type: String,
      require: true,
    },

    plus: {
      type: Boolean,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Posts", PostSchema);
