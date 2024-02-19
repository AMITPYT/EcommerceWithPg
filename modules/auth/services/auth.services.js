// services/userService.js

// const { message } = require("../constant");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const User = require('../../../models/auth');
const Otp = require('../../../models/otp');
const Carts = require('../../../models/carts');
const JWT_SECRET = 'Amitisagoodb$oy';

async function createUser(body) {
    try {
      const { name, email, password } = body;
      console.log("Received user data:", name, email); // Add logging
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log("Hashed password:", hashedPassword); // Add logging
      const user = await User.create({
        name,
        email,
        password: hashedPassword,
      });
      console.log("User created:", user); // Add logging
      const token = jwt.sign({ userId: user.id }, JWT_SECRET);
      return { success: true, message: "User created", token };
    } catch (error) {
      console.error("Error while creating user:", error); // Log the error
      throw new Error("Error while creating user");
    }
  }
  

async function loginUser(body) {
  try {
    const { email, password } = body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error("User not found");
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new Error("Incorrect password");
    }
    const token = jwt.sign({ userId: user.id }, JWT_SECRET);
    return { success: true, message: "User logged in", token };
  } catch (error) {
    throw new Error("Error while logging in");
  }
}

async function getUser() {
  try {
    const users = await User.findAll();
    return users;
  } catch (error) {
    throw new Error("Error while fetching users");
  }
}

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP
}

// Function to save OTP in the database for a user
async function saveOTP(email, otp) {
  // Save OTP in the database for the user
  await Otp.create({
      email,
      otp
  });
}

// API endpoint to request password reset and save OTP in the database
async function requestPasswordReset(body) {
  try {
      const { email } = body;
      const user = await User.findOne({ where: { email } });
      if (!user) {
          throw new Error("User not found");
      }
      
      const otp = generateOTP();
      await saveOTP(email, otp);
      
      // Send OTP via email (You can also send it via SMS or other methods)

      return { success: true, message: "OTP sent for password reset" };
  } catch (error) {
      throw new Error("Error while requesting password reset");
  }
}

// API endpoint to verify OTP and update user's password
async function verifyOTPAndResetPassword(body) {
  try {
      const { email, otp, newPassword } = body;
      
      // Verify OTP from the database
      const savedOTP = await Otp.findOne({ where: { email, otp } });
      if (!savedOTP) {
          throw new Error("Invalid OTP");
      }

         // Check if OTP is expired (current time - OTP timestamp > 2 minutes)
         const currentTime = new Date();
         const otpTimestamp = new Date(savedOTP.createdAt);
         const timeDifference = currentTime - otpTimestamp;
         const otpExpirationTime = 2 * 60 * 1000; // 2 minutes in milliseconds
         if (timeDifference > otpExpirationTime) {
             // OTP is expired
             throw new Error("OTP expired");
         }
      
      // OTP is valid, update user's password
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      const user = await User.findOne({ where: { email } });
      if (!user) {
          throw new Error("User not found");
      }

      // Update user's password with the new hashed password
      user.password = hashedPassword;
      await user.save();

      // Delete the OTP record from the database after password reset
      await savedOTP.destroy();

      return { success: true, message: "Password reset successfully" };
  } catch (error) {
      throw new Error("Error while resetting password");
  }
}

async function getCartByUserId(userId) {
  try {
    const carts = await Carts.findAll({ where: { userId } });
    if (!carts || carts.length === 0) {
      throw new Error("No carts found for this user");
    }
    return carts;
  } catch (error) {
    throw new Error("Error fetching carts by user ID");
  }
}

module.exports = { createUser, loginUser, getUser, requestPasswordReset, verifyOTPAndResetPassword, getCartByUserId  };
