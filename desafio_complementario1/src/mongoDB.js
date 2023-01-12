import { connect } from "mongoose";

const MONGOOSE_URI="mongodb+srv://MisatoEve:TzpNVY31PQRUs8r5@cluster0.dai9pol.mongodb.net/?retryWrites=true&w=majority"
export const connectDB = async () => {
  try {
    await connect(MONGOOSE_URI, { dbName: 'Ecommerce' });
    console.log("Connected to db!");
  } catch (error) {
    console.error(error);
  }
};