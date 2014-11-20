var Db = require('mysql-activerecord');

var pool = new Db.Pool({
    server: process.env.OPENSHIFT_MYSQL_DB_HOST,
    username: 'adminmVpqdHM',
    password: 'E7MhcAeUBeWl',
    database: 'secretypost'
});

console.log("MySQL Host: "+ process.env.OPENSHIFT_MYSQL_DB_HOST);
exports.getNewAdapter = pool.getNewAdapter.bind(pool)
