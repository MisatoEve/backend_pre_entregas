import express from "express";
import passport from "passport";
import {
  getLogin,
  getLogout,
  getRegister,
  postLogin,
  postRegister,
} from "../controller/users.controllers.js";

const Router = express.Router();

Router.get("/register", getRegister);

Router.get("/login", getLogin);

Router.post(
  "/register",
  passport.authenticate("register", { failureRedirect: "/error" }),
  postRegister
);

Router.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/error" }),
  postLogin
);

Router.get("/logout", getLogout);

export default Router;
