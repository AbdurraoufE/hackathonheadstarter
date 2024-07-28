import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js"; 

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
        res.setHeader('Set-Cookie', 'testcookie=' + 'cookevalue').json("Works");


    }catch(err){
        console.log(err);
        res.status(500).json({message: "Failed to login"});
    }
};

export const logout = (req, res) => {
    // database for logout
};
