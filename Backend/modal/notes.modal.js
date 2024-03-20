const mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
    title : {type: String, required:true},
    body : {type: String, required:true},
    dueDate: {type: String,required: true}
},{
    versionKey : false
})

const noteModal = mongoose.model("note", noteSchema);

module.exports={
    noteModal
}