import dotenv from "dotenv";
import { ERRORS_ENUM } from "../../consts/ERRORS.js";
import CustomError from "../../errors/customError.js";
import UserService from "../services/users.services.js";
dotenv.config();

export const getRegister = (req, res) => {
  try {
    res.render("register");
  } catch (error) {
    req.logger.error(error);

    res.render("error", {
      error: error.message,
    });
  }
};

export const getLogin = (req, res) => {
  try {
    res.render("login");
  } catch (error) {
    req.logger.error(error);

    res.render("error", {
      error: error.message,
    });
  }
};

export const getLogout = async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      req.logger.error(err);

      return res.status(500).render("errors", { error: err });
    }

    res.clearCookie(process.env.COOKIE_NAME).redirect("/login");
  });
};

export const postRegister = (req, res) => {
  //TODO register must redirect fron the front
  if (!req.user) return res.status(400);

  res.status(200).send({ paylaod: req.user });
};

export const postLogin = (req, res) => {
  if (!req.user) {
    req.logger.error("Invalid credentials");

    return res.status(400).send({ error: "Invalid credentials" });
  }

  req.session.user = req.user;

  res
    .status(200)
    .cookie(process.env.COOKIE_NAME, req.user.token)
    .send({ payload: req.user });
};

export const getCurrentUser = (req, res) => {
  try {
    const user = req.user;

    //TODO redirect /current fron the fornt
    res.status(200).send({ payload: user });
  } catch (error) {
    req.logger.error(error);

    res.render("error", {
      error: error.message,
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await UserService.finAll();

    if (!users) {
      CustomError.createError({
        message: "Db is empty",
      });
    }

    res.status(200).send({
      payload: users,
    });
  } catch (error) {
    req.logger.error(error);

    res.render("error", {
      error: error.message,
    });
  }
};

export const getRestore = (req, res) => {
  try {
    res.render("restore");
  } catch (error) {
    req.logger.error(error);

    res.render("error", {
      error: error.message,
    });
  }
};

export const postRestore = async (req, res) => {
  try {
    const { email } = req.body;

    const result = await UserService.sendRestoreMail(email);

    if (!result) {
      return res.render("error", { error: "Email Not Found" });
    }

    res.status(200).redirect("login");
  } catch (error) {
    req.logger.error(error);

    res.render("error", {
      error: error.message,
    });
  }
};

export const getRestoreForm = async (req, res) => {
  try {
    const { uid, token } = req.params;

    const user = await UserService.findUserById(uid);

    if (!user) {
      CustomError.createError({
        message: ERRORS_ENUM["USER NOT FOUND"],
      });

      return res.redirect("restore");
    }

    const userToken = await UserService.findUserToken(uid, token);

    if (!userToken) {
      CustomError.createError({
        message: "Invalid or expired token",
      });

      return res.redirect("restore");
    }

    res.render("restoreForm", {
      style: "styles.css",
      uid,
      token,
    });
  } catch (error) {
    req.logger.error(error);

    res.redirect("restore");
  }
};

export const postRestoreForm = async (req, res) => {
  try {
    const { password } = req.body;
    const { uid, token } = req.params;

    const result = await UserService.restorePassword(uid, password, token);

    if (!result) {
      CustomError.createError({
        message: ERRORS_ENUM["USER NOT FOUND"],
      });
    }

    res.status(200).redirect("login");
  } catch (error) {
    req.logger.error(error);

    res.render("error", {
      error: error.message,
    });
  }
};

export const changeUserRole = async (req, res) => {
  try {
    const { uid } = req.params;

    const result = await UserService.changeRole(uid);

    if (!result) {
      CustomError.createError({
        message: "Something went wrong",
      });
    }

    res.status(200).send({
      message: "User succesfully changed role",
    });
  } catch (error) {
    req.logger.error(error);

    res.render("error", {
      error: error.message,
    });
  }
};