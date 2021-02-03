const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const dotenv = require('dotenv');
const { docTypeRoutes } = require('./routes/docType.routes');
const { notesRoutes } = require('./routes/Notes/note.route');
dotenv.config()

app.use(bodyParser.json({
    limit:"50mb"
}));
app.use(bodyParser.urlencoded({
    extended:true
}))
app.use('/docs', (req, res)=>{
    res.send('Our document section 🤩😌');
});
app.use('/docType', docTypeRoutes)
app.use('/notes', notesRoutes)
app.use('/docType/docs/')
require('./models/db');
app.listen(process.env.PORT, ()=>{
    console.log(`Listening on port ${process.env.PORT}`);
});