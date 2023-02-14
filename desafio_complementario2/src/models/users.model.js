import mongoose from "mongoose";
import bcrypt from "bcrypt";

const Schema = mongoose.Schema;

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

userSchema.statics.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);

  return await bcrypt.hash(password, salt);
};

userSchema.statics.comparePassword = async (password, recivedPassword) => {
  return await bcrypt.compare(password, recivedPassword);
};

const userModel = mongoose.model("User", userSchema);

export default userModel;