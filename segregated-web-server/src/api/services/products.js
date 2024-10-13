const products = [
  {
    id: 1,
    title: "Wireless Earbuds",
    price: "49.99",
    category: "Electronics",
    description:
      "High-quality wireless earbuds with noise cancellation and long battery life.",
    quantity: 15,
    inStock: true,
  },
  {
    id: 2,
    title: "Fitness Tracker",
    price: "29.99",
    category: "Wearable Tech",
    description:
      "Track your daily activities, heart rate, and sleep with this lightweight fitness tracker.",
    quantity: 0,
    inStock: false,
  },
  {
    id: 3,
    title: "Gaming Laptop",
    price: "1299.99",
    category: "Computers",
    description:
      "Powerful gaming laptop with a high refresh rate display and the latest GPU technology.",
    quantity: 5,
    inStock: true,
  },
  {
    id: 4,
    title: "Smartwatch",
    price: "199.99",
    category: "Wearable Tech",
    description:
      "Stay connected on the go with this stylish smartwatch featuring GPS and heart-rate monitoring.",
    quantity: 8,
    inStock: true,
  },
  {
    id: 5,
    title: "4K Ultra HD TV",
    price: "899.99",
    category: "Home Entertainment",
    description:
      "Experience stunning visuals with this 55-inch 4K Ultra HD Smart TV with built-in streaming apps.",
    quantity: 2,
    inStock: true,
  },
  {
    id: 6,
    title: "Bluetooth Speaker",
    price: "39.99",
    category: "Audio",
    description:
      "Portable Bluetooth speaker with deep bass and a 12-hour battery life for on-the-go listening.",
    quantity: 0,
    inStock: false,
  },
  {
    id: 7,
    title: "Electric Toothbrush",
    price: "24.99",
    category: "Health & Personal Care",
    description:
      "Rechargeable electric toothbrush with multiple cleaning modes and a two-minute timer.",
    quantity: 10,
    inStock: true,
  },
  {
    id: 8,
    title: "Digital Camera",
    price: "499.99",
    category: "Photography",
    description:
      "Compact digital camera with 20MP sensor and 4K video recording capabilities.",
    quantity: 3,
    inStock: true,
  },
  {
    id: 9,
    title: "Robot Vacuum Cleaner",
    price: "149.99",
    category: "Home Appliances",
    description:
      "Automatic robot vacuum cleaner with smart mapping technology and app control.",
    quantity: 7,
    inStock: true,
  },
  {
    id: 10,
    title: "Air Fryer",
    price: "89.99",
    category: "Kitchen Appliances",
    description:
      "Cook healthier meals with this easy-to-use air fryer, featuring rapid air circulation technology.",
    quantity: 0,
    inStock: false,
  },
];

const getAllProducts = (query) => {
  if (!Object.keys(query).length) return products;
};

const getSingleProduct_Categories = (query) => {
  console.log(query);
  if (query?.id === "categories") {
    const categories = products.map((product) => product.category);
    const uniqueCategories = [...new Set(categories)];
    return uniqueCategories;
  } else if (query.id >= 0) {
    if (query?.id) {
      const product = products.find((p) => {
        return p.id === Number(query.id);
      });

      if (product) {
        return product;
      } else {
        throw { status: 404, message: "Product not found" };
      }
    }
  }
  throw { status: 400, message: "Please enter a correct URL" };
};

const getCategoryProduct = (query) => {
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
