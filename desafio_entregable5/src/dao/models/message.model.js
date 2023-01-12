import mongoose from "mongoose";
import { misatoCollection } from "../../consts/collections.js";

const messageSchema = new mongoose.Schema({
  id: String,
  message: String,
  author: String,
  likes: Number,
});

export const MessageModel = mongoose.model(misatoCollection, messageSchema);