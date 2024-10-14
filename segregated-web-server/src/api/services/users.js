const databaseUser = require("../Database/users");
const databaseCart = require("../Database/carts");
const users = databaseUser.users;
const carts = databaseCart.carts;

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
