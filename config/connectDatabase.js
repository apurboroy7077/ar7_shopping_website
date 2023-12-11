let mongoose = require("mongoose");
const { databaseURL } = require("./secret");
let connectDatabase = async () => {
  await mongoose
    .connect(databaseURL)
    .then(() => {
      console.log("Database is Connected");
    })
    .catch((error) => {
      console.log(error);
    });
};
module.exports = { connectDatabase };
