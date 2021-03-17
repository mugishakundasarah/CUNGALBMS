const { bookSchema, bookValidate } = require("../../../models/Documents/Books/book.model")
const { docTypeSchemaModel } = require("../../../models/document_types/docType.model")
const { formatResult } = require("../../../utils/import")

exports.postBooks = async (req, res) => {
    try {
        const id = req.params.id
        const body = req.body
        const { error, value } = bookValidate(body)
        if (error)
            return res.send(formatResult({ status: 400, message: error.details[0].message }))


        const duplicate = await bookSchema.findOne({
            title:body.title
        })
        if (duplicate)
            return res.send(formatResult({ status: 400, message: "Book already recorded", data: duplicate }))
        const newBook = new bookSchema(req.body);
        const result = await newBook.save();
        return res.send(formatResult({ status: 301, message: "Book was successfully added", data: result }))

    } catch (err) {
       return res.send(formatResult({ status: 400, message:"Error occured", data: err}))
    }
}

exports.updateBook = async (req, res) => {
    try {
        const id = req.params.id
        const updatedBook = await bookSchema.findOneAndUpdate({ _id: id }, req.body, { new: true })
        const result = await updatedBook.save()
        return res.send(formatResult({ status: 200, message: "Successfully updated", data: result }))
    } catch (err) {
        return res.send(formatResult({ status: 400, message: "Couldn't updated", data: err }))
    }
}

exports.deleteBook = async (req, res)=>{
    try {
        const id = req.params.id
        const result = await bookSchema.findByIdAndDelete({_id:id})
        return res.send(formatResult({ status: 200, message: "Book deleted", data: result }))

    } catch (err) {
        return res.send(formatResult({ status: 400, message: "Couldn't delete", data: err }))
    }
}

exports.getAllBooks = async (req, res)=>{
    try {
        const result = await bookSchema.find()
        if(result) return res.send(formatResult({ status: 200, data: result }))
        else{
           return res.send(formatResult({ status: 404, message: "No books created yet" }))
        }
        
    } catch (err) {
      return  res.send(formatResult({ status: 404, message: "Couldn't find", data: err }))
    }
}

exports.getBook = async(req, res)=>{
    try {
        const bookId = req.params.id
        const result = await bookSchema.findById({_id:id})
        return res.send(formatResult({status:200, data: result}))
    } catch (err) {
        return res.send(formatResult({status: 404, message: "Couldn't find", data: err}))
    }
}
//let's first start with document type swagger
//exports.getBookById