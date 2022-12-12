import express from "express";
import productManagerRouter from "../routes/ProductsManager.js";
import cartManagerRouter from "../routes/CartsManager.js";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products/", productManagerRouter);
app.use("/api/products/:pid", productManagerRouter);

app.use("/api/carts/", cartManagerRouter);
app.use("/api/carts/:cid", cartManagerRouter);
app.use("/api/carts/:cid/product/:pid", cartManagerRouter);

app.listen(PORT, () => {
  console.log(`Server listening port: ${PORT}`);
});