import express from "express";
import {
  addArrayOfProducts,
  addProductToCart,
  createCart,
  deleteOneProduct,
  emptyCart,
  getCartById,
  getCarts,
  updateProductQuantity,
} from "../controllers/carts.controller.js";

const Router = express.Router();

Router.post("/", createCart);

Router.get("/", getCarts);

Router.get("/:cid", getCartById);

Router.post("/cid", addArrayOfProducts);

Router.delete("/:cid", emptyCart);

Router.post("/:cid/product/:pid", addProductToCart);

Router.put("/:cid/product/:pid", updateProductQuantity);

Router.delete("/:cid/product/:pid", deleteOneProduct);

export default Router;