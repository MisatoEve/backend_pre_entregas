import mongoose from "mongoose";
import { misatoCollection } from "../../consts/collections.js";

const productsSchema = new mongoose.Schema({
  id: String,
  title: String,
  description: String,
  code: String,
  price: Number,
  stock: Number,
  category: String,
  thumbnail: [String],
});

export const ProductsModel = mongoose.model("products", productsSchema);