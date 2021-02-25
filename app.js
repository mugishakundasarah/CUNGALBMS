const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const dotenv = require('dotenv');
const { docTypeRoutes } = require('./routes/document_types/docType.routes');
const { notesRoutes } = require('./routes/Notes/note.route');
const { bookRoutes } = require('./routes/Documents/Books/book.route');
dotenv.config()
const PORT = process.env.PORT
const cors = require('cors');

const host = 
process.env.NODE_ENV = 'PRODUCTION' ? process.env.PROD_HOST: `localhost:${PORT}`

const swaggerUi = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerOptions = {
    swaggerDefinition:{
        info:{
            title:"CUNGA LBMS",
            description:"A digitizing library management system"
        }, 
        servers: ["localhost:8400"]
       
    },
     //Apis in app.js, routes folder(docType routes)
     apis:['app.js',
        './routes/**/*.js','./routes/**/**/*.js', './models/**/*.js', './models/**/**/*.js'],
       
};
app.use(bodyParser.json({
    limit:"50mb"
}));
app.use(bodyParser.urlencoded({
    extended:true
}))
app.use('/docs', (req, res)=>{
    res.send('Our document section 🤩😌');
});
app.use('/api/docType', docTypeRoutes)
app.use('/api/notes', notesRoutes)
app.use('/api/books/', bookRoutes)
require('./models/db');

const swaggerDocs=swaggerJsDoc(swaggerOptions);
app.use('/documentation/library-documents', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
/**
 * @swagger
 * Get:
 * description: Get endpoints are here
 */
app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`);
});