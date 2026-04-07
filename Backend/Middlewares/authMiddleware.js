import jwt from "jsonwebtoken";
import User from "../Models/User.js";

export const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Token failed" });
  }
};

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Access Denied",
      });
    }
    next();
  };
};

export const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};

export const notFound = (req, res, next) => {
  res.status(404).json({
    message: `Route not found: ${req.originalUrl}`,
  });
};
