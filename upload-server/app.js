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
app.use('/public', express.static('./public'));
//
app.listen(port);
//
app.post('/public/uploads', upload.single('myFile'), function (req, res, next) {
    // req.file is the `myFile` file
    // req.body will hold the text fields, if there were any
    console.log('Uploaded: ' + req.file.filename);
    items.push(req.file.filename);
    res.send(`Uploaded file: <img src='./uploads/${req.file.filename}'></img> <button onclick="goBack();">back</button> <script>
    function goBack() {
        window.history.back();
    }
    </script>`);
    //
});
app.get('/', (req, res) => {
    const path = './public/uploads';
    fs.readdir(path, function (err, items) {
        console.log(items);
        // let stringCollection = `<h1>KenzieGram</h1>`;
        let stringCollection = `<!DOCTYPE html>
        <html>
        
        <head>
            <meta charset="utf-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <title>Page Title</title>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <link rel="stylesheet" type="text/css" media="screen" href="./public/main.css" />
        </head>
        
        <body>
            <header>
                <h1>KenzieGram</h1>
            </header>
            <form action="http://localhost:3000/public/uploads" method="POST" enctype="multipart/form-data">
                <fieldset>
                    <legend>ʕ•ᴥ•ʔ</legend>
                    <div id="file-container">
                        <input type="file" name="myFile" id="myFile">
                    </div>(~˘▾˘)~
                    <div id="button-container">
                        <button>Upload</button>
                    </div>
                </fieldset>
            </form>
        </body>
        
        </html>`;
        for (let i = 0; i < items.length; i++) {
            stringCollection += `<img src='${path}/${items[i]}'></img>`
        };
        res.send(stringCollection);
    });
});