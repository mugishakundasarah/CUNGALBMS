const mongoose = require("mongoose")
const dotenv = require("dotenv")
const { formatResult } = require("../utils/import")
dotenv.config()

const mongoConnect = async() => {
    try {
        await mongoose.connect(process.env.DATABASE, {useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true}, ()=> {
            console.log('database connected')
        })
    } catch (error) {
        formatResult({data: error})
    }
}

module.exports.mongoConnect = mongoConnect;




