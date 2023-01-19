import { connect, set } from "mongoose";
//import { config } from "dotenv";

//const process = config().parsed;
//const { MONGOOSE_URI } = process;
const MONGOOSE_URI="mongodb+srv://MisatoEve:TzpNVY31PQRUs8r5@cluster0.dai9pol.mongodb.net/?retryWrites=true&w=majority"

export const connectDB = async () => {
  try {
    set("strictQuery", false);
    await connect(MONGOOSE_URI, { dbName: "Ecommerce" });

    console.log("Connected to DB");
  } catch (error) {
    console.log(error);
  }
};