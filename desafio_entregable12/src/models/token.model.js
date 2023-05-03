import { Schema, model } from "mongoose";

const tokenSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  token: {
    type: String,
    required: true,
  },
  expireAt: {
    type: Date,
    default: new Date(),
    expires: 3600,
  },
});

const tokenModel = model("Token", tokenSchema);

export default tokenModel;