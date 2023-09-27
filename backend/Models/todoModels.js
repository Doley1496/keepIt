const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    /* creating relationship between two models ie. todoModels and userModels with the help
       of the mongoose model name.
    */
    userId: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timeStamps: true } /* It will give us the created time of the new user. */
);

module.exports = mongoose.model("Todo", todoSchema);
