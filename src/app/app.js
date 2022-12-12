import fs from "fs";
//import { ERRORS } from "../consts/index.js";
import { NotFoundError, CodeValidationError, InputsValidationError } from "../utils/error-utils.js";

export class ProductManager {
  constructor(path) {
    this.path = path;
    this.#init();
  }

  #init = () => {
    try {
      const existFile = fs.existsSync(this.path);
      if (existFile) return;
      fs.writeFileSync(this.path, JSON.stringify([]));
    } catch (error) {
      console.log(error);
    }
  };

  #writeFile = async (data) => {
    return fs.promises.writeFile(this.path, JSON.stringify(data, null, 3));
  };

  getProductId = async () => {
    const productsCopy = await this.getProducts();
    const index = productsCopy.length;
    const id = index > 0 ? index + 1 : 1;
    return id;
  };

  validateInputs = ({
    title,
    description,
    code,
    price,
    stock,
    category,
    thumbnail,
  }) => {
    return (
      title.trim().length > 0 &&
      category.trim().length > 0 &&
      description.trim().length > 0 &&
      thumbnail.length > 0 &&
      code.trim().length > 0 &&
      price.toString().trim().length > 0 &&
      stock.toString().trim().length > 0 &&
      price > 0 &&
      stock > 0
    );
  };

  verifyCode = async (productCode) => {
    const productsCopy = await this.getProducts();
    const isInDb = productsCopy.some((product) => product.code === productCode);
    return isInDb;
  };

  addProduct = async ({
    title,
    description,
    code,
    price,
    stock,
    category,
    thumbnail,
  }) => {
    const id = await this.getProductId().then((id) => id);

    const newProduct = {
      id,
      title,
      description,
      code,
      price,
      state: true,
      stock,
      category,
      thumbnail,
    };

    if (!this.validateInputs({ ...newProduct })) {
      throw new InputsValidationError("Complete todos los campos");
    }

    const codeIsVerify = await this.verifyCode(newProduct.code);
    if (codeIsVerify) {
      throw new CodeValidationError("El codigo esta repetido");
    }

    const products = await this.getProducts();
    products.push(newProduct);
    await this.#writeFile(products);
    return newProduct;
  };

  getProducts = async () => {
    const response = await fs.promises.readFile(this.path, "utf-8");
    return JSON.parse(response);
  };

  getProductById = async (productId) => {
    const prodcuts = await this.getProducts();
    const searchedProduct = prodcuts.find((product) => product.id === productId);
    return searchedProduct;
  };

  updateProduct = async (productId, productUpdated) => {
    const allProducts = await this.getProducts();
    const productToUpdateIndex = allProducts.findIndex((product) => product.id === productId);

    if (productToUpdateIndex === -1) {throw new NotFoundError("Producto no encontrado")}

    const productToUpdate = allProducts[productToUpdateIndex];

    allProducts[productToUpdateIndex] = {
      ...productToUpdate,
      ...productUpdated,
    };

    await this.#writeFile(allProducts);
    return allProducts[productToUpdateIndex];
  };

  deleteProduct = async (productId) => {
    const allProducts = await this.getProducts();
    const productToDeleteIndex = allProducts.findIndex((product) => product.id === productId);

    if (productToDeleteIndex === -1) {throw new NotFoundError("(!) Producto no encontrado")}

    const productsUpdated = allProducts.splice(productToDeleteIndex, 1);

    await this.#writeFile(allProducts);
    return productsUpdated[0];
  };

  //▼Lógica Cart▼
  #getAllCarts = async () => {
    const resolve = await fs.promises.readFile(this.path, "utf-8");
    return JSON.parse(resolve);
  };

  getCart = async (cartId) => {
    const allCarts = await this.#getAllCarts();
    const cartCreated = allCarts.find((cart) => cart.id === cartId);
    return cartCreated;
  };

  createCart = async () => {
    const allCarts = await this.#getAllCarts();
    const id = !allCarts.length ? 1 : allCarts[allCarts.length - 1].id + 1;
    const newCart = {
      id,
      products: [],
    };

    allCarts.push(newCart);
    await this.#writeFile(allCarts);
    return newCart;
  };

  addProductToCart = async (cid, pid) => {
    const allCarts = await this.#getAllCarts();
    const selectedCart = allCarts.find((cart) => cart.id === cid);

    if (!selectedCart) {throw new NotFoundError("(!) Cart not found")}

    const selectedProduct = await this.getProductById(pid);

    if (!selectedProduct) {throw new NotFoundError("(!) Product not found")}

    const productExist = selectedCart.products.some((product) => product.id === pid);

    if (productExist) {
      const addCountToProduct = selectedCart.products.find((product) => product.id === selectedProduct.id);

      console.log(addCountToProduct);

      addCountToProduct.quantity++;

      await this.#writeFile(allCarts);
      return selectedCart
    }

    selectedCart.products.push({
      id: selectedProduct.id,
      quantity: 1,
    });

    await this.#writeFile(allCarts);
    return selectedCart;
  };
}