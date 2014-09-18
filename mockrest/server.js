var express = require('express');
var responseData = require('./responseData');

var app = express();
var responseDatas = [];
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
        res.send(200);
    }
    else {
        next();
    }
};
app.use(express.urlencoded())
app.use(express.json())
app.use(allowCrossDomain);
app.get('/responseData', responseData.findAll);
app.get('/responseData/:id', responseData.findById);
app.post('/responseData', responseData.addResponseData);
app.post('/responseData/:id', responseData.updateResponseData);
app.delete('/responseData/:id', responseData.deleteResponseData);

app.listen(8080);
console.log('Listening on port 8080 ...');
