import { ERRORS } from "../consts/index.js";

export class CodeValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = ERRORS.CODE_VALIDATION_ERROR;
  }
}

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