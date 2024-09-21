import { isTokenvalid } from "../utils/jwt.js";
import UnAuthenticatedError from "../errors/unauthenticated-error.js";
const isCustomJwtPayload = (payload) => {
    return (payload &&
        typeof payload === "object" &&
        "email" in payload &&
        "name" in payload &&
        "id" in payload);
};
const authenticateUser = (req, res, next) => {
    const token = req.signedCookies.token;
    if (!token) {
        return next(new UnAuthenticatedError("No token, authorization denied"));
    }
    try {
        const decodedToken = isTokenvalid(token);
        if (!isCustomJwtPayload(decodedToken)) {
            return next(new UnAuthenticatedError("Invalid token"));
        }
        req.user = {
            name: decodedToken.name,
            email: decodedToken.email,
            id: decodedToken.id,
        };
        next();
    }
    catch (err) {
        next(new UnAuthenticatedError("Invalid token"));
    }
};
export { authenticateUser };
//# sourceMappingURL=auth.js.map