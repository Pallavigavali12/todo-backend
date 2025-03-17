import jwt from "jsonwebtoken";

const secretKey = "674r8fhefrnjgktkn"; // Store this securely in environment variables

export const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access Denied! No token provided." });
  }

  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), secretKey);
    req.user = decoded.user; // Store decoded user data in request object
    console.log(req.user);
    next(); // Pass control to the next middleware or route handler
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token." });
  }
};
