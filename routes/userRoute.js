let express = require("express");
const {
  loginController,
  registerController,
  verifyRegistrationController,
  forgotPasswordController,
  resetPasswordController,
  newPasswordController,
} = require("../controllers/users.controller");
const { uploadUserImage } = require("../config/uploadUserImage");
let router = express.Router();
router.post("/login", loginController);
router.post(
  "/register",
  uploadUserImage.single("userImage"),
  registerController
);
router.get("/verifyRegistration/:token", verifyRegistrationController);
router.post("/forgotPassword", forgotPasswordController);
router.get("/resetPassword/:token", resetPasswordController);
router.post("/newPassword/:token", newPasswordController);
let userRouter = router;
module.exports = { userRouter };
