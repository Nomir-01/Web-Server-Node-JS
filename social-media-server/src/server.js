const express = require("express");
const routes = require("./api/routes");
const app = express();
PORT = 5003;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/users", routes.users);
app.use("/posts", routes.posts);
app.use("/comments", routes.comments);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
