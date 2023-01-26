import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userCollection = "Users";

const userSchema = new Schema({
  first_name: String,
  last_name: String,
  email: {
    type: String,
    unique: true,
  },
  age: Number,
  password: String,
  cart: {
    type: Schema.Types.ObjectId,
    ref: "Carts",
  },
  role: {
    type: String,
    default: "user",
  },
});

const userModel = mongoose.model(userCollection, userSchema);

export default userModel;