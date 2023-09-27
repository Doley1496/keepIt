const mongoose = require("mongoose");

/* Connecting to the MongoDB server using mongoose. */
const connectionUrl = async (req, res) => {
  try {
    await mongoose.connect(
      "mongodb+srv://madhurdoley1496:masterpeice1496@keepitcluster0.dduwna2.mongodb.net/keepIt"
    );
    /* when connected to the server. */
    console.log("Server is connected ...");

    /* Catching the error and displaying it */
  } catch (error) {
    /* when not connected to the server. */
    console.log("Server is not connected ...");
  }
};

// module.exports = connectionUrl; or connectionUrl();

connectionUrl();

//mongodb+srv://madhurdoley1496:masterpeice1496@keepitcluster0.dduwna2.mongodb.net/keepIt
