import mongoose, { Schema, model } from "mongoose";

const ticketSchema = new Schema({
  id: Schema.Types.ObjectId,
  code: {
    type: String,
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