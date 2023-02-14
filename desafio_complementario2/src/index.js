import express from "express";
import handlebars from "express-handlebars";
import connectMongo from "./mongo.js";
import passport from "passport";
import cookieParser from "cookie-parser";
import __dirname from "./utils.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import productsRouter from "./routes/products.routes.js";
import cartRouter from "./routes/carts.routes.js";
import userRouter from "./routes/users.routes.js";
import viewsRouter from "./routes/views.routes.js";
import initializePassport from "./config/passport.config.js";
import sessionRouter from "./routes/sessions.routes.js";

//▼Const 
const app = express();
const PORT=8080
const MONGO_URI="mongodb+srv://MisatoEve:TzpNVY31PQRUs8r5@cluster0.dai9pol.mongodb.net/?retryWrites=true&w=majority"
const MONGO_DB="Ecommerce"
const SESSION_SECRET="amongus"
const COOKIE_SECRET='amongus333'

//▼Init mongoDB
connectMongo();

//▼Passport
initializePassport();

//▼Handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

//▼Middlewares
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: MONGO_URI,
      dbName: MONGO_DB,
      mongoOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      ttl: 200,
    }),
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + "/public"));
app.use(cookieParser(COOKIE_SECRET));

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