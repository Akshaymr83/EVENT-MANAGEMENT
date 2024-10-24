const jwt = require("jsonwebtoken");
const User = require("../models/Clients/User");

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

const authenticateToken = async (req, res, next) => {
    const token = req.headers["authorization"]; // Assuming token is passed in Authorization header

    if (!token) {
        return res.status(403).json({
            status: "Failed",
            message: "Access denied, token missing",
        });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(decoded.userId);

        // Check if the token matches the user's current token
        if (!user || user.currentToken !== token) {
            return res.status(403).json({
                status: "Failed",
                message: "Invalid session, please log in again",
            });
        }

        // Attach user info to request object
        req.user = user;
        next(); // Continue to the next middleware or route
    } catch (error) {
        console.error(error);
        res.status(401).json({
            status: "Failed",
            message: "Invalid token or session expired",
        });
    }
};

module.exports = authenticateToken;
