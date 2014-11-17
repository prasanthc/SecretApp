var Db = require('./db');

exports.viewAll = function(req, res) {
    Db.getNewAdapter(function(db) {
        db.get('secrets', function(err, results, fields) {
            if (err) {
                res.json({
                    error: err
                })
            } else {
                res.json({
                    result: results
                })
            }
            db.releaseConnection();
        });
    });
}

exports.viewFiveRecords = function(req, res) {
    var tagToSearch = null;
    var tempItemOrder = null;

    // to test
    // var receivedData = {
    //     pageNo: 1,
    //     tag: {
    //         post_location: 'chennai'
    //     },
    //     orderBy: {
    //         field: 'user',
    //         ascOrDesc: 'asc'
    //     }
    // }

    var receivedData = toDecodeAndParse(req.query.input);

    if (receivedData.orderBy) {
        tempItemOrder = receivedData.orderBy.field + " " + receivedData.orderBy.ascOrDesc;
    }

    if (receivedData.searchTag) {
        tagToSearch = receivedData.searchTag;
    }

    var recordSet = (receivedData.pageNo - 1) * 5;
    Db.getNewAdapter(function(db) {
        db
            .where(tagToSearch)
            .limit(5, recordSet)
            .order_by(tempItemOrder)
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
                db.releaseConnection();
            });
    });
}

exports.createRecord = function(req, res) {
    var receivedData = toDecodeAndParse(req.query.input);
    var date = new Date();
    receivedData.data.post_date = date;
    Db.getNewAdapter(function(db) {
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
            db.releaseConnection();
        });
    });
}

function toDecodeAndParse(encodedData) {
    var decodedData = new Buffer(encodedData, 'base64').toString('ascii')
    var parsedData = JSON.parse(decodedData)
    return parsedData;
}

exports.viewByID = function(req, res) {
    var input = {
        post_location: 'new york',
        user: 'tester'
    }
    input = null;
    // var receivedData = toDecodeAndParse(req.query.input);
    var receivedData = req.query.input;
    Db.getNewAdapter(function(db) {
        db.where(input)
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
                db.releaseConnection();
            });
    });
}

exports.viewRecordsByTag = function(req, res) {
    // var input = {
    //         post_location: 'New York'
    //     }
    var receivedData = toDecodeAndParse(req.query.input);
    Db.getNewAdapter(function(db) {
        db.where(input)
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
                db.releaseConnection();
            })
    })
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
    Db.getNewAdapter(function(db) {
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
            db.releaseConnection();
        });
    });
}

exports.deleteByID = function(req, res) {
    // var input = {
    //     id: 303
    // }
    var receivedData = toDecodeAndParse(req.query.input);
    Db.getNewAdapter(function(db) {
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
                db.releaseConnection();
            });
    });
}
