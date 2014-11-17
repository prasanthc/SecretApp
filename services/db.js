var Db = require('mysql-activerecord');

var pool = new Db.Pool({
    server: 'localhost',
    username: 'root',
    password: 'eternalpeace',
    database: 'testing'
});

exports.getNewAdapter = pool.getNewAdapter.bind(pool)

