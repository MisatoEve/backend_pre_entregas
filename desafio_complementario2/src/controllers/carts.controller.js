import { CartServices } from "../services/carts.services.js";

export const createCart = async (req, res) => {
  try {
    await CartServices.createCart();

    return res.status(200).send({
      message: "Cart created",
    });
  } catch (error) {
    console.log(error);

    return res.status(400).send({
      error: "Something went wrong",
    });
  }
};

export const getCarts = async (req, res) => {
  try {
    const result = await CartServices.getAllCarts();

    return res.status(200).send({
      payload: result,
    });
  } catch (error) {
    console.log(error);

    return res.status(400).send({
      error: "Something went wrong",
    });
  }
};

export const getCartById = async (req, res) => {
  try {
    const { pid } = req.params;

    const result = await CartServices.getCartById(pid);

    return res.status(200).send({
      payload: result,
    });
  } catch (error) {
    console.log(error);

    return res.status(400).send({
      error: "Something went wrong",
    });
  }
};

export const addProductToCart = async (req, res) => {
  try {
    const { cid, pid } = req.params;

    const result = await CartServices.addProductToCart(cid, pid);

    return res.status(200).send({
      payload: result,
    });
  } catch (error) {
    console.log(error);

    return res.status(400).send({
      error: "Something went wrong",
    });
  }
};

export const updateProductQuantity = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    const result = await CartServices.updateQuantity(cid, pid, quantity);

    return res.status(200).send({
      payload: result,
    });
  } catch (error) {
    console.log(error);

    return res.status(400).send({
      error: "Something went wrong",
    });
  }
};

export const addArrayOfProducts = async (req, res) => {
  try {
    const { cid } = req.params;
    const arrayOfProducts = req.body;

    const result = await CartServices.addArrayOfProducts(cid, arrayOfProducts);

    return res.status(200).send({
      payload: result,
    });
  } catch (error) {
    console.log(error);

    return res.status(400).send({
      error: "Something went wrong",
    });
  }
};

export const deleteOneProduct = async (req, res) => {
  try {
    const { cid, pid } = req.params;

    const result = await CartServices.deleteProductFromCart(cid, pid);

    return res.status(200).send({
      payload: result,
    });
  } catch (error) {
    console.log(error);

    return res.status(400).send({
      error: "Something went wrong",
    });
  }
};

export const emptyCart = async (req, res) => {
  try {
    const { cid } = req.params;

    const result = await CartServices.deleteAllProducts(cid);

    return res.status(200).send({
      payload: result,
    });
  } catch (error) {
    console.log(error);

    return res.status(400).send({
      error: "Something went wrong",
    });
  }
};