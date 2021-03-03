const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { docTypeRoutes } = require('./routes/document_types/docType.routes');
const { noteRoutes } = require('./routes/Notes/note.route');
const { bookRoutes } = require('./routes/Documents/Books/book.route');
const dotenv = require("dotenv")
dotenv.config({path: ".env"})
const swaggerJsDoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express")
const { mongoConnect } = require("./models/connection")
const { adminRoutes } = require("./routes/users/admin.routes")
const { studentRoutes } = require("./routes/users/students.routes")
const {staffRoutes} = require("./routes/users/staff.routes")
const PORT = process.env.PORT || 5000

// const host = 
// process.env.NODE_ENV = 'PRODUCTION' ? process.env.PROD_HOST: `localhost:${PORT}`

const host = process.env.NODE_ENV === "production" ? process.env.PROD_HOST : `localhost:${PORT}`
const cors = require("cors")

app.use(cors())


const options = {
    swaggerDefinition : {
        info : {
            title : "CUNGA LBMS",
            version : '1.0.0',
            description : "documentation of the library management system project"
        },
        schemes : [process.env.NODE_ENV == "production" ? 'https' : 'http'],
        host : host, 
        basePath : "/api",
        securityDefinitions: {
            bearerAuth: {
                type: "apiKey",
                name: "Authorization",
                scheme: "bearer",
                in: "header",
            },
        },
    },
    apis : ["./routes/**/*.js", "./models/**/*.js", "./routes/**/**/*.js", "./models/**/**/*.js"],
}

const swaggerOptions = swaggerJsDoc(options)
app.use(express.json({
    limit: "5mb"
}))
app.use(bodyParser.json({
    limit:"50mb"
}));
app.use(bodyParser.urlencoded({
    extended:true
}))

app.use("/documentation", swaggerUi.serve, swaggerUi.setup(swaggerOptions))
app.use("/api/admin", adminRoutes);
app.use("/api/students", studentRoutes)
app.use("/api/staff", staffRoutes)
app.use('/docs', (req, res)=>{
    res.send('Our document section');
});
app.use('/api/docType', docTypeRoutes)
app.use('/api/notes', noteRoutes)
app.use('/api/books', bookRoutes)

mongoConnect()
app.listen(PORT, (err) => {
    if(err) console.log(err)
    console.log(`server started on port ${PORT}`)
})