var Db = require('./db');
var crypto = require('../utils/crypto')


exports.register = function(req, res) {
    var receivedData = req.query.input;
    var parsedData = JSON.parse(receivedData);
    Db.getNewAdapter(function(db) {
        db.insert('app_users', parsedData, function(err, info) {
            if (err) {
                res.jsonp({
                    error: err,
                    info: info
                })
            } else {
                console.log((new Date()) + 'one record inserted');
                res.jsonp({
                    success: 'Record inserted at ' + info.insertId
                })
            }
            db.releaseConnection();
        });
    });
}

exports.login = function(req, res) {
    var receivedData = req.query.input;
    var parsedData = JSON.parse(receivedData);
    var inputData = {
        email: parsedData.email
    };
    Db.getNewAdapter(function(db) {
        db.where(inputData)
            .get('app_users', function(err, results, fields) {
                if (err) {
                    res.jsonp({
                        error: err
                    })
                } else {
                    if (results[0]) {
                        if (parsedData.password == results[0].password) {
                            req.session.isLogged = true;
                            res.jsonp({
                                result: {
                                    nickName: results[0].nick_name,
                                    email: results[0].email
                                }
                            })
                        } else {
                            res.jsonp({
                                result: {
                                    error: "password is incorrect"
                                }
                            })
                        }
                    } else {
                        res.jsonp({
                            result: {
                                error: "You have not registered yet"
                            }
                        })
                    }
                }
                db.releaseConnection();
            });
    });
}


exports.logout = function(req, res, next) {
    req.session.isLogged = false;
}


exports.emailCheck = function(req, res, next) {
    var receivedData = req.query.input;
    var parsedData = JSON.parse(receivedData);
    var inputData = {
        email: parsedData.email
    };
    Db.getNewAdapter(function(db) {
        db.where(inputData)
            .get('app_users', function(err, results, fields) {
                if (err) {
                    res.jsonp({
                        error: err
                    })
                } else {
                    if (results[0]) {
                        res.jsonp({
                            error: "This email is already registered"
                        })
                    } else {
                        next();
                    }
                }
                db.releaseConnection();
            });
    });
}
