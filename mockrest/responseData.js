var responseDatas = {};
var index = 1;
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
