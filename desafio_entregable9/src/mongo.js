import { connect, set } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export default class MongoConnection {
  static #instance;

  constructor() {
    set("strictQuery", false);
    connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: process.env.MONGO_DB,
    });
  }

  static getInstance = () => {
    if (this.#instance) {
      console.log("Already connected to MongoDB");

      return this.#instance;
    }

    this.#instance = new MongoConnection();
    console.log("Connected to MongoDB");

    return this.#instance;
  };
}