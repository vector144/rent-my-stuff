import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generateToken from "../utils/generateToken.js";
import { RoleLabels } from "../enums/roles.enum.js";
import getTokenFromHeader from "../utils/getTokenFromHeader.js";
import BlackList from "../models/blackList.model.js";
import { sendResponse } from "../utils/responseFormatter.js";

export const register = async (req, res) => {
  const { name, password, email } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(400);
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });
  const payload = {
    id: user.id,
    email: user.email,
    role: user.role,
    roleLabel: RoleLabels[user.role],
  };

  res.status(201).json({
    ...payload,
    token: generateToken(payload),
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid Password");
  }
  const payload = {
    id: user.id,
    email: user.email,
    role: user.role,
    roleLabel: RoleLabels[user.role],
  };
  return sendResponse(
    res,
    {
      ...payload,
      token: generateToken(payload),
    },
    "Login successful"
  );
};

export const allUsers = async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
};

export const getUser = async (req, res) => {
  res.status(200).json(req.user);
};

export const logout = async (req, res) => {
  const token = await getTokenFromHeader(req);
  const decoded = jwt.decode(token);
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
  console.log("Decoded Token:", decoded, token);
  if (!decoded || !decoded.exp) {
    throw new Error("Invalid Token");
  }
  const expiry = new Date(decoded.exp * 1000);

  await BlackList.create({ token, expiresAt: expiry });
  // Store the token in the blacklist
  // This will prevent the token from being used in future requests
  res.status(200).json({ message: "Logged out successfully" });
};
