const { validationResult } = require("express-validator/check");
import { authService } from "../services";
import { transSuccess } from "../../lang/vi";

const getLoginRegister = async (req, res) => {
  return res.render("auth/master", {
    errors: req.flash("errors"),
    success: req.flash("success"),
  });
};

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
      req.body.gender,
      req.protocol,
      req.get("host")
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

const verifyAccount = async (req, res, next) => {
  const errorArr = [];
  const successArr = [];
  try {
    const verifySuccess = await authService.verifyAccount(req.params.token);
    successArr.push(verifySuccess);

    req.flash("success", successArr);
    return res.redirect("/login-register");
  } catch (error) {
    errorArr.push(error);
    req.flash("errors", errorArr);
    return res.redirect("/login-register");
  }
};

const getLogout = async (req, res) => {
  req.logout(); // delete users info from session passport
  req.flash("success", transSuccess.logoutSuccess);
  return res.redirect("/login-register");
};

const checkLoggedIn = async (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.redirect("/login-register");
  }
  next();
};

const checkLoggedOut = async (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  next();
};

module.exports = {
  getLoginRegister,
  register,
  verifyAccount,
  getLogout,
  checkLoggedIn,
  checkLoggedOut,
};
