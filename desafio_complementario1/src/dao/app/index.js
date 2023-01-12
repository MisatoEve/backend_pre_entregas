import ProductManager from "./ProductManager.js";
import { PATHS } from "../../consts/index.js";

export const ProdManager = new ProductManager(PATHS.PRODUCT_PATH);

export const CartManager = new ProductManager(PATHS.CART_PATH);