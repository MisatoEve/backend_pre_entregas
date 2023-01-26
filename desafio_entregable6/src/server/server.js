import express from "express";
import handlebars from "express-handlebars";
import { connectDB } from "./mongo/mongo.js";
import __dirname from "../dirname.js";
import bodyParser from "body-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import auth from "../utils/auth.js";
import {
  authRouter,
  cartsRouter,
  productsRouter,
  viewsRouter,
} from "../routes/index.js";

//▼const
const app = express();
const PORT=8080
const MONGOOSE_URI="mongodb+srv://MisatoEve:TzpNVY31PQRUs8r5@cluster0.dai9pol.mongodb.net/?retryWrites=true&w=majority"

//▼mongo connect
connectDB();

//▼public folder config and middlewares
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: MONGOOSE_URI,
      dbName: "Ecommerce",
      mongoOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      ttl: 200,
    }),
    secret: "amongus",
    resave: true,
    saveUninitialized: true,
  })
);

//▼handlebars config
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

//▼routes
app.use("/", authRouter);
app.use("/home", auth, viewsRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

//▼server
app.listen(PORT, () => {
  console.log(`Server running on port" ${PORT}`);
});