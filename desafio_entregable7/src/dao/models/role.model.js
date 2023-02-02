import { Schema, model } from "mongoose";

const ROLES = ["user", "admin", "moderator"];

const roleCollection = "Role";

const roleSchema = new Schema({
  name: String,
});

export default model(roleCollection, roleSchema);