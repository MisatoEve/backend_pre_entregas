import { ERRORS } from "../consts/ERRORS.js";

export class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = ERRORS.NOT_FOUND_ERROR;
  }
}

export class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = ERRORS.VALIDATION_ERROR;
  }
}

export class CodeRepeatedErrror extends Error {
  constructor(message) {
    super(message);
    this.name = ERRORS.CODE_REPEAT_ERROR;
  }
}