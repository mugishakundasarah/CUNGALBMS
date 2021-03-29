const _= require("lodash");
const serverDebug = require("debug")("app:server")
const {formatResult, validateObjectId} = require("../../utils/import")
const {validateSchool, School} = require("../../models/schools/school.model")

module.exports.createSchool = async(req, res) => {
    try {
        const {error} = validateSchool.validate(_.pick(req.body, ['schoolName', 'status']), {abortEarly: false})       
        
        const {schoolName, status} = _.pick(req.body, ['schoolName', 'status'])
        if(error){
            return res.send(formatResult({message: error}))
        }
        const duplicate = await School.findOne({schoolName})
        if(duplicate) {
            return res.send(formatResult({message: "school already exists"}))
        }
        
        const newSchool = new School({
            schoolName,
            status
        })
        const result = await newSchool.save()
        if(result){
            return res.send("new school saved");
        }
    } catch (error) {
        serverDebug(error)
        res.send(formatResult({data: error}))           
    }
}

module.exports.getSchool = async(req, res) => {
    try {
        const options = {
            page: req.query.page || 1,
            limit: req.query.limit || 10
        }
        const result = await School.paginate({}, options)
        return res.send(result)

    } catch (error) {
        serverDebug(`internal server error  ...... ${error}`)
        return res.send(formatResult({ message: "internal server error",status: 500}))
    }
}

module.exports.updateSchool = async(req, res) => {
    try {
        if(!validateObjectId(req.params.id))
            return res.send(formatResult({status: 400, message: "invalid id"}))
    
        const {schoolName, status} = _.pick(req.body, ['schoolName', 'status'])
        if(error){
            return res.send(formatResult({message: error}))
        }

        const duplicate = await School.findOne({
            _id: {
                $ne: req.params.id
            },
            schoolName: schoolName,
            status: status
        })

        if (duplicate) return res.send(formatResult({ status: 409, message: 'school already created' }));
        
        const result = await School.findByIdAndUpdate(req.params.id, _.pick(req.body, ['schoolName', 'status']))

        if(result) {
            return res.send(formatResult({status: 200, message: "UPDATED the school", data: result}))
        }
    } catch (error) {
        serverDebug(`internal server error  ...... ${error}`)
        return res.send(formatResult({ message: "internal server error",status: 500}))
    }       
}

module.exports.deleteSchool = async(req, res) => {
    try {
        // check if the id is in  db
        if (!validateObjectId(req.params.id))
            return res.send(formatResult({ status: 400, message: 'invalid id' }))

        // delete school if found
        const result = await School.findByIdAndDelete(req.params.id)
        if (!result){
            return res.send(formatResult({ status: 404, message: 'school not yet created' }));       
        }
        return res.send(formatResult({ status: 204, message: 'DELETED school' }));
    } catch (error) {
        serverDebug(error)
        res.send(formatResult({data: error}))           
    }   
}





























