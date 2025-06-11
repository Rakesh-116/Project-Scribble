import User from "../models/User.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

// Controller for user registration
const registerUserController = async (req, res) => {
  const { username, email, password } = req.body;

  console.log("Registering user:", { username, email, password });
  // Validate input
  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new user
  const newUser = new User({
    name: username,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error saving user:", error);
    return res.status(500).json({ message: "Error saving user" });
  }
};

const loginUserController = async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  // Find user by email
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "User does not exist" });
  }

  // Check password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid password" });
  }
  // Respond with user data (excluding password)
  const { password: _, ...userData } = user.toObject();
  return res.status(200).json({ userData, message: "Login successful" });
};

const fetchUserController = async (req, res) => {};

export { registerUserController, loginUserController, fetchUserController };
