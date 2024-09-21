import UnauthorizedError from "../errors/unauthorized-error.js";
// check if the user trying to access the route is the owner
const checkUserpermissions = (currentUserId, requestUserId) => {
    if (currentUserId === requestUserId)
        return;
    throw new UnauthorizedError("Access denied");
};
export default checkUserpermissions;
//# sourceMappingURL=checkUserPermission.js.map