const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const validateToken = async (req, res, next) => {
  try {
    const token = req.headers?.authorization;
    if (!token) res.status(400).send("No token exists");
    const isTokenValid = await prisma.user.findFirst({
      where: {
        token,
        tokenValidity: {
          gt: new Date(),
        },
      },
    });
    if (!isTokenValid) return res.status(401).send("Unauthorized");
    req.userId = isTokenValid.id;
    next();
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

module.exports = {
  validateToken,
};
