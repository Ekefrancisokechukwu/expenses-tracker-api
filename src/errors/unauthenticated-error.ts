import CustomeError from "./customApi-error.js";

class UnAuthenticatedError extends CustomeError {
  statusCode: number;
  constructor(message: string) {
    super(message);
    this.statusCode = 401;
  }
}

export default UnAuthenticatedError;
