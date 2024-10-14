const databaseCart = require("../Database/carts");
const databaseProduct = require("../Database/products");
const timer = require("../time-functions/timer");
const carts = databaseCart.carts;
const products = databaseProduct.products;

const getAllCarts = async (query) => {
  if (!Object.keys(query).length) {
    await timer.waitFunc(2000);
    return carts.map((cart) => ({
      ...cart,
      products: cart.products.map((cartProduct) => {
        const productDetail = products.find(
          (product) => product.id === cartProduct.productId
        );
        const { id, quantity, inStock, ...productDetails } = productDetail;
        return { ...cartProduct, ...productDetails };
      }),
    }));
  }
  throw { status: 404, message: "No cart found" };
};

const getSingleCart = async (query) => {
  if (query?.id) {
    const cart = carts.find((c) => {
      return c.id === Number(query.id);
    });
    if (cart) {
      const details = cart.products.map((cartProduct) => {
        const productDetail = products.find(
          (product) => product.id === cartProduct.productId
        );
        const { id, quantity, inStock, ...productDetails } = productDetail;
        return { ...cartProduct, ...productDetails };
      });
      await timer.waitFunc(2000);
      return {
        ...cart,
        products: details,
      };
    } else {
      throw { status: 404, message: "Cart not found" };
    }
  }
  throw { status: 400, message: "Please enter a correct Cart ID" };
};

const getSingleUserCart = async (query) => {
  if (query?.id2) {
    const cartToShow = [];
    for (const a of carts) {
      if (a.userId == query.id2) {
        cartToShow.push(a);
      }
    }
    if (cartToShow.length >= 1) {
      await timer.waitFunc(2000);
      return cartToShow.map((cart) => ({
        ...cart,
        products: cart.products.map((cartProduct) => {
          const productDetail = products.find(
            (product) => product.id === cartProduct.productId
          );
          const { id, quantity, inStock, ...productDetails } = productDetail;
          return { ...cartProduct, ...productDetails };
        }),
      }));
    } else {
      throw { status: 404, message: "No Cart Created" };
    }
  }
  throw { status: 400, message: "Please enter a correct Cart ID" };
};

const addCart = (body) => {
  const bodyKeys = Object.keys(body);
  const cartKeys = Object.keys(carts[0]);
  cartKeys.splice(0, 1);
  if (JSON.stringify(cartKeys) == JSON.stringify(bodyKeys)) {
    const cart = {
      id: carts.at(-1).id + 1,
      userId: body.userId,
      date: body.date,
      products: body.products,
    };
    carts.push(cart);
    return cart;
  }
  throw { status: 400, message: "Please add required info" };
};

const updateCart = (body, query) => {
  const keys = Object.keys(body);
  if (query?.id) {
    const cart = carts.findIndex((c) => {
      return c.id === Number(query.id);
    });

    if (cart === -1) {
      throw { status: 404, message: "Cart not found" };
    } else {
      for (const value of keys) {
        if (value in carts[cart]) {
          if (value == "products") {
            const toCheck = body[value].length;
            for (let a = 0; a < toCheck; a++) {
              if (body[value][a].quantity == 0 && body[value].length > 1) {
                body[value].splice(a, 1);
              } else if (
                body[value][a].quantity == 0 &&
                body[value].length <= 1
              ) {
                carts.splice(cart, 1);
                return "Cart Was Deleted Because Of No Products";
              }
            }
          }
          carts[cart][value] = body[value];
        } else {
          throw {
            status: 406,
            message: "Update can't be completely done due to an unknown field",
          };
        }
      }
      return carts[cart];
    }
  }
  throw { status: 400, message: "Please enter a correct Cart ID" };
};

const deleteCart = (query) => {
  if (query?.id) {
    const cart = carts.findIndex((c) => {
      return c.id === Number(query.id);
    });

    if (cart === -1) {
      throw { status: 404, message: "Cart not found" };
    } else {
      carts.splice(cart, 1);
      return "Cart is deleted";
    }
  }
  throw { status: 400, message: "Please enter a correct Cart ID" };
};

module.exports = {
  getAllCarts,
  getSingleCart,
  getSingleUserCart,
  addCart,
  updateCart,
  deleteCart,
};
