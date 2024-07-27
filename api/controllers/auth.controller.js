import bcrypt from "bcrypt";
import prisma from "./lib/prisma.js";

export const register = async (req,res) =>{
    const {username, email, password} = req.body;
    
    // hashed password
    const hashedPass = await bcrypt.hash(password, 10);
    console.log(hashedPass);

    // new user & save to database
    const newUser = await prisma.user.create({
        data:{
            username,
            email,
            password: hashedPass
        },
    });
    
    console.log(newUser);
}

export const login = (req,res) =>{
    //database for login
}

export const logout = (req,res) =>{
    //database for logout
}