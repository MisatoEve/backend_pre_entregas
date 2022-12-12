import { Router } from "express";
import { ProductsManager } from "../app/index.js";
import { ERRORS } from "../consts/errors.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const products = await ProductsManager.getProducts();

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
      products: filteredProducts,
    });
  } catch (error) {
    console.log(error);

    res.send({
      succes: false,
      error: "(!) Ha ocurrido un error",
    });
  }
});

router.get("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;

    const id = Number(pid);

    if (Number.isNaN(id) || id < 0) {
      return res.send({
        succes: false,
        error: "(!)El id es inválido",
      });
    }

    const product = await ProductsManager.getProductById(id);

    if (!product) {
      return res.send({
        succes: false,
        error: "(!) El producto no existe",
      });
    }

    res.send({
      succes: true,
      product,
    });
  } catch (error) {
    console.log(error);

    res.send({
      succes: false,
      error: "(!) error",
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, description, code, price, stock, category, thumbnail } =
      req.body;

    const newProduct = {
      title,
      description,
      code,
      price,
      stock,
      category,
      thumbnail,
    };

    await ProductsManager.addProduct({ ...newProduct });

    res.send({
      succes: true,
      productAdded: newProduct,
    });
  } catch (error) {
    console.log(error);

    if (error.name === ERRORS.CODE_VALIDATION_ERROR) {
      return res.send({
        succes: false,
        error: `${error.name}: ${error.message}`,
      });
    }

    if (error.name === ERRORS.INPUT_VALIDATION_ERROR) {
      return res.send({
        succes: false,
        error: `${error.name}: ${error.message}`,
      });
    }

    res.send({
      succes: false,
      error: "(!) Ha ocurrido un error",
    });
  }
});

router.put("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;

    const id = Number(pid);

    if (Number.isNaN(id) || id < 0) {
      return res.send({
        succes: false,
        error: "(!) El id ingresado no es válido",
      });
    }

    const productUpdate = req.body;

    const productUpdated = await ProductsManager.updateProduct(id, productUpdate);

    res.send({
      succes: true,
      product: productUpdated,
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
      error: "(!) Ha ocurrido un error",
    });
  }
});

router.delete("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;

    const id = Number(pid);

    if (Number.isNaN(id) || id < 0) {
      return res.send({
        succes: false,
        error: "(!)El id ingresado no es válido",
      });
    }

    const deleteProduct = await ProductsManager.deleteProduct(id);

    res.send({
      succes: true,
      deleted: deleteProduct,
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
      error: "(!)error",
    });
  }
});

export default router;