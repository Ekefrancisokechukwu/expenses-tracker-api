import CustomeError from "./customApi-error.js";

class NotFoundError extends CustomeError {
  statusCode: number;
  constructor(message: string) {
    super(message);
    this.statusCode = 404;
  }
}

export default NotFoundError;
