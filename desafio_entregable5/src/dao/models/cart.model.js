import mongoose from "mongoose";
import { misatoCollection } from "../../consts/collections.js";

const cartSchema = new mongoose.Schema({
  id: String,
  products: [
    {
      id: String,
      quantity: Number,
    },
  ],
});

export const CartModel = mongoose.model("products", cartSchema);