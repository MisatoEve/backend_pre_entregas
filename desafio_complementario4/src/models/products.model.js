import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const Schema = mongoose.Schema;

const productsSchema = new Schema({
  title: String,
  description: String,
  code: String,
  price: Number,
  status: {
    type: Boolean,
    default: true,
  },
  stock: {
    type: Number,
    index: true,
    default: 0,
  },
  category: {
    type: String,
    index: true,
  },
  thumbnails: {
    type: Array,
    index: true,
    default: [],
  },
  owner: {
    type: String,
    default: "ADMIN",
  },
});

productsSchema.plugin(mongoosePaginate);

export const productsModel = mongoose.model("Products", productsSchema);