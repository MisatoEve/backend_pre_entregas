import express from "express";
import { Server } from "socket.io";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import mongoose from "mongoose";
import viewsRouter from "./routes/viewsRouter.js";

const app = express();
const PORT = 8080 || 3000;
const httpServer = app.listen(PORT, () => {
  console.log(`Server runnign on port: ${PORT}`);
});
const io = new Server(httpServer);

//setup public
app.use(express.static(__dirname + "/public"));

// setup handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// router setup
app.use("/", viewsRouter);

// socket global use
app.use((req, res, next) => {
  req.io = io;
});

io.on("connected", (socket) => {
  console.log("new client connected");
});

mongoose.connect(
    "mongodb+srv://MisatoEve:TzpNVY31PQRUs8r5@cluster0.dai9pol.mongodb.net/?retryWrites=true&w=majority",
  (error) => {
    if (error) {
      console.log(error);
      process.exit();
    }
  }
);