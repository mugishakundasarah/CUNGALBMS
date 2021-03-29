const { validateStudent, studentsSchema } = require("../../models/users/users.model");
const { formatResult,validateObjectId } = require("../../utils/import");

exports.addStudent = async (req, res) => {
    try {
        const {error} = validateStudent.validate(req.body);
         
        if(error)
            return res.send(formatResult({status: 400, message: error.details[0].message}))   

       const {name, id,gender, Class} = req.body

        // check if the student exits in db
        const duplicate = await studentsSchema.findOne({name: name.toUpperCase(), id, gender:gender.toUpperCase(), Class: Class.toUpperCase()})
         if(duplicate)
             return res.send(formatResult({message: "student already registered"}))        
        
        const newStudent = new studentsSchema(req.body);
        const result = await newStudent.save();
        return res.send(formatResult({status: 201, data: result, message: "saved student to db"}))
    } catch (error) {
        return res.send(formatResult({status: 500,message: error}))
    }  
}

exports.getStudents = async (req,res) => {
    try {
        const options = {
            page: req.query.page || 1,
            limit: req.query.limit || 10
        }
        const result = await studentsSchema.paginate({}, options)
        return res.send(result)

    } catch (error) {
        return res.send(error).status(500)
    }
}

exports.updateStudent = async (req, res) => { 
    try {
        if(!validateObjectId(req.params.id))
            return res.send(formatResult({status: 400, message: "invalid id"}))
    
        let {error} = validateStudent.validate(req.body, {abortEarly: false})
        if(error) return res.send(formatResult({status: 500, message: error.details[0].message}))

        const duplicate = await studentsSchema.findOne({
            _id: {
                $ne: req.params.id
            },
            firstName : req.body.firstName,
            lastName : req.body.lastName,
            gender: req.body.gender
        })

        if (duplicate) return res.send(formatResult({ status: 409, message: 'student already in db' }));
        
        const result = await studentsSchema.findByIdAndUpdate(req.params.id, req.body)

        return res.send(formatResult({status: 200, message: "UPDATED", data: result}))
    } catch (error) {
        return res.send(formatResult({status: 500,message: error}))   
    }       
} 

module.exports.deleteStudent = async(req, res) => {
    try {
        // check if the id is in  db
        if (!validateObjectId(req.params.id))
            return res.send(formatResult({ status: 400, message: 'invalid id' }))

        // delete user if found
        const result = await studentsSchema.findByIdAndDelete(req.params.id)
        if (!result)
            return res.send(formatResult({ status: 404, message: 'reader not yet created' }));       
        return res.send(formatResult({ status: 200, message: 'DELETED' }));
    } catch (error) {
        return res.send(formatResult({ status: 500, message: error }))
    }   
}

module.exports.getStudentByClass = async(req, res, next) => {
    try {
        const Class = req.query.class;
        const options = {
            limit: req.query.limit || 10,
            page: req.query.page || 1
        }
        console.log(Class);
        const result =  await studentsSchema.paginate({class: Class}, options);
        return res.send(result)
    } catch (error) {
        return res.send(formatResult({message: error, status: 404}))
    }
}