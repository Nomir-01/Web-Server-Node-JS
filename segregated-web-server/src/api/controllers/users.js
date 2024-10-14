const service = require("../services/users");

const getAllUsers = async (req, res) => {
  try {
    const query = req.params;
    const users = await service.getAllUsers(query);
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ err });
  }
};

const getSingleUser = async (req, res) => {
  try {
    const query = req.params;
    const users = await service.getSingleUser(query);
    if (users) {
      res.status(200).json(users);
    }
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
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
