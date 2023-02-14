import express from "express";
import { getCurrentUser } from "../controllers/users.controllers.js";
import { authToken, passportCall } from "../utils/jwt.js";

const Router = express.Router();

Router.get("/current", authToken, getCurrentUser);

export default Router;