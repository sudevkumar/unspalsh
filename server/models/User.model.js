const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },

    email: {
      type: String,
      default: 0,
      unique: true,
    },

    password: {
      type: String,
      require: true,
    },

    imageUrl: {
      type: String,
    },

  },
  { timestamps: true }
);

module.exports = mongoose.model("Users", UserSchema);