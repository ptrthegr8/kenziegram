const fs = require('fs');
const express = require('express');
const multer = require('multer');
const upload = multer({
    dest: 'public/uploads'
})
const port = 3000;
const app = express();

const items = [];
// code that was provided
app.use(express.static('./public'), );
//
app.listen(port);
//
app.post('/public/uploads', upload.single('myFile'), function (req, res, next) {
    // req.file is the `myFile` file
    // req.body will hold the text fields, if there were any
    console.log("Uploaded: " + req.file.filename);
    items.push(req.file.filename);
    res.end(`Uploaded file: ${req.file.filename}`);
    //
});
app.get('/', (req, res, next) => {
    const path = './public/uploads';
    fs.readdir(path, function (err, items) {
        console.log(items);
        res.send(`<h1>Welcome to Kenziegram!</h1>`);
    });
});
app.get('/public/uploads', (req, res, next) => {
    res.send(items);
})