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
  UserControllers
} from "../controller/users.controllers.js";
import upload from "../../utils/multer.js";

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

Router.post(
  "/:uid/documents",
  upload.fields([
    { name: "documents", maxCount: 3 },
    { name: "profiles", maxCount: 1 },
    { name: "products", maxCount: 10 },
  ]),
  UserControllers
);

Router.post('api/users/:uid/documents', async(req, res) => {
  try {
      
  } catch (error) {
      CustomError.createError({
          name: `User search error`,
          cause: generateGeneralError(error),
          message: `Problema en ApiUsers, endpoint: ${req.url}.`,
          code: ERRORS_ENUM 
      })
      return res.status(500).send({ status: 'error', error: error.message })
  }
})

export default Router;