import { generateProducts } from "../../utils/products.mock.js";

export const saveGeneratedProducts = () => {
    const prodcustQuantity = 100;
    const products = [];
  
    for (let i = 0; i <= prodcustQuantity; i++) {
      products.push(generateProducts());
    }
  
    return products;
  };