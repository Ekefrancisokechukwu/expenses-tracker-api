import CustomeError from "./customApi-error.js";

class BadRequestError extends CustomeError {
  statusCode: number;
  constructor(message: string) {
    super(message);
    this.statusCode = 400;
  }
}

export default BadRequestError;
