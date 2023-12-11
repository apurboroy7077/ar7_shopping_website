let jwt = require("jsonwebtoken");
let createJsonWebToken = (payload, secretKey, expiresIn) => {
  try {
    let token = jwt.sign(payload, secretKey, {
      expiresIn: expiresIn,
    });
    return token;
  } catch (error) {
    console.log(error);
  }
};
module.exports = { createJsonWebToken };
