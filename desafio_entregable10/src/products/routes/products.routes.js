import express from "express";
import { authPolicies, authToken } from "../../utils/jwt.js";
import {
  getAllProductsCtr,
  getProductByIdCtr,
  addNewProductCtr,
  updateProductCtr,
  deleteProductCtr,
} from "../controller/products.controller.js";

const Router = express.Router();

//▼Obtener todos los productos
Router.get("/", getAllProductsCtr);

//▼Obtener un producto por id
Router.get("/:pid", getProductByIdCtr);

//▼Agregar un producto a la base de datos
Router.post("/", authToken, authPolicies("ADMIN"), addNewProductCtr);

//▼Modificar un producto
Router.put("/:pid", authToken, authPolicies("ADMIN"), updateProductCtr);

//▼Eliminar un producto
Router.delete("/:pid", authToken, authPolicies("ADMIN"), deleteProductCtr);

export default Router;