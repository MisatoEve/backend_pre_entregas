import express from "express";
import { ProductsModel } from "../dao/models/products.model.js";

const Router = express.Router();

// Mostrar todos los productos
Router.get("/", async (req, res) => {
  try {
    const products = await ProductsModel.find();

    if (!products) {
      res.send({
        succes: false,
        message: "No se encuentran objetos",
      });
    }

    res.send({
      succes: true,
      products,
    });
  } catch (error) {
    console.log(error);

    res.send({
      succes: false,
      error,
    });
  }
});

// /:pid mostrar el producto segun el id seleccionado
Router.get("/:pid", (req, res) => {
  const id = req.params.pid;

  res.send({
    succes: true,
    messahe: `Un solo producto ${id}`,
  });
});
// agrega un producto
Router.post("/", async (req, res) => {
  try {
    const newProduct = req.body;

    if (!newProduct) {
      res.send({
        succes: false,
        error: "Complete todos los campos",
      });
    }

    const result = await ProductsModel.create(newProduct);

    res.send({
      succes: true,
      product: newProduct,
    });
  } catch (error) {
    console.log(error);

    res.send({
      succes: false,
      error,
    });
  }
});

// actualizar un producto

Router.put("/:uuid", async (req, res) => {
  try {
    const { uuid } = req.params;

    const product = req.body;

    const updatedProduct = await ProductsModel.updateOne(
      { _id: uuid },
      product
    );

    if (!updatedProduct) {
      res.send({
        succes: false,
        message: "Producto no encontrado",
      });
    }

    res.send({
      succes: true,
      updatedProduct,
    });
  } catch (error) {
    console.log(error);

    res.send({
      succes: false,
      error,
    });
  }
});

// eliminar un producto

Router.delete("/:uuid", async (req, res) => {
  try {
    const { uuid } = req.params;

    const result = await ProductsModel.deleteOne({ _id: uuid });

    res.send({
      succes: true,
      payload: result,
    });
  } catch (error) {
    console.log(error);

    res.send({
      succes: false,
      error,
    });
  }
});

export default Router;