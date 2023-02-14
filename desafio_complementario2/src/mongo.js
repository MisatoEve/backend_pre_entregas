import { connect, set } from "mongoose";

const MONGO_URI="mongodb+srv://MisatoEve:TzpNVY31PQRUs8r5@cluster0.dai9pol.mongodb.net/?retryWrites=true&w=majority"
const MONGO_DB="Ecommerce"

const connectMongo = async () => {
  try {
    set("strictQuery", false);
    await connect(MONGO_URI, { dbName: MONGO_DB });

    console.log("Connected to mongoDB");
  } catch (error) {
    console.log(error);
  }
};

export default connectMongo;