import { ERRORS } from "../consts/errors.js";

export class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = ERRORS.NOT_FOUND_ERROR;
  }
}

export class InputsValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = ERRORS.INPUT_VALIDATION_ERROR;
  }
}