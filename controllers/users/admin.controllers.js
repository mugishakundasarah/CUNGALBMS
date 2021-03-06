const nodeMailer = require("nodemailer")
const bcrypt = require("bcryptjs");
const {validateAdmin, AdminSchema } = require("../../models/users/users.model");
const { formatResult, validateObjectId } = require("../../utils/import");
const jwt = require('jsonwebtoken');
const multer = require("multer");

module.exports.checkSuperAdmin = async(req, res, next) => {
    const {adminName} = req.body; 

    const arr = ['grace', 'souvenir', 'nick', 'seth', 'sarah']
    const result = 0

    for (let i = 0; i < arr.length; i++) {
        if(adminName == arr[i]){
            result = 1;
        }
    }

    if(result) {
        req.user.superAdmin = true;
    }
    else{
        req.user.superAdmin = false;
    }
    next();
}

module.exports.createAdmin = async (req, res) => {
    try {
        const {userName, email, password} = req.body;

        const {error} = validateAdmin.validate(req.body, {abortEarly: false})

        if(error){
            if(error.details[0].path[0].includes("password")){
                if(password.length < 8){
                    return res.send("password must be atleast 8 characters");
                }
                else{
                    return res.send("the password must contain special characters and uppercase letters");
                }
            }
            else{
                return res.send(formatResult({status: 400, message: error.details[0].message}))   
            }
        }
        
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
            res.send("confirmation email sent")

            await bcrypt.hash(password, 10, async(err, hash) => {
                const newAdmin = new AdminSchema({
                    userName: userName,
                    email: email,
                    password: hash,
                    code: code
                })
                await newAdmin.save()
                return res.send("new librarian was created");
            })
        })
    } catch (error) {
        console.log(error); 
        return res.send({message: "failed to create admin", data: error})
    }  
}

module.exports.login = async(req, res) => {
    try {
       const {email, password} = req.body
       const findUser = await AdminSchema.findOne({email: email})
       
       if (!findUser) {
           return res.send("wrong email or password")    
       }

       const passwordConfirmation = await bcrypt.compare(password, findUser.password)
       console.log(passwordConfirmation);
        if(!passwordConfirmation)
            return res.send("wrong email or password")
        
        const Token = jwt.sign(req.body, 'brilliant', {expiresIn: "1hr"})

        //save the token to db
        const addToken = await AdminSchema.findOneAndUpdate({email: email}, {token: Token}, {new: true})

        req.headers.authorization = Token
        
        return res.send({
            message: "Auth successful",
            data: addToken
        })
    }catch(err) {
            return res.send(err)
    }
}

module.exports.uploadProfile = async(req, res) => {
    try {
         // req.file contains information of uploaded file
        // req.body contains information of text fields, if there were any

        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.file) {
            return res.send('Please select an image to upload');
        }
        else if (err instanceof multer.MulterError) {
            return res.send(err);
        }
        const saveProfile = await AdminSchema.findByIdAndUpdate(id, {profilePicture: req.file.fileName})
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
           
        
        let {email, password} = req.body

        email = req.body.email.toUpperCase()

        const duplicate = await AdminSchema.findOne({
            _id: {
                $ne: req.params.id 
            },
            email: email
        })

        if (duplicate) return res.send(formatResult({ status: 409, message: 'user already in db' }));
        
        
        const result = 
            await AdminSchema.findByIdAndUpdate(req.params.id, {
                email: email
            })

        return res.send(formatResult({status: 200, message: "UPDATED", data: result}))
        } catch (error) {
            return res.send(formatResult({status: 500,message: error}))   
        }
}

module.exports.deleteAccount = async(req,res) => {
    try {
        // check if the id is in the db
        if (!validateObjectId(req.params.id)){
            return res.send(formatResult({ status: 400, message: 'invalid id' }))
        }      

        // delete user if found
        const result = await AdminSchema.findByIdAndDelete(req.params.id)
        if (!result)
            return res.send(formatResult({ status: 404, message: 'admin not yet created' }));
        
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
        return res.send(results)
     } catch (error) {
         return res.send(formatResult({status: 500, message: error}))
     }
}
