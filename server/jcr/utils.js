var jcrOakAPI = require('jcr-oak-api');


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

var getTreeService = function(){
  var treeService = jcrOakAPI.getTTreeService(getConnection());
  return treeService;
}

var getRootService = function(){
  var rootService = jcrOakAPI.getTRootService(getConnection());
  return rootService;
}


module.exports = {
  getConnection: getConnection,
  getTreeService: getTreeService,
  getRootService: getRootService
}
