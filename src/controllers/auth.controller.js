const { validationResult } = require("express-validator/check");

const getLoginRegister = async (req, res) => {
  return res.render("auth/master");
};

const getLogout = async (req, res) => {};

const register = async (req, res) => {
  const errorArray = [];
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    let errors = Object.values(validationErrors.mapped());
    errors.forEach((error) => {
      errorArray.push(error.msg);
    });
    console.log(errorArray);
    return;
  }
};

module.exports = {
  getLoginRegister,
  getLogout,
  register,
};
