require("dotenv").config();
let serverPort = process.env.SERVER_PORT;
let databaseURL = process.env.DATABASE_URL;
let smtpUsername = process.env.SMTP_USERNAME;
let smtpPassword = process.env.SMTP_PASSWORD;
let createAccountSecretKey = process.env.CREATE_ACCOUNT_SECRET_KEY;
let loginSecretKey = process.env.LOGIN_SECRET_KEY;
let serverURL = process.env.SERVER_URL;
let resetPasswordKey = process.env.RESET_PASSWORD_SECRET_KEY;
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
