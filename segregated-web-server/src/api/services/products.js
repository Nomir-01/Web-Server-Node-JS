const databaseProduct = require("../Database/products");
const timer = require("../time-functions/timer");
const products = databaseProduct.products;

const getAllProducts = async (query) => {
  if (!Object.keys(query).length) {
    await timer.waitFunc(2000);
    return products;
  }
};

const getSingleProduct_Categories = async (query) => {
  console.log(query);
  if (query?.id === "categories") {
    const categories = products.map((product) => product.category);
    const uniqueCategories = [...new Set(categories)];
    await timer.waitFunc(2000);
    return uniqueCategories;
  } else if (query.id >= 0) {
    if (query?.id) {
      const product = products.find((p) => {
        return p.id === Number(query.id);
      });

      if (product) {
        await timer.waitFunc(2000);
        return product;
      } else {
        throw { status: 404, message: "Product not found" };
      }
    }
  }
  throw { status: 400, message: "Please enter a correct URL" };
};

const getCategoryProduct = async (query) => {
  if (query?.id2) {
    const categories = products.map((product) => product.category);
    const categoriesToShow = [];
    for (const a in categories) {
      const tosearch = categories[a].replace(/\s+/g, "").toLowerCase();
      if (tosearch == query.id2) {
        categoriesToShow.push(products[a]);
      }
    }
    if (categoriesToShow.length > 0) {
      await timer.waitFunc(2000);
      return categoriesToShow;
    } else {
      throw { status: 404, message: "Please select correct Product" };
    }
  }
  throw { status: 400, message: "Please enter a correct URL" };
};

const addProduct = (body) => {
  const bodyKeys = Object.keys(body);
  const productKeys = Object.keys(products[0]);
  productKeys.splice(0, 1);
  if (JSON.stringify(productKeys) == JSON.stringify(bodyKeys)) {
    const product = {
      id: products.at(-1).id + 1,
      title: body.title,
      price: body.price,
      category: body.category,
      description: body.description,
      quantity: body.quantity,
      inStock: body.inStock,
    };
    products.push(product);
    return product;
  }
  throw { status: 400, message: "Please add required info" };
};

const updateProduct = (body, query) => {
  const keys = Object.keys(body);
  if (query?.id) {
    const product = products.findIndex((p) => {
      return p.id === Number(query.id);
    });

    if (product === -1) {
      throw { status: 404, message: "Product not found" };
    } else {
      for (const value of keys) {
        if (value in products[product]) {
          if (value == "quantity") {
            if (products[product][value] >= 1 && body[value] == 0) {
              products[product][value] = body[value];
              products[product].inStock = false;
            } else if (products[product][value] == 0 && body[value] >= 1) {
              products[product][value] = body[value];
              products[product].inStock = true;
            } else if (body[value] < 0) {
              throw { status: 400, message: "Wrong Input For Quantity" };
            } else {
              products[product][value] = body[value];
            }
          } else if (value != "quantity") {
            products[product][value] = body[value];
          }
        } else {
          throw {
            status: 400,
            message: "Update can't be completely done due to an unknown field",
          };
        }
      }
      return products[product];
    }
  }
  throw { status: 400, message: "Please enter a correct Product ID" };
};

const deleteProduct = (query) => {
  if (query?.id) {
    const product = products.findIndex((p) => {
      return p.id === Number(query.id);
    });

    if (product === -1) {
      throw { status: 404, message: "Product not found" };
    } else {
      products.splice(product, 1);
      return "Product is deleted";
    }
  }
  throw { status: 400, message: "Please enter a correct Product ID" };
};

module.exports = {
  getAllProducts,
  getSingleProduct_Categories,
  getCategoryProduct,
  addProduct,
  updateProduct,
  deleteProduct,
};
