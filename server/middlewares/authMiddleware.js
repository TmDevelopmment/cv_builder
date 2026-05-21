import jwt from "jsonwebtoken";

const protect = (req, res, next) => {

    const token = req.headers.authorization

    if (!token) {
        return res.status(401).json({ message: "Not authorized, no token" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        next();
    } catch (error) {
        console.error("Token verification error:", error);
        return res.status(401).json({ message: "Unauthorized" });
    }
}

export default protect;