const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { Customer } = require("../models/customer");
const JWT_SECRET = process.env.SECRET_KEY;

const AuthController = module.exports;

AuthController.signUp = async (req, res) => {
  try {
    const { firstName, lastName, email, password, phone, addresses } = req.body;
    const existingUser = await Customer.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }
    // Create a new user
    const newCustomer = new Customer({
      firstName,
      lastName,
      email,
      password,
      phone,
      addresses,
    });
    await newCustomer.save();
    const token = jwt.sign(
      { customerId: newCustomer._id, email: newCustomer.email },
      JWT_SECRET
    );
    res.status(201).json({ message: "User registered successfully", token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};
AuthController.signIn = async (req, res) => {
    console.log("We are in sign in controller"); 
  try {
    const { email, password } = req.body;
    const customer = await Customer.findOne({ email });
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    if (password !== customer.password) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign(
      { customerId: customer._id, email: customer.email },
      JWT_SECRET
    );
    res.status(200).json({ message: "Sign in successful", token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};
