const nodeMailer = require("nodemailer")
const bcrypt = require("bcryptjs");
const {validateAdmin, AdminSchema} = require("../../models/users/users.model");
const { formatResult, validateObjectId } = require("../../utils/import");
const jwt = require('jsonwebtoken')

module.exports.createAdmin = async (req, res) => {
    try {
        const {userName, email, password} = req.body;

        const {error} = validateAdmin.validate(req.body, {abortEarly: false})
         
        if(error)
            return res.send(formatResult({status: 400, message: error.details[0].message}))   
        
        // check if there is a duplicate 
        const duplicate = await AdminSchema.findOne({email: email})
        if(duplicate)
            return res.send(formatResult({message: "user with the email already exists"}))        

        //configure validation by email checking and sending confirmation code
        let code = Math.floor(Math.random() * 1000000) + 1
        let signUpConfirmationMessage = {
            from: "mugishakundasarah@gmail.com",
            to: email,
            subject: `confirmation code`,
            text: "your code is " + code
        }

        const transporter = nodeMailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        })

        transporter.verify((err) => {
            if (err)
                console.log(err)
            else
                console.log(`we are ready to send messages`)
        })

        transporter.sendMail(signUpConfirmationMessage, async(err, result) => {
            if (err) 
                res.send(formatResult({message: err}))
            console.log(result)
            res.send("confirmation email sent")

            await bcrypt.hash(password, 10, async(err, hash) => {
                if(err)
                  return res.send(formatResult({message: err, status: 401}))

                const newAdmin = new AdminSchema({
                    userName: userName,
                    email: email,
                    password: hash
                })
                const saveAdmin = await newAdmin.save()
                return res.send(formatResult({message: "new librarian was created", data: saveAdmin}))
            })
        })
    } catch (error) {
        res.send(formatResult({message: "failed to create admin", data: error.toString()}))
    }  
}

module.exports.login = async(req, res) => {
    try {
       const {email, password} = req.body
       const findUser = await AdminSchema.findOne({email: email})
       if(!findUser)
            return res.send(formatResult({data: 'did not find user', status: 404}))
       
       const passwordConfirmation = await bcrypt.compare(password, findUser.password)
        if(!passwordConfirmation)
            return res.send(formatResult({data: "wrong email or password"}))
        
        const Token = jwt.sign(req.body, 'brilliant', {expiresIn: "1hr"})

        //save the token to db
        const addToken = await AdminSchema.findOneAndUpdate({email: email}, {token: Token}, {new: true})

        req.headers.authorization = Token
        
        return res.send(formatResult({
            message: "Auth successful",
            data: addToken
        }))
    }catch(err) {
            return res.send(err)
    }
}

module.exports.uploadProfile = async(req, res) => {
    try {
        const id = req.params.id
        if(!validateObjectId(id))
            return res.send(formatResult({message: "please enter a valid object id "}))
        
        if(typeof req.file == 'undefined')
            return res.send(formatResult({message: "please include a file with .jpg or .png"}))
    
        const saveProfile = await AdminSchema.findByIdAndUpdate(id, {profilePicture: "profilepicture"})
        return res.send(formatResult({data: saveProfile, message: "added the profile picture"}))    
    } catch (error) {
        console.log(error)
        return res.send(formatResult({message: error, data: "could not save profile"}))
    }    
}

module.exports.updateAccount = async(req, res) => {
    try {
        if(!validateObjectId(req.params.id))
            return res.send(formatResult({status: 400, message: "invalid id"}))
    
        let {error} = validateAdmin.validate(req.body, {abortEarly: false})
        if(error) return res.send(formatResult({status: 500, message: error.details[0].message}))
           
        
        const {email, password} = req.body

        email = req.body.email.toUpperCase()

        const duplicate = await AdminSchema.findOne({
            _id: {
                $ne: id
            },
            email: email
        })

        if (duplicate) return res.send(formatResult({ status: 409, message: 'user already in db' }));
        
        
        const result = 
            await User.findByIdAndUpdate(id, {
                email: email
            })

        res.send(formatResult({status: 200, message: "UPDATED", data: result}))
        } catch (error) {
            res.send(formatResult({status: 500,message: error}))   
        }
}

module.exports.deleteAccount = async(req,res) => {
    try {
        // check if the id is in the db
        if (!validateObjectId(req.params.id))
        
            return res.send(formatResult({ status: 400, message: 'invalid id' }))

        // delete user if found
        const result = await AdminSchema.findOneAndDelete({ _id: req.params.id })
        if (!result)
            if (!reader) return res.send(formatResult({ status: 404, message: 'reader not yet created' }));
        
        return res.send(formatResult({ status: 200, message: 'DELETED' }));
    } catch (error) {
        return res.send(formatResult({ status: 500, message: error }))
    }
}
module.exports.getAccount = async (req,res ) => {
    try {
        const options = {
            page: req.body.page || 1,
            limit: req.body.limit || 10
        }
        const results = await AdminSchema.paginate({}, options)
        console.log(results)
        return res.send(results)
     } catch (error) {
         return res.send(formatResult({status: 500, message: error}))
     }
}