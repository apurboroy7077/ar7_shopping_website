let multer = require("multer");
let path = require("path");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images/users");
  },
  filename: function (req, file, cb) {
    let username = req.body.username;
    console.log(username);
    let extensionName = path.extname(file.originalname);
    let name = username + "_" + "profile_picture" + extensionName;
    cb(null, name);
  },
});
const uploadUserImage = multer({ storage: storage });
module.exports = { uploadUserImage };
