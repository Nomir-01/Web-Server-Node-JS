const express = require("express");
const routes = require("./api/routes");
const app = express();
PORT = 5003;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/users", routes.users);

app.listen(PORT, () => {
  console.log("Server Is Running");
});
