import { ERRORS_ENUM } from "../../consts/index.js";

export const errorHandler = (error, req, res, next) => {
  console.log(`El error es: ${error}`);

  const errorMessage = ERRORS_ENUM[error.name] || "Unhandled error";

  res.send({
    status: "Error",
    error: errorMessage,
  });
};