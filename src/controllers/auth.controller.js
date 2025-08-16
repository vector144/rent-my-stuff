import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
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
    eamil,
    password: hashedPassword,
  });
  res.status(201).json({
    _id: user.id,
    email: user.email,
  });
};

export const login= async (req,res)=>{
  const { email, password } = req.body;

  const user = await User.findOne({email});
  if(!user){
    throw new Error("User not found")
  }
}