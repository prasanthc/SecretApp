var Db = require('./db');
var crypto = require('../utils/crypto')


exports.totalCount = function(req, res, next) {
    var receivedData = crypto.decode(req.query.input);
    var searchTags = null;

    if (receivedData.searchTag) {
        searchTags = receivedData.searchTag;
    }

    Db.getNewAdapter(function(db) {
        db.where(searchTags).count('secrets', function(err, results, fields) {
            if (err) {
                res.jsonp({
                    error: err
                })
            } else {
                req.tCount = results;
            }
            db.releaseConnection();
        });
    });
    next();
}

exports.viewAll = function(req, res) {
    Db.getNewAdapter(function(db) {
        db.get('secrets', function(err, results, fields) {
            if (err) {
                res.jsonp({
                    error: err
                })
            } else {
                res.jsonp({
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
    //     searchTag: {
    //         post_location: 'London'
    //     }
    // }

    var receivedData = crypto.decode(req.query.input);

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
                    res.jsonp({
                        error: err
                    })
                } else {
                    res.jsonp({
                        totalCount: req.tCount,
                        result: results
                    })
                }
                db.releaseConnection();
            });
    });
}

exports.createRecord = function(req, res) {
    var receivedData = crypto.decode(req.query.input);
    var date = Date.now();
    receivedData.data.post_date = date;
    Db.getNewAdapter(function(db) {
        db.insert('secrets', receivedData.data, function(err, info) {
            if (err) {

                res.jsonp({
                    error: err
                })
            } else {
                console.log((new Date()) + 'one record inserted');
                res.jsonp({
                    result: 'Record inserted at ' + info.insertId
                })
            }
            db.releaseConnection();
        });
    });
}

exports.viewByID = function(req, res) {
    // var input = {
    //     post_location: 'new york',
    //     user: 'tester'
    // }

    var receivedData = crypto.decode(req.query.input);
    Db.getNewAdapter(function(db) {
        db.where(input)
            .get('secrets', function(err, results, fields) {
                if (err) {
                    res.jsonp({
                        error: err
                    })
                } else {
                    res.jsonp({
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
    var receivedData = crypto.decode(req.query.input);
    Db.getNewAdapter(function(db) {
        db.where(input)
            .get('secrets', function(err, results, fields) {
                if (err) {
                    res.jsonp({
                        error: err
                    })
                } else {
                    res.jsonp({
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

    var receivedData = crypto.decode(req.query.input);
    var date = Date.now();
    receivedData.data.post_date = date;
    Db.getNewAdapter(function(db) {
        db.where({
            id: receivedData.id
        }).update('secrets', receivedData.data, function(err) {
            if (err) {
                res.jsonp({
                    error: err
                })
            } else {

                console.log((new Date()) + 'one record updated');
                res.jsonp({
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
    var receivedData = crypto.decode(req.query.input);
    Db.getNewAdapter(function(db) {
        db.where({
                id: receivedData.id
            })
            .delete('secrets', function(err) {
                if (err) {
                    res.jsonp({
                        error: err
                    })
                } else {
                    console.log((new Date()) + 'one record deleted');
                    res.jsonp({
                        result: 'Record Deleted'
                    })
                }
                db.releaseConnection();
            });
    });
}
