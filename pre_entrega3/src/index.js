import express from "express";
import dotenv from "dotenv";
import handlebars from "express-handlebars";
import passport from "passport";
import cookieParser from "cookie-parser";
import __dirname, { MongoStoreInstance } from "./utils.js";
import session from "express-session";
import productsRouter from "./products/routes/products.routes.js";
import cartRouter from "./carts/routes/carts.routes.js";
import userRouter from "./users/routes/users.routes.js";
import viewsRouter from "./client/routes/views.routes.js";
import initializePassport from "./config/passport.config.js";
import sessionRouter from "./users/routes/sessions.routes.js";
import MongoConnection from "./mongo.js";

//▼Const and env variables
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

//▼Init mongoDB
MongoConnection.getInstance();

//▼Passport
initializePassport();

//▼Handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

//▼Middlewares
app.use(session(MongoStoreInstance));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + "/public"));
app.use(cookieParser(process.env.COOKIE_SECRET));

//▼Routers
app.use("/api/products", productsRouter);
app.use("/api/carts", cartRouter);
app.use("/api/sessions", sessionRouter);
app.use("/", userRouter);
app.use("/", viewsRouter);

//▼App.listen
app.listen(PORT, () => {
  console.log("Server up!");
});