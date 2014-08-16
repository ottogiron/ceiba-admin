var jcrOakAPI = require('jcr-oak-api');
var connection;


var connection = jcrOakAPI.getConnection({
            host: 'localhost',
            port: 9090
        });

function getConnection() {
    if (!connection) {
        connection = jcrOakAPI.getConnection({
            host: 'localhost',
            port: 9090
        });
    }
    return connection;
}



exports.getConnection = getConnection;