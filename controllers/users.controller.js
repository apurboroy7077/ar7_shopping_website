const { sendEmailWithNodeMailer } = require("../config/EmailConfig");
const {
  hashMyPassword,
  compareMyPassword,
} = require("../config/EncryptingPassword");
const { createJsonWebToken } = require("../config/createJsonWebToken");
const { response } = require("../config/response");
const {
  createAccountSecretKey,
  loginSecretKey,
  serverURL,
  resetPasswordKey,
} = require("../config/secret");
const { userModel } = require("../models/userModel");
let jwt = require("jsonwebtoken");

let registerController = async (req, res, next) => {
  try {
    console.log(req.body);
    let { name, email, password } = req.body;
    let ifUserExists = await userModel.find({ email });

    if (ifUserExists.length > 0) {
      response(res, 404, "This email is already in use");
      return;
    }
    password = await hashMyPassword(password);
    let newUser = { name, email, password };
    let token = await createJsonWebToken(
      newUser,
      createAccountSecretKey,
      "30m"
    );

    let emailData = {
      email: email,
      subject: "Account Activation Mail",
      html: `<h2>Hello ${name}</h2>!
       <p>Plz click here to link <a href="${serverURL}/users/verifyRegistration/${token}" target="_blank">Activate Your Account</a></p> `,
    };
    let emailInfo = await sendEmailWithNodeMailer(emailData);
    if (emailInfo) {
      response(
        res,
        200,
        "Verification Link is Sent to your Email. Plz Check Inbox.",
        emailInfo
      );
    } else {
      response(res, 404, "Something Went Wrong", emailInfo);
    }
    // let newUserModel = new userModel(newUser);
    // await newUserModel.save();
  } catch (error) {
    next(error);
  }
};
let verifyRegistrationController = async (req, res, next) => {
  try {
    console.log("Request is Comming");
    let receivedToken = req.params.token;
    let result = await jwt.verify(receivedToken, createAccountSecretKey);
    if (result) {
      let email = result.email;
      let isUser = await userModel.find({ email });
      if (isUser.length > 0) {
        response(res, 404, "Already Created Account");
        return;
      }
      let newUser = new userModel(result);
      await newUser.save();
      response(
        res,
        200,
        "Account Created Successfully, Plz go back to our site and Login"
      );
    }
  } catch (error) {
    next(error);
  }
};
let loginController = async (req, res, next) => {
  try {
    let { email, password } = req.body;
    let User = await userModel.findOne({ email });
    if (!User) {
      response(res, 404, "No User is Registered with this Email.");
      return;
    }
    let passwordMatches = await compareMyPassword(password, User.password);
    if (!passwordMatches) {
      response(res, 404, "Incorrect Password");
      return;
    }
    let userData = { ...User._doc, password: "Secret" };
    let ar7LoginToken = await createJsonWebToken(
      { userData },
      loginSecretKey,
      "99999m"
    );
    await res.cookie("ar7LoginToken", ar7LoginToken, {
      maxAge: 15 * 60 * 1000000000,
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
    });

    console.log(userData);
    response(res, 200, "Loggin Successfull", ar7LoginToken);
  } catch (error) {
    next(error);
  }
};
let forgotPasswordController = async (req, res, next) => {
  try {
    let email = req.body.email;
    let userData = await userModel.findOne({ email }, { password: 0 });
    if (!userData) {
      response(res, 404, "No User is Registered with this Email.");
      return;
    }
    let resetToken = await createJsonWebToken(
      { email },
      resetPasswordKey,
      "999999m"
    );
    let emailData = {
      email: email,
      subject: "Reset Your Password",
      html: `<h2>Hello ${userData.name}</h2>!
       <p>Plz click here to Reset Your Password link <a href="${serverURL}/users/resetPassword/${resetToken}" target="_blank">Reset Your Password</a></p> `,
    };
    let emailInfo = await sendEmailWithNodeMailer(emailData);
    if (emailInfo) {
      response(
        res,
        200,
        "Password Reset Link is sent to Your Email. Plz check Inbox.",
        emailInfo
      );
    } else {
      response(res, 404, "Something Went Wrong", emailInfo);
    }
  } catch (error) {
    next(error);
  }
};
let resetPasswordController = async (req, res, next) => {
  try {
    let token = req.params.token;
    let decoded = await jwt.verify(token, resetPasswordKey);
    if (!decoded) {
      return;
    }
    res.status(200).send(`<!DOCTYPE html>
   <html lang="en">
     <head>
       <meta charset="UTF-8" />
       <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       <title>Document</title>
     </head>
     <body>
       <form method="post" action="/users/newPassword/${token}">
         <input name="newPassword" placeholder="New Password"/>
         <button type="submit">Submit</button>
       </form>
     </body>
   </html>
   `);
  } catch (error) {
    next(error);
  }
};
let newPasswordController = async (req, res, next) => {
  try {
    let token = req.params.token;
    let newPassword = req.body.newPassword;
    let decoded = await jwt.verify(token, resetPasswordKey);
    if (!decoded) {
      return;
    }
    let email = decoded.email;
    let UserData = await userModel.findOne({ email });
    if (!UserData) {
      return;
    }
    newPassword = await hashMyPassword(newPassword);
    UserData.password = newPassword;
    await UserData.save();
    response(
      res,
      200,
      "Pasword Changed, Go back to Our Website and Login Again."
    );
  } catch (error) {
    next(error);
  }
};
module.exports = {
  loginController,
  registerController,
  verifyRegistrationController,
  forgotPasswordController,
  resetPasswordController,
  newPasswordController,
};
