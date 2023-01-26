import { ProductManager } from "./productsManager.js";
import { CartManager } from "./cartManager.js";
import { UserManager } from "./userManager.js";

const ProductsManager = new ProductManager();
const CartsManager = new CartManager();
const UsersManager = new UserManager();

export default {
  ProductsManager,
  CartsManager,
  UsersManager,
};