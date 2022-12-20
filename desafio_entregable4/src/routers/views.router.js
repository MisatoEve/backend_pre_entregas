import express from "express";
import { ProdManager } from "../app/index.js";
import { ERRORS } from "../const/errors.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const products = await ProdManager.getProducts();

    if (!products) {
      return res.send({
        succes: false,
        error: "An unexpected error has ocurred",
      });
    }

    const { limit } = req.query;

    if (!limit || limit < 0) {
      return res.render("home", {
        style: "style.css",
        products,
      });
    }

    const filteredProducts = products.slice(0, limit);

    res.render("home", {
      style: "style.css",
      products: filteredProducts,
    });
  } catch (error) {
    console.log(error);

    res.send({
      succes: false,
      error: "An unexpected error has ocurred",
    });
  }
});

router.get("/realTimeProducts", async (req, res) => {
  try {
    const products = await ProdManager.getProducts();

    // const io = req.io;

    if (!products) {
      return res.send({
        succes: false,
        error: "An unexpected error has ocurred",
      });
    }

    // const { limit } = req.query;

    // if (!limit || limit < 0) {
    //   return res.render("realTimeProducts", {
    //     style: "style.css",
    //   });
    // }

    //const filteredProducts = products.slice(0, limit);

    res.render("realTimeProducts", {
      style: "style.css",
    });
  } catch (error) {
    console.log(error);

    res.send({
      succes: false,
      error: "An unexpected error has ocurred",
    });
  }
});

router.post("/realTimeProducts", async (req, res) => {
  try {
    const newProduct = req.body;

    await ProdManager.addProduct({ ...newProduct });

    const products = await ProdManager.getProducts();

    req.io.emit("addProduct", products);

    res.send(
      console.log({
        succes: true,
        product: newProduct,
      })
    );
  } catch (error) {
    console.log(error);

    if (error.name === ERRORS.VALIDATION_ERROR) {
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

router.delete("/realTimeProducts/:pid", async (req, res) => {
  try {
    const { pid } = req.params;

    const id = Number(pid);

    if (Number.isNaN(id) || id < 0) {
      return res.send({
        succes: false,
        error: "Invalid product ID",
      });
    }

    const deletedProduct = await ProdManager.deleteProduct(id);

    const products = await ProdManager.getProducts();

    const io = req.io;

    io.emit("deletedProduct", products);

    res.send(
      console.log({
        succes: true,
        deleted: deletedProduct,
      })
    );
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