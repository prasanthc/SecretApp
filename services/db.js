var Db = require('mysql-activerecord');

var pool = new Db.Pool({
    // server: process.env.OPENSHIFT_MYSQL_DB_HOST,
    // username: 'adminmVpqdHM',
    // password: 'E7MhcAeUBeWl',
    // database: 'secretypost'

    server: 'localhost',
    username: 'root',
    password: 'eternalpeace',
    database: 'testing'
});



exports.getNewAdapter = pool.getNewAdapter.bind(pool)
