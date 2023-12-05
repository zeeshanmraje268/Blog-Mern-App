const mongoose = require("mongoose");
const connectDB = (URI) => {
  try {
    mongoose
      .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
        console.log("Successfully Connected".bgRed);
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
