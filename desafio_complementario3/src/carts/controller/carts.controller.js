import { ERRORS_ENUM } from "../../consts/ERRORS.js";
import CustomError from "../../errors/customError.js";
import { CartServices } from "../services/carts.services.js";

export const createCart = async (req, res) => {
  try {
    await CartServices.createCart();

    res.status(200).send({
      message: "Cart created",
    });
  } catch (error) {
    req.logger.error(error);

    res.status(400).send({ status: error.name, message: error.message });
  }
};

export const getCarts = async (req, res) => {
  try {
    const result = await CartServices.getAllCarts();

    if (!result) {
      CustomError.createError({
        message: ERRORS_ENUM["CART IS EMPTY"],
      });
    }

    res.status(200).send({
      payload: result,
    });
  } catch (error) {
    req.logger.error(error);

    res.status(400).send({ status: error.name, message: error.message });
  }
};

export const getCartById = async (req, res) => {
  try {
    const { cid } = req.params;

    const result = await CartServices.getCartById(cid);

    if (!result) {
      CustomError.createError({
        message: ERRORS_ENUM["CART NOT FOUND"],
      });
    }

    res.status(200).send({
      payload: result,
    });
  } catch (error) {
    req.logger.error(error);

    res.status(400).send({ status: error.name, message: error.message });
  }  
};

export const addProductToCart = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const user = req.session.user;

    const result = await CartServices.addProductToCart(cid, pid);

    if (!result) {
      CustomError.createError({
        message: "Failed to add producto to cart",
      });
    }

    res.status(200).send({
      payload: result,
    });
  } catch (error) {
    req.logger.error(error);

    res.render("error", {
      error: error.message,
    });
  }
};

export const updateProductQuantity = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    const result = await CartServices.updateQuantity(cid, pid, quantity);

    if (!result) {
      CustomError.createError({
        message: ERRORS_ENUM["INVALID CART PROPERTY"],
      });
    }

    res.status(200).send({
      payload: result,
    });
  } catch (error) {
    req.logger.error(error);

    res.status(400).send({ status: error.name, message: error.message });
  }
};

export const addArrayOfProducts = async (req, res) => {
  try {
    const { cid } = req.params;
    const arrayOfProducts = req.body;

    const result = await CartServices.addArrayOfProducts(cid, arrayOfProducts);

    res.status(200).send({
      payload: result,
    });
  } catch (error) {
    req.logger.error(error);

    res.status(400).send({ status: error.name, message: error.message });
  }
};

export const deleteOneProduct = async (req, res) => {
  try {
    const { cid, pid } = req.params;

    const result = await CartServices.deleteProductFromCart(cid, pid);

    if (!result) {
      CustomError.createError({
        message: ERRORS_ENUM["INVALID CART PROPERTY"],
      });
    }

    res.status(200).send({
      payload: result,
    });
  } catch (error) {
    req.logger.error(error);

    res.status(400).send({ status: error.name, message: error.message });
  }
};

export const emptyCart = async (req, res) => {
  try {
    const { cid } = req.params;

    const result = await CartServices.deleteAllProducts(cid);

    res.status(200).send({
      payload: result,
    });
  } catch (error) {
    req.logger.error(error);

    res.status(400).send({ status: error.name, message: error.message });
  }
};

export const purchaseCart = async (req, res) => {
  try {
    const { cid } = req.params;

    const result = await CartServices.purchaseProducts(cid);

    if (!result) {
      CustomError.createError({
        message: ERRORS_ENUM["INVALID CART PROPERTY"],
      });
    }

    res.status(200).send({
      payload: result,
    });
  } catch (error) {
    req.logger.error(error);

    res.status(400).send({ status: error.name, message: error.message });
  }
};