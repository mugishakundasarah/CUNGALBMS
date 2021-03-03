const { mongoose } = require("mongoose");
const date = require('date-and-time')
const { notesValidate, notesModel } = require("../../models/notes/notes.model")
const { formatResult, validateObjectid } = require("../../utils/import")

exports.postNote = async (req, res) => {
    try {
        const {title, date, body} = req.body
        const {id} = req.params
    const {error, validNote} = notesValidate(req.body)
    if(error)res.send(formatResult({status:400, message:" ", data:error.message}))
    else if(validNote){
        const note = await new notesModel(req.body)
        // const status = "draft" || "saved"
       
        const duplicate = await notesModel.find({
            _id:{
                $ne:id
            }, body:body
        })
        if(duplicate){
            res.send(formatResult({status:403, message:"A similar note has already been saved"}))
        } 
        else{
        const saveNote = await note.save();
        res.send(formatResult({status:201, message:"CREATED", data:saveNote}));
        // if(!saveNote){
        //     status=="draft"
        //     const draft = note;
        //     await draft.save();
        //     res.send(formatResult({message:"Saved as draft"}));
        //     }
        //     else{}
        // }
     }
     }
    else{
        return res.send("Couldn't create note: Invalid note");
    }
    } catch (err) {
        console.log(err.toString())
    }
    
}

exports.getNotes = async(req, res)=>{
    try {
        const result = await notesModel.find()
        if(result){res.send(formatResult({status:200, data:result}))}
        else{
    return res.send(formatResult({status:404,message:"No notes yet; create one first."}))
    }
    } catch (err) {
        return res.send(err.toString())
    }
}
exports.getNoteById = (req, res) =>{
    const id = req.params.id
    const validNote = notesModel.findById({_id:id})
    if(validNote){
return res.send(formatResult({status:302, data:validNote}))
    }
}

exports.updateNote = async(req, res)=>{
    try {
        const {title, body} = req.body
        const id = req.params.id
        const validId = validateObjectid(id)
        if(validId){    
            const foundNote = await notesModel.findById({_id:validId})
            if(foundNote){
                var noteToUpdate = await notesModel.findByIdAndUpdate({_id:id}, req.body, {new:true})
                noteToUpdate = {
                    title:req.body.title,
                    body:body,
                    date:`Last updated on ${Date()}`
                }.save();
                return res.send(formatResult({status:302, message:"Successfully updated", data:noteToUpdate}))
            }
        }
        else{
           return res.send(formatResult({status:401, message:"Invalid id"}))
        }
    } catch (err) {
        console.log(err.toString())
    }
}

exports.deleteNote = async(req, res)=>{
   try {
    const id = req.params.id
    const validId = validateObjectid(id)
    if(validId){
      await notesModel.findOneAndDelete({
        _id:validId
     })
     return res.send(formatResult({status:200, message:"Note removed"}))
    }
    else{
        return res.send(formatResult({status:401, message:"Couldn't delete: No such note"}))
    }
   } catch (err) {
       return console.log(err.toString())
   }

}