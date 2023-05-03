import express from "express";
import {
  changeUserRole,
  getAllUsers,
} from "../controller/users.controllers.js";

const Router = express.Router();

Router.get("/", getAllUsers);

Router.get("/premium/:uid", changeUserRole);

export default Router;