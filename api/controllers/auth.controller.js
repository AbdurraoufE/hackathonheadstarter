// api/controllers/auth.controller.js
import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";  // Adjusted to reflect the correct path

export const register = async (req, res) => {
    const { username, email, password } = req.body;
    
    // hashed password
    const hashedPass = await bcrypt.hash(password, 10);
    console.log(hashedPass);

    // new user & save to database
    const newUser = await prisma.user.create({
        data: {
            username,
            email,
            password: hashedPass,
        },
    });
    
    console.log(newUser);
    res.status(201).json(newUser);  // Respond with the new user data
};

export const login = (req, res) => {
    // database for login
};

export const logout = (req, res) => {
    // database for logout
};
