import fs from "fs";

class ProductManager {
  constructor(path) {
    this.path = path;
    this.#init();
    this.#initCarts();
  }

  // Cuando se inicia la clase verifica que exista un archivo y sino crea uno
  #init = () => {
    try {
      const existFile = fs.existsSync(this.path);

      if (existFile) return;

      fs.writeFileSync(this.path, JSON.stringify([]));
    } catch (error) {
      console.log(error);
    }
  };

  getIndex = async () => {
    const products = await this.getProducts();

    const index = products.length;

    const id = index > 0 ? index + 1 : 1;

    return id;
  };

  #verifyCode = async (code) => {
    const products = await this.getProducts();

    const isValid = products.some((product) => product.code === code);

    return isValid;
  };

  getProducts = async () => {
    const products = await fs.promises.readFile(this.path, "utf-8");

    return JSON.parse(products);
  };

  getProductById = async (id) => {
    const products = await this.getProducts();

    const findProduct = products.findIndex((product) => product.id === id);

    if (findProduct === -1) {
      throw new NotFoundError("PRODUCT NOT FOUND");
    }

    return products[findProduct];
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
    if (!title && !description && !code && !price && !stock && !category) {
      throw new ValidationError("FILL ALL THE INPUTS");
    }

    const codeVerification = await this.#verifyCode();

    if (codeVerification) {
      throw new ValidationError("THE CODE IS REPEATED");
    }

    const id = await this.getIndex();

    if (!id) {
      throw new Error("AN ERRORS HAS OCURRED");
    }

    const newProduct = {
      id,
      title,
      description,
      code,
      price,
      stock,
      category,
      status: true,
      thumbnail,
    };

    const products = await this.getProducts();

    products.push(newProduct);

    await fs.promises.writeFile(this.path, JSON.stringify(products, null, 3));

    return {
      message: "Products added succesfully",
    };
  };

  updateProduct = async (productId, updatedProduct) => {
    const products = await this.getProducts();

    const findProductIndex = products.findIndex(
      (product) => product.id === productId
    );

    if (findProductIndex === -1) {
      throw new NotFoundError("PRODUCT NOT FOUND");
    }

    const originalProduct = products[findProductIndex];

    products[findProductIndex] = {
      ...originalProduct,
      ...updatedProduct,
    };

    await fs.promises.writeFile(this.path, JSON.stringify(products, null, 3));

    return products[findProductIndex];
  };

  deleteProduct = async (id) => {
    const products = await this.getProducts();

    const findProductIndex = products.findIndex((product) => product.id === id);

    if (findProductIndex === -1) {
      throw new NotFoundError("PRODUCT NOT FOUND");
    }

    const listUpdated = products.splice(findProductIndex, 1);

    await fs.promises.writeFile(this.path, JSON.stringify(products, null, 3));

    return listUpdated[0];
  };

  // cart logic
  #initCarts = () => {
    const existFile = fs.existsSync(this.path);

    if (existFile) return;

    fs.writeFileSync(this.path, JSON.stringify([]));
  };

  #getCarts = async () => {
    const carts = await fs.promises.readFile(this.path, "utf-8");

    return JSON.parse(carts);
  };

  #getCartId = async () => {
    const carts = await this.#getCarts();

    const index = carts.length;

    const id = index > 0 ? index + 1 : 1;

    return id;
  };

  createCart = async () => {
    const carts = await this.#getCarts();

    const id = await this.#getCartId();

    const newCart = {
      id,
      products: [],
    };

    carts.push(newCart);

    await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 3));

    return newCart;
  };

  getCartById = async (id) => {
    const carts = await this.#getCarts();

    const findCart = carts.findIndex((cart) => cart.id === id);

    if (findCart === -1) {
      throw new NotFoundError("CART NOT FOUND");
    }

    return carts[findCart];
  };

  addProductToCart = async (cid, pid) => {
    const carts = await this.#getCarts();

    const cartIndex = carts.findIndex((cart) => cart.id === cid);

    if (cartIndex === -1) {
      throw new NotFoundError("CART NOT FOUND");
    }

    const cart = carts[cartIndex];

    const products = await this.getProducts();

    const productIndex = products.findIndex((product) => product.id === pid);

    if (productIndex === -1) {
      throw new NotFoundError("PRODUCT NOT FOUND");
    }

    const isProductInCart = cart.products.some(
      (product) => product.id === productIndex
    );

    if (isProductInCart) {
      cart.products[productIndex].quantity++;

      await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 3));

      return cart;
    }

    cart.products.push({
      id: productIndex,
      quantity: 1,
    });

    await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 3));

    return cart;
  };
}

export default ProductManager;