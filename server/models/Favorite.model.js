const mongoose = require("mongoose");
const FavoriteSchema = new mongoose.Schema(
  {
    userID: {
      type: String,
      require: true,
    },

    mainUserID: {
      type: String,
      require: true,
    },

    postID: {
      type: String,
      require: true,
    },

    postObject: {
      type: Object,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Favorites", FavoriteSchema);
