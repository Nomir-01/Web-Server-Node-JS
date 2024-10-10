const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//GET, POST, PUT, PATCH, DELETE

//Users
const userPath = "/users";
const users = [
  {
    id: 1,
    email: "nomirnasir@gmail.com",
    username: "nomir",
    name: {
      firstName: "Nomir",
      lastName: "Nasir",
    },
    address: {
      city: "Karachi",
      area: "PECHS",
      houseNumber: "Flat No.301",
      apartmentName: "Al-Haram Corner",
    },
    phoneNumber: "0334-9256885",
  },
  {
    id: 2,
    email: "amit@gmail.com",
    username: "amit",
    name: {
      firstName: "Amit",
      lastName: "Monver",
    },
    address: {
      city: "Karachi",
      area: "Saddar",
      houseNumber: "Flat No.405",
      apartmentName: "Reno Centre",
    },
    phoneNumber: "0300-1234567",
  },
  {
    id: 3,
    email: "mustufa@gmail.com",
    username: "mustufa",
    name: {
      firstName: "Mustufa",
      lastName: "Jawed",
    },
    address: {
      city: "Karachi",
      area: "Aram Bagh",
      houseNumber: "Flat No.201",
      apartmentName: "Kali Centre",
    },
    phoneNumber: "0301-1234567",
  },
  {
    id: 4,
    email: "ahmad@gmail.com",
    username: "ahmad",
    name: {
      firstName: "Ahmad",
      lastName: "Qureshi",
    },
    address: {
      city: "Karachi",
      area: "Garden",
      houseNumber: "House No.5B",
      apartmentName: "Qureshi Residency",
    },
    phoneNumber: "0302-1234567",
  },
];

//Add User(s)
app.post(userPath, (req, res) => {
  const body = req.body;
  const keys = Object.keys(body);
  if (body?.name) {
    let user = {
      id: users.at(-1).id + 1,
      name: body.name,
      email: body.email,
      username: body.username,
      name: body.name,
      address: body.address,
      phoneNumber: body.phoneNumber,
    };

    users.push(user);
    res.status(201).json(user);
  }
  res.status(400).send("Please add a name");
});

//All Users
app.get(userPath, (req, res, next) => {
  res.status(200).json(users);
});

//Single User
app.get(`${userPath}/:id`, (req, res, next) => {
  const query = req.params;
  if (query?.id) {
    const user = users.find((u) => {
      return u.id === Number(query.id);
    });

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).send("User not found");
    }
  }

  res.status(400).send("Please send a correct User ID");
});

//Update User(s)
app.patch(`${userPath}/:id`, (req, res, next) => {
  const query = req.params;
  const body = req.body;
  const keys = Object.keys(body);
  if (query?.id) {
    const user = users.findIndex((u) => {
      return u.id === Number(query.id);
    });

    if (user === -1) {
      res.status(404).send("User not found");
    } else {
      for (const value of keys) {
        if (value in users[user]) {
          users[user][value] = body[value];
        } else {
          res
            .status(406)
            .send("Update can't be completely done due to an unknown field");
        }
      }
      res.status(200).json(users[user]);
    }
  }

  res.status(400).send("Please send a correct User ID");
});

//Delete User(s)
app.delete(`${userPath}/:id`, (req, res, next) => {
  const query = req.params;
  if (query?.id) {
    const user = users.findIndex((u) => {
      return u.id === Number(query.id);
    });

    if (user === -1) {
      res.status(404).send("User not found");
    } else {
      const userCartDelete = users[user].id;
      console.log(userCartDelete);
      const cartsToDel = [];
      carts.forEach((cart) => {
        if (cart.userId == userCartDelete) {
          cartsToDel.push(cart.id);
        }
      });
      for (let a = 0; a < cartsToDel.length; a++) {
        const cart = carts.findIndex((c) => {
          return c.id === Number(cartsToDel[a]);
        });
        carts.splice(cart, 1);
      }
      users.splice(user, 1);
      res.status(200).send("User is deleted");
    }
  }

  res.status(400).send("Please send a correct User ID");
});

//Products
const productPath = "/products";
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

//All Products
app.get(productPath, (req, res, next) => {
  res.status(200).json(products);
});

//Single Product | All Categories
app.get(`${productPath}/:id`, (req, res, next) => {
  const query = req.params;
  console.log(query);
  if (query?.id === "categories") {
    const categories = products.map((product) => product.category);
    const uniqueCategories = [...new Set(categories)];
    console.log(uniqueCategories);
    res.status(200).json(uniqueCategories);
  } else if (query.id >= 0) {
    if (query?.id) {
      const product = products.find((p) => {
        return p.id === Number(query.id);
      });

      if (product) {
        res.status(200).json(product);
      } else {
        res.status(404).send("Product not found");
      }
    }
  }

  res.status(400).send("Please send a correct URL");
});

//Single Category Product
app.get(`${productPath}/:id1/:id2`, (req, res, next) => {
  const query = req.params;
  console.log(query);
  if (query?.id2) {
    const categories = products.map((product) => product.category);
    const categoriesToShow = [];
    for (const a in categories) {
      if (categories[a] == query.id2) {
        categoriesToShow.push(products[a]);
      }
    }
    if (categoriesToShow.length > 0) {
      res.status(202).json(categoriesToShow);
    } else {
      res.status(404).send("Please select correct Product");
    }
  }

  res.status(400).send("Please send a correct URL");
});

//Add Product(s)
app.post(productPath, (req, res) => {
  const body = req.body;
  if (body?.title) {
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
    res.status(201).json(product);
  }
  res.status(400).send("Please add required info");
});

