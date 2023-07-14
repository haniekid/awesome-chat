import express from "express";
import { authController, homeController } from "../controllers";
import { authValidation } from "../validation";

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

  return app.use("/", router);
};

module.exports = routes;
