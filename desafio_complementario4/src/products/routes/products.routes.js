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
//Router.get("/", authToken, getAllProductsCtr);
//▼Obtener un producto por id
Router.get("/:pid", getProductByIdCtr);

//▼Agregar un producto a la base de datos
Router.post("/", authToken, authPolicies("ADMIN", "PREMIUM"), addNewProductCtr);

//▼Modificar un producto
Router.put("/:pid", authToken, authPolicies("ADMIN", "PREMIUM"), updateProductCtr);
//authPolicies("ADMIN", null),
//▼Eliminar un producto
Router.delete("/:pid", authToken, authPolicies("ADMIN", "PREMIUM"), deleteProductCtr);

export default Router;