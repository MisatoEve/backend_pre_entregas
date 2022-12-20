import express from "express";
import { CartManager } from "../app/index.js";
import { ERRORS } from "../const/errors.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const newCart = await CartManager.createCart();

    res.send({
      succes: true,
      cart: newCart,
    });
  } catch (error) {
    console.log(error);

    res.send({
      succes: false,
      error: "An unexpected error has ocurred",
    });
  }
});

router.get("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;

    const id = Number(cid);

    if (Number.isNaN(id) || id < 0) {
      return res.send({
        succes: false,
        error: "Invalid cart ID",
      });
    }

    const cart = await CartManager.getCartById(id);

    res.send({
      succes: true,
      cart,
    });
  } catch (error) {
    console.log(error);

    if (error.name === ERRORS.NOT_FOUND_ERROR) {
      return res.send({
        succes: false,
        error: `${error.name}: ${error.message}`,
      });
    }

    res.send({
      succes: false,
      error: "An unexpected error has ocurred",
    });
  }
});

router.post("/:cid/products/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;

    const cartId = Number(cid);

    if (Number.isNaN(cartId) || cartId < 0) {
      return res.send({
        succes: false,
        error: "Invalid cart ID",
      });
    }

    const prodId = Number(pid);

    if (Number.isNaN(prodId) || prodId < 0) {
      return res.send({
        succes: false,
        error: "Invalid product ID",
      });
    }

    const cartUpdated = await CartManager.addProductToCart(cartId, prodId);

    res.send({
      succes: true,
      cart: cartUpdated,
    });
  } catch (error) {
    console.log(error);

    if (error.name === ERRORS.NOT_FOUND_ERROR) {
      return res.send({
        succes: false,
        error: `${error.name}: ${error.message}`,
      });
    }

    res.send({
      succes: false,
      error: "An unexpected error has ocurred",
    });
  }
});

export default router;