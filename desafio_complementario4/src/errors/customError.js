export default class CustomError {
    static createError({ name = "Error", message }) {
      const error = new Error(message);
      error.name = name;
      throw error;
    }
  }