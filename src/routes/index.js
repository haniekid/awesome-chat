import express from "express";
import { authController, homeController } from "../controllers";
import { authValidation } from "../validation";
import initPassportLocal from "../controllers/passportController/local";
import passport from "passport";

// Init all passport
initPassportLocal();

const router = express.Router();

/*
 * Init all routes
 * @param app from exactly express module
 */

const routes = (app) => {
  router.get("/", homeController.getHome);

  router.get("/login-register", authController.getLoginRegister);
  router.get("/logout", authController.getLogout);

  router.post("/register", authValidation.register, authController.register);
  router.post("/verify/:token", authController.verifyAccount);

  router.post(
    "/login",
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/login-register",
      successFlash: true,
      failureFlash: true,
    })
  );

  return app.use("/", router);
};

module.exports = routes;
