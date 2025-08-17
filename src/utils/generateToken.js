// src/utils/generateToken.js
import dotenv from "dotenv";

dotenv.config();
import jwt from "jsonwebtoken";

const generateToken = (payload) => {
  return jwt.sign(
    { ...payload }, // payload
    process.env.JWT_SECRET, // secret key (store in .env)
    { expiresIn: "7d" } // token expiry
  );
};

export default generateToken;
