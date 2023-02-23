import express from "express";
import {
  getAllProducts,
  getErrorPage,
  getOneProduct,
} from "../controllers/views.controller.js";
import { passportCall } from "../../utils/jwt.js";

const Router = express.Router();

Router.get("/products", passportCall("jwt"), getAllProducts);

Router.get("/products/:pid", passportCall("jwt"), getOneProduct);

Router.get("/error", getErrorPage);

Router.get("carts/:cid");

Router.get("/admin");

export default Router;