const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser'); 
const app = express();
const userApi = require('./api/apiRouter');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/user', userApi);
app.get("/", function (req, res) {
    res.end('hello world');
})
app.use(function (err, req, res, next) {
    console.info(err);
    console.info(req.url);
    res.status(404).end('not found matched router!'); 
});

app.listen(18089, function (req, res) {
    console.info('start server listening 18089');
})