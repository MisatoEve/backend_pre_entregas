import express from "express";
import Managers from "../dao/managers/index.js";

const Router = express.Router();

//▼Mostrar todos los productos
Router.get("/", async (req, res) => {
  try {
    const { sort, query, page, limit } = req.query;
    const options = {
      limit: limit || 5,
      page: page || 1,
      sort: { price: sort } || { price: 1 },
      lean: true,
    };

    const products = await Managers.ProductsManager.getProducts(query, options);

    res.send({
      status: "succes",
      payload: products.docs,
      totalPages: products.totalPages,
      prevPage: products.prevPage,
      nextPage: products.nextPage,
      page: products.page,
      hasPrevPage: products.hasPrevPage,
      hasNextPage: products.hasNextPage,
      prevLink: products.hasPrevPage
        ? `/api/products?page=${products.prevPage}`
        : null,
      nextLink: products.hasNextPage
        ? `/api/products?page=${products.nextPage}`
        : null,
    });
  } catch (error) {
    console.log(error);

    res.send({
      status: "error",
      error: "SOMETHING WENT WRONG",
    });
  }
});

//▼Traer un solo producto por id
Router.get("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;

    const product = await Managers.ProductsManager.getProductById(pid);

    res.send({
      status: "succes",
      payload: product,
    });
  } catch (error) {
    console.log(error.message);

    res.send({
      status: "error",
      error: error.message || "SOMETHING WENT WRONG",
    });
  }
});

//▼Agrego un nuevo producto que llega por req.body
Router.post("/", async (req, res) => {
  try {
    const newProduct = req.body;

    if (!newProduct) {
      return res.send({
        status: "error",
        error: "EMPTY PRODUCT",
      });
    }

    const result = await Managers.ProductsManager.addProduct(newProduct);

    res.send({
      status: "succes",
      payload: result,
    });
  } catch (error) {
    console.log(error);

    res.send({
      status: "error",
      error: error.message || "SOMETHING WENT WRONG",
    });
  }
});

//▼Actualizar un producto
Router.put("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;

    const updates = req.body;

    const result = await Managers.ProductsManager.updateProduct(pid, updates);

    res.send({
      status: "succes",
      payload: result,
    });
  } catch (error) {
    console.log(error);

    res.send({
      status: "error",
      error: error.message || "SOMETHING WENT WRONG",
    });
  }
});

//▼Eliminar un producto
Router.delete("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;

    const result = await Managers.ProductsManager.deleteProduct(pid);

    res.send({
      status: "succes",
      payload: result,
    });
  } catch (error) {
    console.log(error);

    res.send({
      status: "error",
      error: error.message || "SOMETHING WENT WRONG",
    });
  }
});

export default Router;