const { validationResult } = require("express-validator/check");
import { authService } from "../services";

const getLoginRegister = async (req, res) => {
  return res.render("auth/master", {
    errors: req.flash("errors"),
    success: req.flash("success"),
  });
};

const getLogout = async (req, res) => {};

const register = async (req, res) => {
  const errorArray = [];
  const successArray = [];

  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    let errors = Object.values(validationErrors.mapped());
    errors.forEach((error) => {
      errorArray.push(error.msg);
    });
    console.log(errorArray);
  }

  try {
    const createUserSuccess = await authService.register(
      req.body.email,
      req.body.password,
      req.body.gender
    );
    successArray.push(createUserSuccess);

    req.flash("success", successArray);
    return res.redirect("/login-register");
  } catch (error) {
    errorArray.push(error);
    req.flash("errors", errorArray);
    return res.redirect("/login-register");
  }
};

module.exports = {
  getLoginRegister,
  getLogout,
  register,
};
