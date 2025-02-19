import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js"; 
import jsonwebtoken from "jsonwebtoken";

export const register = async (req, res) => {
    const { username, email, password } = req.body;
    
    try{
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
    res.status(201).json({message:"User created"}); 
    }catch(err){
        console.log(err);
        res.status(500).json({message:"Failed to create user [user already exists]"});
    }
};

export const login = async (req, res) => {
    const { username, password } = req.body;
    
    try{
        //user exists?
        const user = await prisma.user.findUnique({
            where: { username}
        })

        if(!user){
            return res.status(401).json({message:"Invalid information"});
        }

        //pass is correct?
        const isPassValid = await bcrypt.compare(password, user.password);

        if (!isPassValid){
            return res.status(401).json({message:"Invalid information"});
        }

        //cookie token

        const age = 2500 * 24 * 60 * 60 * 7; // time for session to expire

        const jsontoken = jsonwebtoken.sign({
            id: user.id,
        }, 
        process.env.JWT_SECRET_KEY,
        {expiresIn: age});

        res.cookie("jsontoken", jsontoken, {
            httpOnly: true,
            maxAge: age,
            //TODO Add this when website is live
            // secure: true
            }).status(200).json({message:"Login successful"});

    }catch(err){
        console.log(err);
        res.status(500).json({message: "Failed to login"});
    }
};

export const logout = (req, res) => {
    // database for logout
};
