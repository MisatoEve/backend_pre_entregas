import express from "express";
import CartModel from "../dao/models/cart.model.js";
import { ERRORS } from "../consts/errors.js";

const Router = express.Router();

// muestra los carritos
Router.get("/", async (req, res) => {
  try {
    const carts = await CartModel.find();

    if (!carts) {
      res.send({
        succes: false,
        error: ERRORS.NOT_FOUND_ERROR,
      });
    }

    res.send({
      succes: true,
      payload: carts,
    });
  } catch (error) {
    console.log(error);

    res.send({
      succes: false,
      error,
    });
  }
});

// crear un nuevo carrito en la primer instancia
Router.post("/", async (req, res) => {
  try {
    const newCart = {
      products: [],
    };

    const result = await CartModel.create(newCart);

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

// mostrar los productos que hay en el carrito
Router.get("/:cuuid", async (req, res) => {
  try {
    const { cuuid } = req.params;

    if (!cuuid) {
      return res.send({
        succes: false,
        error: ERRORS.INPUT_VALIDATION_ERROR,
      });
    }

    const result = await CartModel.findById({
      _id: cuuid,
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

// agregar un producto a un carrito || modificar cantidad si ya existe
Router.post("/:cuuid/:puuid", async (req, res) => {
  try {
    const { cuuid } = req.params;

    if (!cuuid) {
      return res.send({
        succes: false,
        error: ERRORS.INPUT_VALIDATION_ERROR,
      });
    }

    const { puuid } = req.params;

    if (!puuid) {
      return res.send({
        succes: false,
        error: ERRORS.INPUT_VALIDATION_ERROR,
      });
    }

    const findProductInCart = await CartModel.findOne({
      "products.id": puuid,
    });

    if (findProductInCart) {
      const updateProduct = await CartModel.updateOne(
        {
          "products.id": puuid,
        },
        {
          $inc: {
            "products.$.quantity": 1,
          },
        }
      );

      return res.send({
        succes: true,
        payload: updateProduct,
      });
    }

    const result = await CartModel.updateOne(
      {
        _id: cuuid,
      },
      {
        $push: {
          products: { id: puuid, quantity: 1 },
        },
      }
    );

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