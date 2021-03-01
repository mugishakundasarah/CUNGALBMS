const Joi = require('joi')
const { Mongoose, Schema } = require('mongoose')

const newspaperSchema = new Schema({
    title:{
        type:String,
        required:true
    }
})