const express = require("express");
const bcrypt = require("bcrypt");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");
const {blackListModal} = require("../modal/blacklist.mode");
const { userModal } = require("../modal/user.modal");

userRouter.post("/register", async(req, res) => {
    const {username, email, pass, role} = req.body;
    try {
        bcrypt.hash(pass, 5, async(err, hash) => {
            if(err) {
                res.status(200).json({err})
            }else{
                const user = new userModal({
                    username,
                    email,
                    pass:hash,
                    role
                });
                await user.save();
                res.status(200).json({msg:"The new user has been registered"})
            }
        });
    } catch (error) {
        res.status(400).json({error});
    }
});

userRouter.post("/login", async(req, res) => {
    const {email, pass} = req.body
    try {
        const user = await userModal.findOne({email})
        if(user){
            bcrypt.compare(pass, user.pass, (err, result) => {
                if(result) {
                    const accessToken = jwt.sign({userId: user._id}, "masai")
                    res.status(200).json({msg:"Login Succesfull!", accessToken})  
                }else{
                    res.status(200).json({msg:"Wrong password!"})  
                }
            });
        }else{
            res.status(200).json({msg:"Wrong Credentials"})
        }
    } catch (error) {
        res.status(400).json({error});    
    }
});

userRouter.get("/logout", async (req, res) => {
    const authToken = req.headers.authorization;
    try {
        if (!authToken) {
            return res.status(400).json({ error: "Token not provided" });
        }
        const blacklistedToken = new blackListModal({ blackListedToken: authToken });
        await blacklistedToken.save();
        res.status(200).json({ msg: "You have been logged out" });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports={
    userRouter
}