//Update Product(s)
app.patch(`${productPath}/:id`, (req, res, next) => {
  const query = req.params;
  const body = req.body;
  const keys = Object.keys(body);
  if (query?.id) {
    const product = products.findIndex((p) => {
      return p.id === Number(query.id);
    });

    if (product === -1) {
      res.status(404).send("Product not found");
    } else {
      for (const value of keys) {
        if (value in products[product]) {
          if (value == "quantity") {
            if (products[product][value] >= 1 && body[value] == 0) {
              products[product][value] = body[value];
              products[product].inStock = false;
              console.log(products[product][value]);
              console.log(products[product].inStock);
              console.log(body[value]);
            } else if (products[product][value] == 0 && body[value] >= 1) {
              products[product][value] = body[value];
              products[product].inStock = true;
              console.log(products[product][value]);
              console.log(products[product].inStock);
              console.log(body[value]);
            } else if (body[value] < 0) {
              res.status(406).send("Wrong Input For Quantity");
            } else {
              products[product][value] = body[value];
            }
          } else if (value != "quantity") {
            products[product][value] = body[value];
          }
        } else {
          res
            .status(406)
            .send("Update can't be completely done due to an unknown field");
        }
      }
      res.status(200).json(products[product]);
    }
  }

  res.status(400).send("Please send a correct Product ID");
});

//Delete Product(s)
app.delete(`${productPath}/:id`, (req, res, next) => {
  const query = req.params;
  if (query?.id) {
    const product = products.findIndex((p) => {
      return p.id === Number(query.id);
    });

    if (product === -1) {
      res.status(404).send("Product not found");
    } else {
      products.splice(product, 1);
      res.status(200).send("Product is deleted");
    }
  }

  res.status(400).send("Please send a correct Product ID");
});

//Cart
const cartPath = "/carts";
const carts = [
  {
    id: 1,
    userId: 1,
    date: "2019-12-15",
    products: [
      { productId: 1, quantity: 10 },
      { productId: 5, quantity: 1 },
    ],
  },
  {
    id: 2,
    userId: 1,
    date: "2022-01-21",
    products: [
      { productId: 9, quantity: 4 },
      { productId: 5, quantity: 2 },
    ],
  },
  {
    id: 3,
    userId: 2,
    date: "2024-06-17",
    products: [
      { productId: 4, quantity: 4 },
      { productId: 8, quantity: 1 },
    ],
  },
  {
    id: 4,
    userId: 3,
    date: "2020-10-07",
    products: [
      { productId: 3, quantity: 3 },
      { productId: 7, quantity: 5 },
    ],
  },
];

//All Cart(s)
app.get(cartPath, (req, res, next) => {
  res.status(200).json(carts);
});

//Single Cart
app.get(`${cartPath}/:id`, (req, res, next) => {
  const query = req.params;
  if (query?.id) {
    const cart = carts.find((c) => {
      return c.id === Number(query.id);
    });

    if (cart) {
      res.status(200).json(cart);
    } else {
      res.status(404).send("Cart not found");
    }
  }

  res.status(400).send("Please send a correct Cart ID");
});

//Single User Cart(s)
app.get(`${cartPath}/:id1/:id2`, (req, res, next) => {
  const query = req.params;
  if (query?.id2) {
    const cartToShow = [];
    console.log(query.id2);
    for (const a of carts) {
      if (a.userId == query.id2) {
        console.log(a);
        cartToShow.push(a);
      }
    }
    if (cartToShow.length >= 1) {
      res.status(200).json(cartToShow);
    } else {
      res.status(404).send("No Cart Created");
    }
  }

  res.status(400).send("Please send a correct Cart ID");
});

//Add Cart(s)
app.post(cartPath, (req, res) => {
  const body = req.body;
  if (body?.products) {
    const cart = {
      id: carts.at(-1).id + 1,
      userId: body.userId,
      date: body.date,
      products: body.products,
    };
    carts.push(cart);
    res.status(201).json(cart);
  }
  res.status(400).send("Please add required info");
});

//Update Cart(s)
app.patch(`${cartPath}/:id`, (req, res, next) => {
  const query = req.params;
  const body = req.body;
  const keys = Object.keys(body);
  if (query?.id) {
    const cart = carts.findIndex((c) => {
      return c.id === Number(query.id);
    });

    if (cart === -1) {
      res.status(404).send("Cart not found");
    } else {
      for (const value of keys) {
        if (value in carts[cart]) {
          if (value == "products") {
            const toCheck = body[value].length;
            console.log(toCheck);
            for (let a = 0; a < toCheck; a++) {
              console.log(body[value][a].quantity);
              if (body[value][a].quantity == 0 && body[value].length > 1) {
                body[value].splice(a, 1);
              } else if (
                body[value][a].quantity == 0 &&
                body[value].length <= 1
              ) {
                carts.splice(cart, 1);
                res.status(200).send("Cart Was Deleted Because Of No Products");
              }
            }
            console.log(body[value]);
          }
          carts[cart][value] = body[value];
        } else {
          res
            .status(406)
            .send("Update can't be completely done due to an unknown field");
        }
      }

      res.status(200).json(carts[cart]);
    }
  }

  res.status(400).send("Please send a correct Cart ID");
});

//Delete Cart(s)
app.delete(`${cartPath}/:id`, (req, res, next) => {
  const query = req.params;
  if (query?.id) {
    const cart = carts.findIndex((c) => {
      return c.id === Number(query.id);
    });

    if (cart === -1) {
      res.status(404).send("Cart not found");
    } else {
      carts.splice(cart, 1);
      res.status(200).send("Cart is deleted");
    }
  }

  res.status(400).send("Please send a correct Cart ID");
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
