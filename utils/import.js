const mongoose = require('mongoose');
/***
 * @param id
 * @returns boolean true/false
 */
exports.validateObjectid = (id) => mongoose.Types.ObjectId.isValid(id);

/***
 * @param status
 * @param message
 * @param data
 * @returns {{status:number, message:string, data:*}}
 */

 exports.formatResult = ({status=200, message="Ok", data})=>{
     return({
         status:status,
         message:message,
         data:data
     })
 }