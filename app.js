let express = require("express");
const { userRouter } = require("./routes/userRoute");
const { response } = require("./config/response");
let morgan = require("morgan");
let app = express();
let cors = require("cors");
let cookieParser = require("cookie-parser");
const { productsRouter } = require("./routes/products.route");
//use middlewares---------------------------------------------------------------------------------
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
//routes---------------------------------------------------------------------------------------------------
app.use("/users", userRouter);
app.use("/products", productsRouter);
app.get("/", (req, res) => {
  res.send("Welcome to Home Page.");
});
app.use("*", (req, res) => {
  response(res, 404, "Route Not Found");
});
app.use((err, req, res, next) => {
  response(res, 500, "Internal Server Error", err);
  console.log(err);
});
module.exports = { app };
