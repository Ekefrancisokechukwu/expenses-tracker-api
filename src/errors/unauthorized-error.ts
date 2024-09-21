import CustomeError from "./customApi-error.js";

class UnauthorizedError extends CustomeError {
  statusCode: number;
  constructor(message: string) {
    super(message);
    this.statusCode = 403;
  }
}

export default UnauthorizedError;
