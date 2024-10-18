const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const login = async (body) => {
  const user = await prisma.user.findFirst({
    where: {
      email: body.email,
      password: body.password,
    },
  });

  if (!user) throw { status: 400, message: "Invalid username or password" };

  const token = generateRandomString();
  const tokenValidity = new Date();
  tokenValidity.setMinutes(tokenValidity.getMinutes() + 30);

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      token,
      tokenValidity,
    },
  });

  const data = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
    select: {
      firstName: true,
      lastName: true,
      email: true,
    },
  });

  return data;
};

function generateRandomString(length = 20) {
  const characters =
    "ABCDEFGHIJKLMNOP!@#%^&*()QRSTUVWXYZabcdef@ghij%kl.mn$$$opqrs/tuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  return result;
}

module.exports = {
  login,
};
