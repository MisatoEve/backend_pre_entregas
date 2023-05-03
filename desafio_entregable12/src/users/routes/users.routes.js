import express from "express";
import passport from "passport";
import {
  getLogin,
  getLogout,
  getRegister,
  getRestore,
  postLogin,
  postRegister,
  postRestore,
  getRestoreForm,
  postRestoreForm,
} from "../controller/users.controllers.js";

const Router = express.Router();

Router.get("/register", getRegister);

Router.get("/login", getLogin);

Router.post(
  "/register",
  passport.authenticate("register", { failureMessage: "not auth" }),
  postRegister
);

Router.post(
  "/login",
  passport.authenticate("login", { failureMessage: "not auth" }),
  postLogin
);

Router.get("/logout", getLogout);

Router.get("/restore", getRestore);

Router.post("/restore", postRestore);

Router.get("/restoreForm/:uid/:token", getRestoreForm);

Router.post("/restoreForm/:uid/:token", postRestoreForm);

export default Router;