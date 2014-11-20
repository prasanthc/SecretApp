var Db = require('mysql-activerecord');

var pool = new Db.Pool({
    server: '127.0.0.1',
    username: 'adminmVpqdHM',
    password: 'E7MhcAeUBeWl',
    database: 'secretypost'
});

exports.getNewAdapter = pool.getNewAdapter.bind(pool)
