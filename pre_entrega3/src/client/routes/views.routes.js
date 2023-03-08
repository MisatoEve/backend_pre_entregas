import express from "express";
import {
  getAllProducts,
  getCartPage,
  getErrorPage,
  getOneProduct,
} from "../controllers/views.controller.js";
import { passportCall, passportCallHome } from "../../utils/jwt.js";

const Router = express.Router();

Router.get("/", passportCallHome("jwt"), getAllProducts);

Router.get("/products", passportCall("jwt"), getAllProducts);

Router.get("/products/:pid", passportCall("jwt"), getOneProduct);

Router.get("/error", getErrorPage);
//▼cuando no hay carrito se renderiza una alternativa
Router.get("/carts/:cid", getCartPage);
//▼admin sin vista aún
Router.get("/admin");

export default Router;