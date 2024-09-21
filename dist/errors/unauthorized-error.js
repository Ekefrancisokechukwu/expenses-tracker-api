import CustomeError from "./customApi-error.js";
class UnauthorizedError extends CustomeError {
    constructor(message) {
        super(message);
        this.statusCode = 403;
    }
}
export default UnauthorizedError;
//# sourceMappingURL=unauthorized-error.js.map