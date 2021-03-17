const Joi = require("joi");
const mongoose = require("mongoose");
const paginate = require("mongoose-paginate-v2");


const studentsData = new mongoose.Schema({
    firstName: {type: String, required: true}, 
    lastName : {type: String, required: true},
    gender: {type: String},
    Class: {type: String}
}, {timestamps : true})

studentsData.plugin(paginate)
const studentsSchema = mongoose.model("students",studentsData)


//configuring joi for user students validation
const validateStudent = Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    gender: Joi.string().valid("male", "female"),
    Class: Joi.string()
})


const staff = new mongoose.Schema({
    email : {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    duty: {type: String}
})
staff.plugin(paginate)

const staffSchema = mongoose.model("Staff",staff);

//configuring joi for user students validation
const validateStaff = Joi.object().keys({
    email: Joi.string().email().required(),
    firstName: Joi.string().required(),
    lastName : Joi.string().required(),
    duty: Joi.string()
})

const adminData = new mongoose.Schema({
    userName: {
        type: String,
        min: 3, 
        required: true
    },
    email: {
      type: String,
      min: 5,
      max: 255,
      email: true,
      unique: true,  
      required: true
    },
    password: {
        type: String,
        min: 5,
        max: 1024,
        required: true   
    },
    token: {
        type: String,
    },
    code: {
        type: Number
    },
    profilePicture: {
        data : Buffer,
        type: Object
    }
  }, {timestamps: true});

adminData.plugin(paginate);
const AdminSchema = mongoose.model("admin", adminData);

// validation 
const validateAdmin = Joi.object().keys({
    userName: Joi.string().min(3).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password : Joi.string().min(5).max(1024).required(),
    profilePicture : Joi.string()
});

module.exports = {
    studentsSchema: studentsSchema,
    validateStudent : validateStudent,
    staffSchema : staffSchema,
    validateStaff : validateStaff,
    AdminSchema: AdminSchema,
    validateAdmin : validateAdmin
};