const mongoose = require('mongoose');
const paginate = require('mongoose-paginate-v2');
const Joi = require('joi');
const docTypeSchemaModel = require('./../../docType.model')

const magazineSchema = new mongoose.Schema({
name:{
    type: String,
    required:true
},
total:{
    type:String,
    required:true
},
publisher:{
    type:String,
    required:true
},
recordingDate:{
    type:Date,
    required:true
},
category:{
    type:'String',
    _id:docTypeSchemaModel.findById({_id:id}),
    required:true
}
}).plugin(paginate)

exports.magazineModel = mongoose.model('Magazines', magazineSchema)
exports.magazineValidate = (magazine)=>{
    const magazines = Joi.object().keys({
        name: Joi.string().required(),
        total: Joi.required().string(),
        publisher: Joi.string().required(),
        recordingDate: Joi.date().required(),
        category: Joi.required().valid({_id:docTypeSchemaModel.findById({_id:id})})
    })
    return magazines.validate(magazine)
}
