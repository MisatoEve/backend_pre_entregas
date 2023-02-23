import express from "express";
import {
  getAllProductsCtr,
  getProductByIdCtr,
  addNewProductCtr,
  updateProductCtr,
  deleteProductCtr,
} from "../controller/products.controller.js";

const Router = express.Router();

//obtener todos los productos
Router.get("/", getAllProductsCtr);

//ontener un producto por id
Router.get("/:pid", getProductByIdCtr);

//agregar un producto a la base de datos
Router.post("/", addNewProductCtr);

//modificar un producto
Router.put("/:pid", updateProductCtr);

//eliminar un producto
Router.delete("/:pid", deleteProductCtr);

export default Router;