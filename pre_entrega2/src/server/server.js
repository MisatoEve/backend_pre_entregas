import express from "express";
import handlebars from "express-handlebars";
import { connectDB } from "./mongo/mongo.js";
//import { config } from "dotenv";
import __dirname from "../dirname.js";
import productsRouter from "../routes/productsRouter.js"
import cartsRouter from "../routes/cartsRouter.js"
import viewsRouter from "../routes/viewsRouter.js"

//const

const app = express();
const PORT=8080
//const process = config().parsed;
//const { PORT } = process;

//server
app.listen(PORT, () => {
  console.log(`Server running on port" ${PORT}`);
});

//mongo connect
connectDB();

//public folder config and middlewares
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//handlebars config
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

//routes
app.use("/products", viewsRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);