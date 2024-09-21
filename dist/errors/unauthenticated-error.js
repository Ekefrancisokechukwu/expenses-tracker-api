import CustomeError from "./customApi-error.js";
class UnAuthenticatedError extends CustomeError {
    constructor(message) {
        super(message);
        this.statusCode = 401;
    }
}
export default UnAuthenticatedError;
//# sourceMappingURL=unauthenticated-error.js.map