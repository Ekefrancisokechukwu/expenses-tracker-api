import CustomeError from "./customApi-error.js";
class BadRequestError extends CustomeError {
    constructor(message) {
        super(message);
        this.statusCode = 400;
    }
}
export default BadRequestError;
//# sourceMappingURL=bad-request.js.map