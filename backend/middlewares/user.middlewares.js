import jwt from "jsonwebtoken";
import { HTTP_STATUS, ERROR_MESSAGES } from "../utils/const.js";
const { ACCESS_TOKEN_SECRET, GOOGLE_API_TOKEN } = process.env;


const createAccountMiddleware = async (req, res, next) => {
  const { fullName, email, password } = req.body;

  // fullname validations
  if (!fullName || fullName.trim() === "") {
    return res
      .status(HTTP_STATUS.BAD_REQUEST)
      .json({ error: true, message: ERROR_MESSAGES.NAME_REQUIRED });
  }
  const nameRegex = /^[A-Za-z]+(?: [A-Za-z]+)*$/;
  if (!nameRegex.test(fullName)) {
    return res
      .status(HTTP_STATUS.BAD_REQUEST)
      .json({ error: true, message: ERROR_MESSAGES.INVALID_NAME_FORMAT });
  }

  // email validations
  if (!email || email.trim() === "") {
    return res
      .status(HTTP_STATUS.BAD_REQUEST)
      .json({ error: true, message: ERROR_MESSAGES.EMAIL_REQUIRED });
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res
      .status(HTTP_STATUS.BAD_REQUEST)
      .json({ error: true, message: ERROR_MESSAGES.INVALID_EMAIL_FORMAT });
  }

  // password validaitons
  if (!password || password.trim() === "") {
    return res
      .status(HTTP_STATUS.BAD_REQUEST)
      .json({ error: true, message: ERROR_MESSAGES.PASSWORD_REQUIRED });
  }
  if (!/[A-Z]/.test(password)) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      error: true,
      message: ERROR_MESSAGES.PASSWORD_UPPERCASE_REQUIRED,
    });
  }
  if (!/[a-z]/.test(password)) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      error: true,
      message: ERROR_MESSAGES.PASSWORD_LOWERCASE_REQUIRED,
    });
  }
  if (!/[!"#$%&'()*+,-.:;<=>?@[\]^_`{|}~]/.test(password)) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      error: true,
      message: ERROR_MESSAGES.PASSWORD_SPECIAL_CHAR_REQUIRED,
    });
  }
  if (!(password.length >= 8)) {
    return res
      .status(HTTP_STATUS.BAD_REQUEST)
      .json({ error: true, message: ERROR_MESSAGES.PASSWORD_MIN_LENGTH });
  }

  next();
};

const authenticationToken = (req, res, next) => {
  // console.log(req.headers)
  const token = req.headers["authorization"].split(" ")[1];
  // console.log("Authorization header:", token); // Log the token for debugging

  if (!token) {
    return res.status(403).json({ message: "No token provided." });
  }

  jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.error("Token verification error:", err); // Log the error
      return res.status(403).json({ message: "Token verification failed." });
    }
    req.user = user; // Attach user data to the request object
    next(); // Proceed to the next middleware/route handler
  });
};

export { createAccountMiddleware, authenticationToken };
