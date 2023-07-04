import express from "express";

const router = express.Router();
/*
 * Init all routes
 * @param app from exactly express module
 */

const routes = (app) => {
  router.get("/", async (req, res) => {
    res.render("main/master");
  });

  router.get("/login-register", async (req, res) => {
    return res.render("auth/loginRegister");
  });

  return app.use("/", router);
};
