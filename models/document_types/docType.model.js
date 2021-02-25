const mongoose = require('mongoose');
const paginate = require('mongoose-paginate-v2');
const joi = require('joi');

const docTypeSchema = new mongoose.Schema({
    name:{
        type:'String',
        required:true,
        doc_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "bookModel"
        },
        default:'Books',
        enum:['Books', 'Magazines', 'Newspapers']
    }
});

docTypeSchema.plugin(paginate);
exports.docTypeSchemaModel = new mongoose.model("docTypeSchema", docTypeSchema);
exports.docTypeValidate = (docType)=>{
    const validType = joi.object({
        name:joi.valid("Books", "Magazines", "Newspapers").required()
    })
return validType.validate(docType)
}