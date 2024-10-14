const service = require("../services/carts");

const getAllCarts = async (req, res) => {
  try {
    const query = req.params;
    const cart = await service.getAllCarts(query);
    if (cart) res.status(200).json(cart);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

const getSingleCart = async (req, res) => {
  try {
    const query = req.params;
    const cart = await service.getSingleCart(query);
    if (cart) res.status(200).json(cart);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

const getSingleUserCart = async (req, res) => {
  try {
    const query = req.params;
    const cart = await service.getSingleUserCart(query);
    if (cart) res.status(200).json(cart);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

const addCart = (req, res) => {
  try {
    const body = req.body;
    const cart = service.addCart(body);
    if (cart) res.status(200).json(cart);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

const updateCart = (req, res) => {
  try {
    const body = req.body;
    const query = req.params;
    const cart = service.updateCart(body, query);
    if (cart) res.status(200).json(cart);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

const deleteCart = (req, res) => {
  try {
    const query = req.params;
    const cart = service.deleteCart(query);
    if (cart) res.status(200).json(cart);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

module.exports = {
  getAllCarts,
  getSingleCart,
  getSingleUserCart,
  addCart,
  updateCart,
  deleteCart,
};
