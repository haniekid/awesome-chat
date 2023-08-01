import express from "express";
import passport from "passport";
import { authController, homeController } from "../controllers";
import { authValidation } from "../validation";
import initPassportLocal from "../controllers/passportController/local";
import initPassportFacebook from "../controllers/passportController/facebook";
import initPassportGoogle from "../controllers/passportController/google";

// Init all passport
initPassportLocal();
initPassportFacebook();
initPassportGoogle();

const router = express.Router();

/*
 * Init all routes
 * @param app from exactly express module
 */

const routes = (app) => {
  router.get("/", authController.checkLoggedIn, homeController.getHome);

  router.get("/logout", authController.checkLoggedIn, authController.getLogout);

  router.use(authController.checkLoggedOut);

  router.get(
    "/auth/facebook",
    passport.authenticate("facebook", { scope: ["email"] })
  );
  router.get(
    "/auth/facebook/callback",
    passport.authenticate("facebook", {
      successRedirect: "/",
      failureRedirect: "/login-register",
    })
  );

  router.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["email"] })
  );
  router.get(
    "/auth/google/callback",
    passport.authenticate("google", {
      successRedirect: "/",
      failureRedirect: "/login-register",
    })
  );

  router.get("/login-register", authController.getLoginRegister);
  router.post(
    "/login",
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/login-register",
      successFlash: true,
      failureFlash: true,
    })
  );
  router.post("/register", authValidation.register, authController.register);
  router.post("/verify/:token", authController.verifyAccount);
  return app.use("/", router);
};

module.exports = routes;
