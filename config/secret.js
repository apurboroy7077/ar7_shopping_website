require("dotenv").config();

let databaseURL =
  "mongodb+srv://apurbo:12345@cluster0.1g8wuka.mongodb.net/?retryWrites=true&w=majority";
let smtpUsername = "apurboroy7077@gmail.com";
let smtpPassword = "wnstwpnfbmpjfinv";
let createAccountSecretKey = "AR7CreateAccount";
let loginSecretKey = "AR7LoginKey";
let serverURL = "https://ar7-shopping-website.onrender.com/";
let resetPasswordKey = "AR7ResetPasswordKey";
module.exports = {
  serverPort,
  databaseURL,
  smtpUsername,
  smtpPassword,
  createAccountSecretKey,
  loginSecretKey,
  serverURL,
  resetPasswordKey,
};
