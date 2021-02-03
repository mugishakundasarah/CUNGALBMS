const mongoose = require('mongoose');
const paginate = require('mongoose-paginate-v2');
const Joi = require('joi');
const date = require('date-and-time')

const bookModel = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    total:{
        type: Number
    }, 
    dateOfRecipient:{
        type: Date,
        required:false
     },
     unitPrice:{
        type: Number
     },
     publisher:{
         name:String,
         required:true
     },
    publishingDate:{
        type: Date
    },
    category:{
        type:String,
        required:true
    },
    status:{
        type:'String',
        required:true,
        default:'Kept',
        enum:['Kept', 'At risk', 'Lost']
    }
}).plugin(paginate)

exports.bookSchema = mongoose.model("bookModel", bookModel)
exports.bookValidate = (book)=>{
    const books = Joi.object({
        title:Joi.string().required(),
        total:Joi.number().required(),
        dateOfRecipient: Joi.date(),
        unitPrice:Joi.number(),
        publisher:Joi.string(),
        publishingDate:Joi.date(),
        category:Joi.string().required(),
        status:Joi.string().required().valid('Kept','At risk', 'Lost')
    })
}