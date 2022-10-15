const { AUTH_SECRET } = require("../configs/index");
const jwt = require("jsonwebtoken");

// User Token Authentication
const validateToken = async (req, res, next) => {
  try {
    // User token access verification
    if (!req.header("authorization")) {
      return res.status(403).json({ msg: "Unauthorized access" });
    }

    // Obtaining the user token through the header
    const token = req.header("authorization").split(" ")[1];

    // Verifying the existence of the token
    if (!token) {
      return res.status(403).json({
        msg: "user not logged in",
      });
    }

    // Checking token validation
    jwt.verify(token, AUTH_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          msg: "Invalid token",
        });
      } else {
        req.user = decoded;
        return next();
      }
    });
  } catch (e) {
    return res.status(500).json({
      msg: "Internal Error",
    });
  }
};

module.exports = { validateToken };
