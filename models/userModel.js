let mongoose = require("mongoose");
let ar7id = require("ar7id");
let userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
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
  profilePicture: {
    type: String,
    default: "public/images/users",
  },
  ar7id: {
    type: String,
    default: ar7id(),
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isBanned: {
    type: Boolean,
    default: false,
  },
});
let userModel = mongoose.model("userinfo", userSchema);
module.exports = { userModel };
