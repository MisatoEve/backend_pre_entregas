import mongoose from "mongoose";

const Schema = mongoose.Schema;

const cartSchema = new Schema({
  carts: {
    type: [
      {
        product: {
          type: mongoose.Types.ObjectId,
          ref: "Products",
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    default: [],
  },
});

const cartsModel = mongoose.model("Carts", cartSchema);

export default cartsModel;