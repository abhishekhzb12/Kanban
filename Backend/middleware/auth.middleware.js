const jwt = require("jsonwebtoken");
const {blackListModal} = require("../modal/blacklist.mode");
const { userModal } = require("../modal/user.modal");

const auth = async (req, res, next) => {
    const authToken = req.headers.authorization;
    if (!authToken) {
        return res.status(401).json({ msg: "Please Login" });
    }
    try {
        const blacklistedToken = await blackListModal.findOne({ blackListedToken: authToken });
        if (blacklistedToken) {
            return res.status(401).json({ msg: "Please login again" });
        }
        jwt.verify(authToken, "masai", async(err, decoded) => {
            if (err) {
                return res.status(401).json({ msg: "Invalid token" });
            }
            req.user = decoded;
            const {userId} = decoded;
                const user = await userModal.findOne({_id:userId});
                console.log(user);
                const required_role = user.role;
                req.role = required_role;
            next();
        });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};


module.exports = {
    auth
}