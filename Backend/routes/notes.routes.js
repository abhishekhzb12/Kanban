const express = require("express");
const {noteModal} = require('../modal/notes.modal');
const {auth} = require("../middleware/auth.middleware");
const { access } = require("../middleware/access.middleware");

const noteRouter = express.Router();

noteRouter.post('/', auth, async(req,res)=>{
    try {
        const note = new noteModal(req.body);
        await note.save();
        res.json({msg:"New Note has been added"})
    } catch (error) {
        res.json({error});
    }
})

noteRouter.get('/', auth, async(req,res)=>{
    const {page} = req.query;
    const limit = 10;
    const skipval = (page-1)*limit;
    try {
        let totalCount = await noteModal.countDocuments();
        let totalPages = Math.ceil(totalCount / limit);
        if(page){
            const notes = await noteModal.find().skip(skipval).limit(limit);
            res.status(200).send({"msg": `page ${page} is there`, notes, totalPages})
        }else{
        const notes = await noteModal.find();
        res.status(200).send(notes);
        }
    } catch (error) {
        res.json({err});
    }
})

noteRouter.patch("/:noteID", auth, access("Admin"), async(req,res)=>{
    const payload = req.body;
    const {noteID} = req.params;
    try {
        const note = await noteModal.findOne({_id:noteID})
        if(req.body.userID === note.userID){
            await noteModal.findByIdAndUpdate({_id:noteID}, payload)
            res.json({msg:`The note with ID: ${noteID} has been updated`})
        }else{
            res.json({msg:"You dont have access to update someones notes"})
        }
    } catch (error) {
        res.json({error})
    }
})

noteRouter.delete("/:noteID", auth, access("Admin"), async(req,res)=>{
    const {noteID} = req.params;
    try {
        const note = await noteModal.findOne({_id:noteID})
        if(req.body.userID === note.userID){
            await noteModal.findByIdAndDelete({_id:noteID})
            res.json({msg:`The note with ID: ${noteID} has been Deleted`})
        }else{
            res.json({msg:"You dont have access to Delete someones notes"})
        }
    } catch (error) {
        res.json({error})
    }
})


module.exports = {
    noteRouter
}