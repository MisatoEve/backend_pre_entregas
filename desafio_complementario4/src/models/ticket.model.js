import { Schema, model } from "mongoose";
import { generateCode } from "../utils.js";

const ticketSchema = new Schema({
  id: Schema.Types.ObjectId,
  code: {
    type: String,
    default: generateCode(),
    unique: true,
  },
  amount: Number,
  purchaser: String,
});

ticketSchema.set("timestamps", {
  createdAt: "purchased_datetime",
});

const ticketModel = model("Tickets", ticketSchema);

export default ticketModel;