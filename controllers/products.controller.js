let { dummyProducts } = require("../config/DummyProducts");
const { response } = require("../config/response");
const { productsModel } = require("../models/products.model");
let path = require("path");
let setDummyProducts = async (req, res) => {
  try {
    await productsModel.insertMany(dummyProducts);
    response(res, 200, "Dummy Products Inserted");
  } catch (error) {
    next(error);
  }
};
let getProductsController = async (req, res, next) => {
  try {
    let products = await productsModel.find();
    response(res, 200, "Products Fetched", products);
  } catch (error) {
    next(error);
  }
};
let getProductImageController = (req, res, next) => {
  try {
    let name = req.params.name;
    res.sendFile(
      path.join(__dirname + `/../public/images/products/${name}.jpg`)
    );
  } catch (error) {
    next(error);
  }
};
module.exports = {
  setDummyProducts,
  getProductsController,
  getProductImageController,
};
