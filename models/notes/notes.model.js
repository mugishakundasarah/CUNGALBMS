const mongoose = require('mongoose');
const paginate = require('mongoose-paginate-v2');
const joi = require('joi');

const notesSchema = new mongoose.Schema({
    title:{
        type:String,
        required:false
    }, 
    body:{
        type:String,
        required:true
    },
    status: {
        type: String,
        default: 'DRAFT',
        enum:['DRAFT','SAVED']
    }
}, {timestamps:true}
).plugin(paginate);

exports.notesModel = mongoose.model("notesSchema", notesSchema);
exports.notesValidate = (note)=>{
    const notes = joi.object({
        title:joi.string().required(),
        body:joi.string().required(),
        date:joi.date(),
        status:joi.valid("DRAFT","SAVED")
    })
    return notes.validate(note)
}