const mongoose = require("mongoose");

const blackListSchema = mongoose.Schema({
    blackListedToken: String
},{
    versionKey: false
})

const blackListModal = mongoose.model("blacklistToken", blackListSchema);

module.exports = {
    blackListModal
}