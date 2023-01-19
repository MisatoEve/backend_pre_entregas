import { ProductManager } from "./productsManager.js";
import { CartManager } from "./cartManager.js";

const ProductsManager = new ProductManager();
const CartsManager = new CartManager();

export default {
  ProductsManager,
  CartsManager,
};