import { fileURLToPath } from "url";
import { dirname } from "path";
import MongoStore from "connect-mongo";
import dotenv from "dotenv";
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;

export const MongoStoreInstance = {
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    dbName: process.env.MONGO_DB,
    mongoOptions: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    ttl: 200,
  }),
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
};