const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const {allFiles} = require('./handlers/allFiles');
const {getFile} = require('./handlers/getFile');
const {editFile} = require("./handlers/editFile");
const {deleteFile} = require('./handlers/deleteFile');
const {createNewFile} = require('./handlers/createNewFile');
const app = express();


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use((req, res, next) => {
  console.log(`Got request: ${req.method} ${req.url}`);
  next();
})

app.get('/allFiles', allFiles)
app.get('/getFile/:filename', getFile);
app.post('/editFile', editFile);
app.post('/deleteFile', deleteFile);
app.post('/createNewFile', createNewFile);

app.listen(5000);

