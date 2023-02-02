import { connect, set } from "mongoose";

export const connectDB = async () => {
  try {
    set("strictQuery", false);
    await connect("mongodb+srv://MisatoEve:TzpNVY31PQRUs8r5@cluster0.dai9pol.mongodb.net/?retryWrites=true&w=majority", { dbName: "Ecommerce" });

    console.log("Connected to DB");
  } catch (error) {
    console.log(error);
  }
};