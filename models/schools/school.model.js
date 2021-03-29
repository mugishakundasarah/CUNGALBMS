const Joi = require("joi");
const mongoose = require("mongoose");
const paginate = require("mongoose-paginate-v2");

const schoolSchema = new mongoose.Schema({
    schoolName : {
        type: String,
        min: 5,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['day', 'boarding']
    }
}).plugin(paginate)

const School = mongoose.model('School', schoolSchema)

const validateSchool = Joi.object().keys({
    schoolName: Joi.string().required(),
    status: Joi.string().valid('day', 'boarding')
})

module.exports.School = School;
module.exports.validateSchool = validateSchool;

