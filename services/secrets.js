var Db = require('mysql-activerecord')

var db = new Db.Adapter({
    server: 'localhost',
    username: 'root',
    password: 'eternalpeace',
    database: 'testing'
})

exports.viewAll = function(req, res) {
    db.get('secrets', function(err, results, fields) {
        res.json({
            result: results
        })
    });
}

exports.createRecord = function(req, res) {

    var receivedData = toDecodeAndParse(req.query.input);

    var date = new Date();

    receivedData.data.post_date = date;

    db.insert('secrets', receivedData.data, function(err, info) {
        if (err) {
            res.json({
                error: err
            })
        } else {
            res.json({
                result: 'Record inserted at ' + info.insertId
            })
        }
    })
}

function toDecodeAndParse(encodedData) {
    var decodedData = new Buffer(encodedData, 'base64').toString('ascii')
    var parsedData = JSON.parse(decodedData)
    return parsedData;
}

exports.viewByID = function(req, res) {
    // var input = {
    //     id: 302
    // }
    var receivedData = toDecodeAndParse(req.query.input);

    db.where(receivedData.id)
        .get('secrets', function(err, results, fields) {
            if (err) {
                res.json({
                    error: err
                })
            } else {
                res.json({
                    result: results
                })
            }
        });
}

exports.updateByID = function(req, res) {
    // var input = {
    //     id: 302,
    //     data: {
    //         user: 'Mark',
    //         message: 'I hate to wake up early'
    //     }
    // };

    var receivedData = toDecodeAndParse(req.query.input);

    var date = new Date();

    receivedData.data.post_date = date;
    
    db.where({
        id: receivedData.id
    }).update('secrets', receivedData.data, function(err) {
        if (err) {
            res.json({
                error: err
            })
        } else {
            res.json({
                result: 'Record updated'
            })
        }
    });
}

exports.deleteByID = function(req, res) {
    // var input = {
    //     id: 303
    // }
    var receivedData = toDecodeAndParse(req.query.input);

    db.where({
            id: receivedData.id
        })
        .delete('secrets', function(err) {
            if (err) {
                res.json({
                    error: err
                })
            } else {
                res.json({
                    result: 'Record Deleted'
                })
            }
        });
}
