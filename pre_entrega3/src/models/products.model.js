import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const Schema = mongoose.Schema;

const productsSchema = new Schema({
  title: String,
  description: String,
  code: String,
  price: Number,
  status: Boolean,
  stock: {
    type: Number,
    index: true,
  },
  category: {
    type: String,
    index: true,
  },
  thumbnails: {
    type: Array,
    index: true,
  },
});

productsSchema.plugin(mongoosePaginate);

export const productsModel = mongoose.model("Products", productsSchema);