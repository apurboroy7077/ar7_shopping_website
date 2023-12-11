let express = require("express");
let fs = require("fs");
let path = require("path");
const {
  setDummyProducts,
  getProductsController,
  getProductImageController,
} = require("../controllers/products.controller");
let router = express.Router();
router.get("/setdummyproducts", setDummyProducts);
router.get("/getproducts", getProductsController);
router.get("/getproductimage/:name", getProductImageController);
let productsRouter = router;
module.exports = { productsRouter };
