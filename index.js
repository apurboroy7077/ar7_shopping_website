const { app } = require("./app");
const { connectDatabase } = require("./config/connectDatabase");
const { serverPort } = require("./config/secret");

let port = process.env.PORT;
app.listen(port, () => {
  console.log(`Your App has been Deployed at http://localhost:${port}`);
  connectDatabase();
});
