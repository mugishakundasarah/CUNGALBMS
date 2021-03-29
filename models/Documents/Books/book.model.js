const mongoose = require('mongoose');
const paginate = require('mongoose-paginate-v2');
const Joi = require('joi');
const docTypeSchemaModel = require('../../document_types/docType.model');
const category = require('./../../Categories/category.model')

const bookModel = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    total:{
        type: String,
        required:true
    }, 
     unitPrice:{
        type: String,
        required:true
     },
     publisher: {
         type: String,
         required: true
     },
    docType_id: {
        type: Schema.Types.ObjectId,
        ref: 'docTypeSchema',
        required: true
    },
    status:{
        type: String,
        required: true,
        default:'Kept',
        enum:['Kept', 'At risk', 'Lost']
    },
    //Cover photo(requiring multer)
    details:{
        type:String,
        required:false
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"category",
        required:true
    }
}, {timestamps:true}).plugin(paginate)

exports.bookSchema = mongoose.model("bookModel", bookModel)
exports.bookValidate = (book)=>{
    const books = Joi.object({
        title:Joi.string().required(),
        total:Joi.number().required(),
        unitPrice:Joi.string(),
        publisher:Joi.string(),
        category_id:Joi.string().required(),
        status:Joi.string().required().valid('Kept','At risk', 'Lost'),
        details:Joi.string().max(400)
    })
    return books.validate(book);
}