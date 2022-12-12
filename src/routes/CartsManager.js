import { Router } from "express";
import { CartManager } from "../app/index.js";
import { ERRORS } from "../consts/errors.js";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const newCart = await CartManager.createCart();

    res.send({
      succes: true,
      card: newCart,
    });
  } catch (error) {
    console.log(error);

    res.send({
      succes: false,
      error: "(!) Lo sentimos. Ha ocurrido un error",
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
        error: "(!) Id inválido",
      });
    }

    const cart = await CartManager.getCart(id);

    if (!cart) {
      res.send({
        succes: false,
        error: "(!) Carrito no encontrado",
      });
    }

    res.send({
      succes: true,
      cart: cart,
    });
  } catch (error) {
    console.log(error);

    res.send({
      succes: false,
      error: "(!) Ha ocurrido un error",
    });
  }
});

router.post("/:cid/products/:pid", async (req, res) => {
  try {
    const { cid: cartId } = req.params;

    const cid = Number(cartId);

    if (Number.isNaN(cid) || cid < 0) {
      return res.send({
        succes: false,
        error: "(!) El Id del carrito ingresado no es válido",
      });
    }

    const { pid: productId } = req.params;

    const pid = Number(productId);

    if (Number.isNaN(pid) || pid < 0) {
      return res.send({
        succes: false,
        error: "(!) El Id del producto ingresado no es válido",
      });
    }

    const productAdded = await CartManager.addProductToCart(cid, pid);

    res.send({
      succes: true,
      product: productAdded,
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
      error: "(!) Error",
    });
  }
});

export default router;