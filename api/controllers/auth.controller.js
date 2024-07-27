import bcrypt from "bcrypt";

export const register = async (req,res) =>{
    const {username, email, password} = req.body;
    //database for registering
    
    // hashed password
    const hasedPass = await bcrypt.hash(password, 10);
    console.log(hasedPass);
    // new user & save to database

}

export const login = (req,res) =>{
    //database for login
}

export const logout = (req,res) =>{
    //database for logout
}