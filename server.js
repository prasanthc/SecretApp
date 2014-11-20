var express = require('express'),
    cors = require('cors'),
    // secrets = require('./services/secrets')
    secrets = require('./services/secrets-pooling')


var app = express()

// app.set('port', 3000);

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
// var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
var port = 3000;

app.use(cors());

// app.use(function(req, res, next) {
//     var clientKey = req.headers['x-auth-key'];
//     var acceptedKey = 'abc123';
//     if (clientKey !== acceptedKey) {
//         res.status(401).end();
//     } else {
//         next();
//     }
// });

// app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {}) 

app.get('/secrets', secrets.viewAll)

app.get('/secrets/viewfive', secrets.totalCount, secrets.viewFiveRecords)

app.get('/secrets/viewByTag', secrets.viewRecordsByTag)

app.get('/secret/view', secrets.viewByID)

app.post('/secret/create', secrets.createRecord)

app.put('/secret/update', secrets.updateByID)

app.delete('/secret/delete', secrets.deleteByID)


var server = app.listen(port, ipaddress, function() {
    // var host = server.address().address
    // var port = server.address().port
    // console.log('Listening at http://%s:%s', host, port);
     console.log((new Date()) + ' Server is listening on port 3000');
})
