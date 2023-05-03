import express from "express";
import { authPolicies, authToken } from "../../utils/jwt.js";
import { getChatPage } from "../controllers/messages.controller.js";

const Router = express.Router();

Router.get("/", authToken, authPolicies("USER"), getChatPage);

export default Router;