const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer'); // For sending emails
const User = require('../../../models/auth');
const OTP = require('../../../models/otp'); // Model for storing OTP
const JWT_SECRET = 'Amitisagoodb$oy';

// Function to generate a random OTP
function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP
}

// Function to save OTP in the database for a user
async function saveOTP(email, otp) {
    // Save OTP in the database for the user
    await OTP.create({
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
        const savedOTP = await OTP.findOne({ where: { email, otp } });
        if (!savedOTP) {
            throw new Error("Invalid OTP");
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

module.exports = { createUser, loginUser, getUser, requestPasswordReset, verifyOTPAndResetPassword };
