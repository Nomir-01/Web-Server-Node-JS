const service = require("../services/users");

const getUsers = async (req, res) => {
  try {
    const query = req.query;
    const users = await service.getUsers(query);
    if (!users.length) {
      return res.status(404).send("No users yet");
    }
    if (users) res.status(200).json(users);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

const getSingleUser = async (req, res) => {
  try {
    const userId = req.userId;
    const users = await service.getSingleUser(userId);
    if (users) {
      res.status(200).json(users);
    }
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

const addUser = async (req, res) => {
  try {
    const body = req.body;
    const user = await service.addUser(body);
    if (user) {
      res.status(200).json(user);
    }
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const body = req.body;
    const userId = req.userId;
    const user = await service.updateUser(body, userId);
    if (user) {
      res.status(200).json(user);
    }
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const query = req.params;
    const userId = req.userId;
    const user = await service.deleteUser(userId);
    if (user) {
      res.status(200).send(user);
    }
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

module.exports = {
  getUsers,
  getSingleUser,
  addUser,
  updateUser,
  deleteUser,
};
