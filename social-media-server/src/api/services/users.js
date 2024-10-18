const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getUsers = async (query) => {
  if (!Object.keys(query).length) {
    const users = await prisma.user.findMany({
      select: {
        firstName: true,
        lastName: true,
        email: true,
        Post: {
          select: {
            title: true,
            description: true,
          },
        },
      },
    });
    return users;
  }
};

const getSingleUser = async (userId) => {
  if (userId) {
    const user = await prisma.user.findUnique({
      where: {
        id: Number(userId),
      },
      select: {
        firstName: true,
        lastName: true,
        email: true,
        Post: {
          select: {
            title: true,
            description: true,
          },
        },
      },
    });

    if (user) {
      return user;
    } else {
      throw { status: 404, message: "User not found" };
    }
  }
  throw { status: 400, message: "Please enter a correct User ID" };
};

const addUser = async (body) => {
  const bodyKeys = Object.keys(body);
  const requiredKeys = ["firstName", "lastName", "email", "password"];
  console.log(bodyKeys);
  if (JSON.stringify(requiredKeys) == JSON.stringify(bodyKeys)) {
    const user = await prisma.user.create({
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        password: String(body.password),
      },
      select: {
        firstName: true,
        lastName: true,
        email: true,
      },
    });
    return user;
  }
  throw { status: 400, message: "Please add all required fields" };
};

const updateUser = async (body, userId) => {
  const keys = Object.keys(body);
  if (userId) {
    const user = await prisma.user.findUnique({
      where: {
        id: Number(userId),
      },
      select: {
        firstName: true,
        lastName: true,
        email: true,
      },
    });

    if (!user) {
      throw { status: 404, message: "User not found" };
    } else {
      const updateData = {};
      for (const value of keys) {
        if (value in user) {
          updateData[value] = body[value];
        } else {
          throw {
            status: 400,
            message: "Update can't be completely done due to an unknown field",
          };
        }
      }
      const updatedUser = await prisma.user.update({
        where: {
          id: Number(userId),
        },
        data: updateData,
        select: {
          firstName: true,
          lastName: true,
          email: true,
        },
      });
      return updatedUser;
    }
  }
  throw { status: 400, message: "Please send a correct User ID" };
};

const deleteUser = async (userId) => {
  if (userId) {
    const user = await prisma.user.delete({
      where: {
        id: Number(userId),
      },
    });

    if (!user) {
      throw { status: 404, message: "User not found" };
    } else {
      return "User is deleted";
    }
  }
  throw { status: 400, message: "Please enter a correct User ID" };
};

module.exports = {
  getUsers,
  getSingleUser,
  addUser,
  updateUser,
  deleteUser,
};
