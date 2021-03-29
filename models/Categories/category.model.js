const mongoose = require('mongoose');
const paginate = require('mongoose-paginate-v2');
const Joi = require('joi');

const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    }
}).plugin(paginate)

exports.category = new mongoose.model("Category", categorySchema);
exports.validateCategory = (category)=>{
    const validCategory = Joi.objects().keys({
        name:Joi.string().min(2).max(20).required()
    })
    return validCategory(category);
}