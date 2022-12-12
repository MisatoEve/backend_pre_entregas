import { ProductManager } from "./app.js";

export const ProductsManager = new ProductManager('../db/products.json');
export const CartManager = new ProductManager('../db/cart.json');