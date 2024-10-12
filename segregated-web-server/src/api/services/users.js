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

const getAllUsers = (query) => {
  if (!Object.keys(query).length) return users;
};

const getSingleUser = (query) => {
  const user = users.find((u) => {
    return u.id === Number(query.id);
  });
  return user;
};

const addUser = (body) => {
  const bodyKeys = Object.keys(body);
  const userKeys = Object.keys(users[0]);
  userKeys.splice(0, 1);
  if (JSON.stringify(userKeys) == JSON.stringify(bodyKeys)) {
    const user = {
      id: users.at(-1).id + 1,
      name: body.name,
      email: body.email,
      username: body.username,
      name: body.name,
      address: body.address,
      phoneNumber: body.phoneNumber,
    };
    users.push(user);
    return user;
  }
};

const updateUser = (body, query) => {
  const keys = Object.keys(body);
  if (query?.id) {
    const user = users.findIndex((u) => {
      return u.id === Number(query.id);
    });

    if (user === -1) {
      throw { status: 404, message: "User not found" };
    } else {
      for (const value of keys) {
        if (value in users[user]) {
          users[user][value] = body[value];
        } else {
          throw {
            status: 400,
            message: "Update can't be completely done due to an unknown field",
          };
        }
      }
      return users[user];
    }
  }
  throw { status: 400, message: "Please send a correct User ID" };
};

const deleteUser = (query) => {
  if (query?.id) {
    const user = users.findIndex((u) => {
      return u.id === Number(query.id);
    });

    if (user === -1) {
      throw { status: 404, message: "User not found" };
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
      return "User is deleted";
    }
  }
  throw { status: 400, message: "Please enter a correct User ID" };
};

module.exports = {
  getAllUsers,
  getSingleUser,
  addUser,
  updateUser,
  deleteUser,
};
