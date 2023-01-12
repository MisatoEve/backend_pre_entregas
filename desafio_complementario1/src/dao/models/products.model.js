import mongoose from "mongoose";

const productsCollection = "products";

const productsSchema = new mongoose.Schema({
  title: String,
  description: String,
  code: String,
  price: Number,
  status: Boolean,
  stock: Number,
  category: String,
  thumbnail: [String],
});

const ProductsModel = mongoose.model(productsCollection, productsSchema);

export default ProductsModel;