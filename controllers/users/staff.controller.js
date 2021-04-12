const { validateStaff, staffSchema, validateStudent } = require("../../models/users/users.model");
const { formatResult, validateObjectId } = require("../../utils/import");

exports.addStaff = async (req, res) => {
    try {
        const {error} = validateStaff.validate(req.body);
        if(error)  
            return res.send(formatResult({status: 400, message: error.details[0].message}))
        
        // check if duplicate
        const duplicate =
          await staffSchema.findOne(
                {
                   email: req.body.email.toUpperCase(), 
                   name: req.body.firstName.toUpperCase()
                }
            )
         if(duplicate)
            return res.send(formatResult({message: "the staff member already exists in db"}))
        
        const newStaff = new staffSchema(req.body)
        const result = await newStaff.save()
        return res.send(formatResult({status: 201, data: result, message: "saved staff in db"}))
    } catch (error) {
        return res.send(formatResult({status: 500, message: error}))
    }
}

exports.getStaff = async (req, res) => {
    try {
        const options = {
            page: req.query.page || 1, 
            limit : req.query.limit || 10
        }
        const result = await staffSchema.paginate({}, options)
        return res.send(result)

    } catch (error) {
        return res.send(error)
    }
}
exports.updateStaff = async (req, res) => {
       try {
           if(!validateObjectId(req.params.id))
                return res.send(formatResult({status: 400, message: "invalid id"}))
            let {error} = validateStaff.validate(req.body, {abortEarly: false})

            if(error) return res.send(formatResult({status: 500, message: error.details[0].message}))

            const duplicate = await staffSchema.findOne({
                _id: {
                    $ne: req.params.id 
                },
                email: req.body.email.toUpperCase(), 
                name: req.body.firstName.toUpperCase()
            })
            if(duplicate)
                return res.send(formatResult({status: 409, message: "staff member already registered"}))

            const result = await staffSchema.findById(req.params.id, req.body)

            return res.send(formatResult({status: 200, message: "UPDATED", data: result}))
       } catch (error) {
            return res.send(formatResult({status: 500, message: error}))           
       }
}

exports.deleteStaff = async (req, res) => {
    try {
        if(!validateObjectId(req.params.id))
            return res.send(formatResult({status: 200, message: "invalid id"}))
        
        // delete staff if found
        const result = await staffSchema.findByIdAndDelete({_id: req.params.id})
        if(!result)
            return res.send(formatResult({status: 404, message: "reader not yet created"}))
        return res.send("deleted user from db")
    } catch (error) {
        return res.send(error).status(500)
    }
}