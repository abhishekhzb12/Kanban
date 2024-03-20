const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username : {type: String, required:true},
    email : {type: String, required:true},
    pass : {type: String, required:true},
    role : {type: String, 
        enum:['Admin', 'RegularUser'],
        default:'RegularUser'}
},{
    versionKey : false
})

const userModal = mongoose.model("user", userSchema);

module.exports={
    userModal
}