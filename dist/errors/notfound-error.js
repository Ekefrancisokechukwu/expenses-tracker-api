import CustomeError from "./customApi-error.js";
class NotFoundError extends CustomeError {
    constructor(message) {
        super(message);
        this.statusCode = 404;
    }
}
export default NotFoundError;
//# sourceMappingURL=notfound-error.js.map