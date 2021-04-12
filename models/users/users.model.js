const Joi = require("joi");
const mongoose = require("mongoose");
const paginate = require("mongoose-paginate-v2");



const studentsData = new mongoose.Schema({
    name: {type: String, required: true}, 
    gender: {type: String},
    Class: {type: String}
}, {timestamps : true})

studentsData.plugin(paginate)
const studentsSchema = mongoose.model("students",studentsData)


//configuring joi for user students validation
const validateStudent = Joi.object().keys({
    name: Joi.string().required(),
    gender: Joi.string().valid("male", "female"),
    Class: Joi.string()
})


const staff = new mongoose.Schema({
    name: {type: String, required: true},
    email : {type: String, required: true},
})
staff.plugin(paginate)

const staffSchema = mongoose.model("Staff",staff);

//configuring joi for user students validation
const validateStaff = Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required()
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
        type: String
    },
    superAdmins: {
        type: Array
    }
  }, {timestamps: true});

adminData.plugin(paginate);
const AdminSchema = mongoose.model("Admin", adminData);

// validation 
const validateAdmin = Joi.object().keys({
    userName: Joi.string().min(3).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password : Joi.string().min(8).regex(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/),
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