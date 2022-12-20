import express from "express";
import handlebars from "express-handlebars";
import { __dirname } from "../utils_dirname.js";
import { PORT } from "../const/port.js";
import { ProductRouter, CartRouter, ViewsRouter } from "../routers/index.js";
import { Server } from "socket.io";

const app = express();

// app server 
const httpServer = app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
const socketServer = new Server(httpServer);

// middlewares sockets
app.use((req, res, next) => {
  req.io = socketServer;

  return next();
});

// handlebars setup
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

// html public folder setup
app.use(express.static(__dirname + "/public"));

// express middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes path setup
app.use("/api/products", ProductRouter);
app.use("/api/products/:pid", ProductRouter);

// cart routes
app.use("/api/carts", CartRouter);
app.use("/api/carts/:cid", CartRouter);
app.use("/api/carts/:cid/products/:pid", CartRouter);

socketServer.on("connection", (socket) => {
  console.log("Client connected");
});

// views routes
app.use("/", ViewsRouter);