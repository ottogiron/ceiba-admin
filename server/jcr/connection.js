var jcrOakAPI = require('jcr-oak-api');
var connection;

function getConnection() {
    var connection;
    try {
         connection = jcrOakAPI.getConnection({
            host: 'localhost',
            port: 9090
        });
    }
    catch(err) {
        console.log(err);
    } 
    return connection;
}


exports.getConnection = getConnection;