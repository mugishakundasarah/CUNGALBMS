const { valid } = require("joi");
const { docTypeSchemaModel, docTypeValidate } = require("../models/docType.model");
const { validateObjectid, formatResult } = require("../utils/import");

exports.postDocTypes = async (req, res) => {
    try {
       const { name } = req.body;
       const validDocType =  docTypeValidate(name);
        //david
        if (!validDocType){
            return res.send(formatResult({status:400, message:"Authorized document types are books, magazines and newspapers", data:name}))
        }
        else{
            const duplicate = await docTypeSchemaModel.findOne({
                name:name
            })
            if(duplicate){
                return res.send(formatResult({status:400, message:"Document type already created"}))
            }
            else{
        const savedName = await new docTypeSchemaModel(req.body);
        const result = await savedName.save();
        console.log(result);
        return res.send(formatResult({ status: 201, message: "Document type created", data:result }));
            }
    }
    } catch (err) {
       return res.send(formatResult({status:400, message:"Error occurred while creating document type", data:err.toString()}));
    }
}

exports.getAllDocTypes = async (req, res) => {
    try {
        const result = await docTypeSchemaModel.find()
  if(result){ res.send(formatResult({status:200, data:result}))}
  else{
  res.send(formatResult({status:400, message:"No such document"}))
}
    } catch (err) {
       return err.toString();
    }
}


exports.getDocTypeById = async(req, res)=>{
   try {
    const id = req.params.id
    const validId = validateObjectid(id)
    if(validId){
        const result = await docTypeSchemaModel.findById({_id:id})
       return res.send(formatResult({status:200, data:result}))
    }
    else{
        res.send(formatResult({status:404, message:"Document type not found"}))
    }
   } catch (err) {
       console.log(err.toString())
   }
}


exports.updateDocType = async (req, res) => {
    try {
        const { id } = req.params
        const validId = validateObjectid(id)
        if (validId) {
               var docTypeToUpdate = docTypeSchemaModel.findById({_id:validId})
               if(docTypeToUpdate){
                   var updatedDocType = docTypeSchemaModel.findByIdAndUpdate({_id:id}, req.body, {new:true})
                   updatedDocType = {
                   name:req.body.name
               }
               return res.send(formatResult({status:200, message:"Successfully updated", data:updatedDocType}))
               }
               else{}    
            }
            else {
                return res.send(formatResult({status:404, message:"Couldn't update: Document is not yet in our database"}));
            }
       } catch (err) {
        console.log(err.toString());
    }
}


exports.deleteDocType = async (req, res) => {
    try {
        const { id } = req.params
        const validId = validateObjectid(id);
        if (validId) {
            await docTypeSchemaModel.findByIdAndDelete({_id:id})
            res.send(formatResult({status:200, message:"Successfully deleted"}));
        }
        else {
            return res.send(formatResult({status:400, message:"Couldn't delete: No such document type"}))
        }
    } catch (err) {
        return err.toString();
    }
}