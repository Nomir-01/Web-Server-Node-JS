const service = require("../services/auth");

const login = async (req, res) => {
  try {
    const body = req.body;
    const user = await service.login(body);
    res.status(201).json({
      message: "Logged In successfully",
      data: user,
    });
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ err: err?.message || "Something went wrong!" });
  }
};

module.exports = {
  login,
};
