var express = require('express');
var spawn = require('child_process').spawn;
var request = require('request');
var bodyParser = require('body-parser');

var server = express();
server.use(bodyParser.json()); // support json encoded bodies
server.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// Arguments for spawn sysdig
var sysdigArguments = ['-r', 'capture.scap', '-u', '-N'];

// // Spawned sysdig object
var sysdig = spawn('sysdig', sysdigArguments);

///
///     Callback when process write data on std
///
sysdig.stdout.on('data', function (data) {
    console.log('stdout: ' + data);
});

sysdig.stderr.on('data', function (data) {
    console.log('stderr: ' + data);
});

sysdig.on('close', function (code) {
    console.log('Sysdig exited with code ' + code);
});


///
///     Server API
///
var baseHost = 'http://127.0.0.1:8080';
var baseRequest = {
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Accept': 'application/json, text/javascript, */*; q=0.01',
        'Connection': 'keep-alive',
    }
};

var baseGET = function(req, res) {
    var newReq = baseRequest;
    newReq.method = 'GET';
    newReq.url = baseHost + req.url;
    request(newReq, function(error, response, body){
        if(error) {
            console.log(error);
        } else {
            res.send(body);
        }
    });
};

var basePOST = function(req, res) {
    var newReq = baseRequest;
    newReq.method = 'POST';
    newReq.url = baseHost + req.url;
    newReq.json = req.body;
    request(newReq, function(error, response, body){
        if(error) {
            console.log(error);
        } else {
            res.send(body);
        }
    });
};

// GET
server.get(
    ['/ui/bootstrap', '/ui/settings', 
     '/api/events', '/api/fields', 
     '/api/captures/:path/data?', 
     '/api/captures/:path/stat'],
    baseGET);
// POST
server.post(
    ['/ui/bootstrap', '/ui/settings',
     '/api/captures', '/api/session', 
     '/api/terminate'],
    basePOST);
// DELETE
server.delete('/api/session', baseGET);


///
///     Server Listen
///
var instance = server.listen(3000, function () {
    var host = instance.address().address;
    var port = instance.address().port;

    console.log('Server listen at %s:%s', host, port);
});