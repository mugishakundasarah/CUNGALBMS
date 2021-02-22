const { format } = require("date-and-time")
const { valid } = require("joi")
const { bookSchema, bookValidate } = require("../../../models/Documents/Books/book.model")
const { docTypeSchemaModel } = require("../../../models/docType.model")
const { formatResult } = require("../../../utils/import")

exports.postBooks = async (req, res) => {
    try {
        const id = req.params.id
        const body = req.body
        const { error } = bookValidate(req.body)
        if (error)
            return res.send(formatResult({ status: 400, message: error.details[0].message }))


        const duplicate = await bookSchema.findOne({
            _id: id
        })
        if (duplicate)
            return res.send(formatResult({ status: 400, message: "Book already recorded", data: duplicate }))
        const newBook = new bookSchema(req.body);
        await newBook.save();
        res.send(formatResult({ status: 301, message: "Book was successfully added", data: newBook }))

    } catch (err) {
        res.send(formatResult({ status: 400, data: err }))
    }
}

exports.updateBook = async (req, res) => {
    try {
        const id = req.params.id
        const updatedBook = await bookSchema.findOneAndUpdate({ _id: id }, req.body, { new: true })
        const result = await updatedBook.save()
        return res.send(formatResult({ status: 200, message: "Successfully updated", data: result }))
    } catch (err) {
        res.send(formatResult({ status: 400, message: "Couldn't updated", data: err }))
    }
}
