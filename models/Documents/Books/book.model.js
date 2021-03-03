const mongoose = require('mongoose');
const paginate = require('mongoose-paginate-v2');
const Joi = require('joi');
const docTypeSchemaModel = require('../../document_types/docType.model')

const bookModel = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    total:{
        type: String,
        required:true
    }, 
    dateOfRecipient:{
        type: Date,
        required:true
     },
     unitPrice:{
        type: String
     },
     publisher: {
         type: String,
         required: true
     },
    publishingDate:{
        type: Date
    },
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "docTypeSchema",
        required: true
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
        unitPrice:Joi.string(),
        publisher:Joi.string(),
        publishingDate:Joi.date(),
        category_id:Joi.string().required(),
        status:Joi.string().required().valid('Kept','At risk', 'Lost')
    })
    return books.validate(book);
}