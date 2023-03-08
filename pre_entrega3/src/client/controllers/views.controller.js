import { ProductsService } from "../../products/services/products.services.js";
import UserService from "../../users/services/users.services.js";
import { CartServices } from "../../carts/services/carts.services.js";

export const getAllProducts = async (req, res) => {
  try {
    const { query, limit, sort, page } = req.query;

    const options = {
      limit: limit || 10,
      page: page || 1,
      sort: { price: sort } || { price: 1 },
      lean: true,
    };

    const response = await ProductsService.getAllProducts(query, options);

    const user = req.session.user;

    res.render("home", {
      style: "styles.css",
      response,
      user,
    });
  } catch (error) {
    res.render("error");
  }
};

export const getOneProduct = async (req, res) => {
  try {
    const { pid } = req.params;

    const response = await ProductsService.getProductById(pid);

    const user = req.session.user;

    res.render("oneProduct", {
      style: "styles.css",
      response,
      user,
    });
  } catch (error) {}
};

export const getAdmin = async (req, res) => {
  try {
    const role = req.session.user.role;

    const users = await UserService.finAll();

    if (role === "admin") {
      return res.render("admin", {
        style: "styles.css",
        users,
      });
    }

    return res.redirect("/home/products");
  } catch (error) {}
};

export const getErrorPage = (req, res) => {
  try {
    return res.render("error");
  } catch (error) {
    console.log(error);
  }
};

export const getCartPage = async (req, res) => {
  try {
    const { cid } = req.params;

    const user = req.params;

    const result = await CartServices.getCartById(cid);
    res.render("cart", {
      cart: result,
      user,
    });
  } catch (error) {
    console.log(error);
  }
};