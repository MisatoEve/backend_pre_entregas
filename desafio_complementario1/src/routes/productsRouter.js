import express from "express";
import ProductsModel from "../dao/models/products.model.js";
import { ERRORS } from "../consts/errors.js";

const Router = express.Router();

// Mostrar todos los productos
Router.get("/", async (req, res) => {
  try {
    const products = await ProductsModel.find();

    if (!products) {
      return res.send({
        succes: false,
        error: ERRORS.NOT_FOUND_ERROR,
      });
    }

    const { limit } = req.query;

    if (!limit || limit < 0) {
      return res.send({
        succes: true,
        products,
      });
    }
    const filteredProducts = products.slice(0, limit);

    res.send({
      succes: true,
      payload: filteredProducts,
    });
  } catch (error) {
    console.log(error);

    res.send({
      succes: false,
      error,
    });
  }
});

// /:uuid mostrar el producto segun el id seleccionado
Router.get("/:uuid", async (req, res) => {
  try {
    const { uuid } = req.params;

    if (!uuid) {
      return res.send({
        succes: false,
        error: ERRORS.INPUT_VALIDATION_ERROR,
      });
    }

    const result = await ProductsModel.findById({
      _id: uuid,
    });

    if (!result) {
      return res.send({
        succes: false,
        error: ERRORS.NOT_FOUND_ERROR,
      });
    }

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

// agrega un producto
Router.post("/", async (req, res) => {
  try {
    const newProduct = req.body;

    console.log(newProduct);

    if (!newProduct) {
      return res.send({
        succes: false,
        error: "Complete todos los campos",
      });
    }

    const result = await ProductsModel.create(newProduct);

    res.send({
      succes: true,
      status: result,
      payload: newProduct,
    });
  } catch (error) {
    console.log(error);

    res.send({
      succes: false,
      error,
    });
  }
});

// actualizar un producto por id
Router.put("/:uuid", async (req, res) => {
  try {
    const { uuid } = req.params;

    if (!uuid) {
      return res.send({
        succes: false,
        error: ERRORS.INPUT_VALIDATION_ERROR,
      });
    }

    const product = req.body;

    const updatedProduct = await ProductsModel.updateOne(
      { _id: uuid },
      product
    );

    if (!updatedProduct) {
      return res.send({
        succes: false,
        error: ERRORS.NOT_FOUND_ERROR,
      });
    }

    res.send({
      succes: true,
      payload: updatedProduct,
    });
  } catch (error) {
    console.log(error);

    res.send({
      succes: false,
      error,
    });
  }
});

// eliminar un producto por id
Router.delete("/:uuid", async (req, res) => {
  try {
    const { uuid } = req.params;

    if (!uuid) {
      return res.send({
        succes: false,
        error: ERRORS.INPUT_VALIDATION_ERROR,
      });
    }

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