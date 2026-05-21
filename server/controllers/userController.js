import User from "../models/User.js";
import Resume from "../models/Resume.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const generateToken = (userId) => {
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
    return token;
}

// POST /api/users/register
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // check if fields are empty
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Please fill all fields" });
        }

        // check if user already exists
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        // create new user
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ name, email, password: hashedPassword });

        const token = generateToken(newUser._id);
        newUser.password = undefined; // hide password in response

        return res.status(201).json({ message: "User registered successfully", user: newUser, token });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// controller for user login
// POST /api/users/login
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // check if fields are empty
        if (!email || !password) {
            return res.status(400).json({ message: "Please fill all fields" });
        }

        // check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        // check if password is correct
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const token = generateToken(user._id);
        user.password = undefined; // hide password in response
        return res.status(200).json({ message: "User logged in successfully", user, token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// controller for user logout
// POST /api/users/logout
export const logoutUser = async (req, res) => {
    try {
        res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

//controller for getting user profile
// GET /api/users/data

export const getUserById = async (req, res) => {
    try {
        const userId = req.userId;
        console.log("Getting user data for user ID:", userId);
        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// controller for updating user profile
// PUT /api/users/update
export const updateUser = async (req, res) => {
    try {
        const userId = req.userId;
        const { name, email, password } = req.body;
        const updatedData = {};

        if (name) updatedData.name = name;
        if (email) updatedData.email = email;
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            updatedData.password = hashedPassword;
        }
        const updatedUser = await User.findByIdAndUpdate(userId, updatedData, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        updatedUser.password = undefined; // hide password in response
        return res.status(200).json({ message: "User updated successfully", user: updatedUser });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// controller for getting user resumes
// GET /api/users/resumes
export const getUserResumes = async (req, res) => {
    try {
        const userId = req.userId;
        console.log("Getting resumes for user ID:", userId);
        const resumes = await Resume.find({ userId });
        return res.status(200).json(resumes);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}