const service = require("../services/users");

const getAllUsers = (req, res) => {
  try {
    const query = req.params;
    const users = service.getAllUsers(query);
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ err });
  }
};

const getSingleUser = (req, res) => {
  try {
    const query = req.params;
    console.log(query.id);
    if (query?.id) {
      const user = service.getSingleUser(query);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).send("User not found");
      }
    }
    res.status(400).send("Please send a correct User ID");
  } catch (err) {
    res.status(500).json({ err });
  }
};

const addUser = (req, res) => {
  try {
    const body = req.body;
    const user = service.addUser(body);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(400).send("Please add all required fields");
    }
  } catch (err) {
    res.status(500).json({ err });
  }
};

const updateUser = (req, res) => {
  try {
    const body = req.body;
    const query = req.params;
    const user = service.updateUser(body, query);
    if (user) {
      res.status(200).json(user);
    }
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

const deleteUser = (req, res) => {
  try {
    const query = req.params;
    const user = service.deleteUser(query);
    if (user) {
      res.status(200).send(user);
    }
  } catch (err) {
    res.send(err.status || 500).json({ error: err.message });
  }
};

module.exports = {
  getAllUsers,
  getSingleUser,
  addUser,
  updateUser,
  deleteUser,
};
