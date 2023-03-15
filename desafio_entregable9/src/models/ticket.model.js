import mongoose, { Schema, model } from "mongoose";

const generateCode = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  let result = " ";
  const charactersLength = characters.length;
  for (let i = 0; i < 12; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
};

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