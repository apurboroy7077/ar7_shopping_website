let mongoose = require("mongoose");
let ar7id = require("ar7id");
let productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  rating: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
    default: "public/images/products",
  },
  ar7id: {
    type: String,
    default: ar7id(),
  },
});
let productsModel = mongoose.model("products", productSchema);
module.exports = { productsModel };
