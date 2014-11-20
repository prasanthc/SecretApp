var Db = require('mysql-activerecord');

var pool = new Db.Pool({
    server: 'mysql://$OPENSHIFT_MYSQL_DB_HOST:$OPENSHIFT_MYSQL_DB_PORT/',
    username: 'adminmVpqdHM',
    password: 'E7MhcAeUBeWl',
    database: 'secretypost'
});

exports.getNewAdapter = pool.getNewAdapter.bind(pool)
