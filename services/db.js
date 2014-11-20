var Db = require('mysql-activerecord');

var pool = new Db.Pool({
    server: 'localhost',
    username: 'adminmVpqdHM',
    password: 'E7MhcAeUBeWl',
    database: 'secretypost'
});

exports.getNewAdapter = pool.getNewAdapter.bind(pool)
