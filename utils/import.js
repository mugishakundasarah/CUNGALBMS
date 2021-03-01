const mongoose = require("mongoose")
/**
 * @param {String} 
 * @returns {Boolean} true/false
 */

exports.validateObjectId = (id) => mongoose.Types.ObjectId.isValid(id)

/**
 * @param status
 * @param message
 * @param data
 * @returns {{data: *, message: string, status: number}}
 */

 exports.formatResult = ({status, message, data}) => {
     return {
        status,
        message: message.toString().split('"').join(""),
        data      
    }
 }