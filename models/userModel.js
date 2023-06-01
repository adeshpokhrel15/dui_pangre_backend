
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    // how to use this you shoul
    // user_id: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   required: true,
    //   ref: "User",
    // },

    username: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    photo_1: {
      type: String,
      require: true,
      //    default:'default.jpg'
    },
    photo_2: {
      type: String,
      require: true,
      //   default:'default.jpg'
    },
    isAdmin: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;