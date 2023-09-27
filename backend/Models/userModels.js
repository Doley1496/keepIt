const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },

    profilePhoto: String,

    // verified: {
    //   type: Boolean,
    //   default: false,
    // },
    // emailToken: {
    //   type: String,
    // },

    slug: {
      type: String,
    },

    role: {
      type: Number,
      default: 0,
    },

    /* creating relationship between two models ie. todoModels and userModels with the help
       of the mongoose model name.
    */
    list: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Todo",
      },
    ],
  },
  { timeStamps: true } /* It will give us the created time of the new user. */
);

module.exports = mongoose.model("User", userSchema);
