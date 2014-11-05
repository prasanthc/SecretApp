var express = require('express')
var secrets = require('./services/secrets')


var app = express()

app.set('port', 3000)

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {})

app.get('/secrets', secrets.viewAll)

app.get('/secret/view', secrets.viewByID)

app.post('/secret/create', secrets.createRecord)

app.put('/secret/update', secrets.updateByID)

app.delete('/secret/delete', secrets.deleteByID)


var server = app.listen(app.get('port'), function() {
    var host = server.address().address
    var port = server.address().port
    console.log('Listening at http://%s:%s', host, port);
})
