var moment = require('moment');

var responseDatas = {};
var index = 1;
function seed() {
    var random = function (min, max) {
       return Math.round(min + Math.random()*(max - min));
    }
    var url = ['http://www.google.com', 'http://www.nccgroup.com'];
    for (var i=1; i <= 2000; i++) {
        responseDatas[i] = {id: i, date: moment().subtract(random(1, 20), 'days').format('YYYY-MM-DD'), url: url[random(0,1)], time: random(10, 500), created: new Date()}
    }
}
seed();
exports.findAll = function(req, res) {
    var l = [];
    for(var key in responseDatas) {
        l.push(responseDatas[key]);
    }
    var data = JSON.stringify(l);
    res.send(data);
    console.log('findAll ', data);
}

exports.findById = function(req, res) {
    var id = req.params.id;
    var data = JSON.stringify(responseDatas[id] || {});
    res.send(data);
    console.log('Send data', id, data);
}

exports.statsById = function(req, res) {
    var id = req.params.id;
    var url = responseDatas[id].url;
    var statsData = [];
    for (var key in responseDatas) {
        if (url == responseDatas[key].url) {
            statsData.push(responseDatas[key]);
        }
    }
    console.log('Stats data', statsData);
    res.send(JSON.stringify(statsData));
}

exports.addResponseData = function(req, res) {
    var responseData = req.body;
    responseData.id = index++;
    responseDatas[responseData.id] = responseData;
    console.log('Adding data', responseData);
    res.send(JSON.stringify(responseData));
}

exports.updateResponseData = function(req, res) {
    var id = req.params.id;
    var responseData = req.body;
    console.log(responseData);
    responseDatas[id] = responseData;
    console.log('Updating data', id, responseData);
    res.send(JSON.stringify(responseData));
}

exports.deleteResponseData = function(req, res) {
    var id = req.params.id;
    delete responseDatas[id];
    console.log('Deleting data', id);
    res.send(JSON.stringify(id));
}
