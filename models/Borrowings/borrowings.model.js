const mongoose = require('mongoose')
const paginate = require('mongoose-paginate-v2')
const borrower = require('./../users/users.model')

const borrowingSchema = new mongoose.Schema({
    borrower:{
     type:String,
     ref:borrower
    },
    loan:{
     //books or magazines according
    },
    ISBN:{
     type:String,
     required:true
    },
    issuingDate:{
     type: new Date()
    },
    status:{
        type:'String',
        default:'Kept',
        enum:['Kept', 'At risk', 'Borrowed', 'Lost']
    },
    graceTime:{
        type:Date
    }
    //remainingTime://graceTime - issuingDate
}).plugin(paginate)

exports.loan = new mongoose.model("Borrowing", borrowingSchema);
exports.validateLoan = (loan)=>{
    const validLoan = Joi.objects().keys({
        title:Joi.string().required(),
        ISBN:Joi.string().required(),
        borrower:Joi.string().required(),
        issuingDate:Joi.date().required(),
        status:Joi.string().required(),
        graceTime:Joi.date().required()
//        remainingTime:Joi.
    })
    return validLoan(loan);
}