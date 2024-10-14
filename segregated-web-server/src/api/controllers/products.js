const service = require("../services/products");

const getAllProducts = async (req, res) => {
  try {
    const query = req.params;
    const products = await service.getAllProducts(query);
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ err });
  }
};

const getSingleProduct_Categories = async (req, res) => {
  try {
    const query = req.params;
    const products = await service.getSingleProduct_Categories(query);
    if (products) res.status(200).json(products);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

const getCategoryProduct = async (req, res) => {
  try {
    const query = req.params;
    const products = await service.getCategoryProduct(query);
    if (products) res.status(200).json(products);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

const addProduct = (req, res) => {
  try {
    const body = req.body;
    const products = service.addProduct(body);
    if (products) res.status(200).json(products);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

const updateProduct = (req, res) => {
  try {
    const body = req.body;
    const query = req.params;
    const products = service.updateProduct(body, query);
    if (products) res.status(200).json(products);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

const deleteProduct = (req, res) => {
  try {
    const query = req.params;
    const products = service.deleteProduct(query);
    if (products) res.status(200).json(products);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

module.exports = {
  getAllProducts,
  getSingleProduct_Categories,
  getCategoryProduct,
  addProduct,
  updateProduct,
  deleteProduct,
};
