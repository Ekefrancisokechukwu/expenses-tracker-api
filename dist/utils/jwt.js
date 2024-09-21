import jwt from "jsonwebtoken";
const createToken = (payload) => {
    const secretKey = process.env.JWT_SECRET;
    const options = { expiresIn: "1d" };
    const token = jwt.sign(payload, secretKey, options);
    return token;
};
const isTokenvalid = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    }
    catch (err) {
        throw new Error("Invalid token");
    }
};
const attachcookiesToResponse = (res, tokenUser) => {
    const token = createToken(tokenUser);
    const oneDay = 1000 * 60 * 60 * 24;
    res.cookie("token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + oneDay),
        secure: process.env.NODE_ENV === "production",
        signed: true,
    });
    return token;
};
export { attachcookiesToResponse, isTokenvalid };
//# sourceMappingURL=jwt.js.map