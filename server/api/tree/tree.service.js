var jcrOakAPI = require('jcr-oak-api');
var async = require('async');
var tree_types = jcrOakAPI.tree_types;

var getTree = function(connection, path, callback){
  var rootService = jcrOakAPI.getTRootService(connection);
  var treeService = jcrOakAPI.getTTreeService(connection);
  async.waterfall([
      function(callback){
        rootService.getTree(path,function(err,tree){
          callback(err,tree);
        });
      },
      function(tree,callback){
        treeService.getProperties(tree,function(err,properties){
          tree.properties = properties;
          callback(err,tree);
        });
      }
    ]
  ,function(err,result){
      callback(err,result);
  });
};

var getRootTree = function(connection, callback){
  getTree(connection, '/', function(err,tree){
    callback(err,tree);
  });
};

var getChildren = function(connection, path, callback){
  async.waterfall([
      function(callback){
        jcrOakAPI.getTRootService(connection)
          .getTree(path,function(err,tree){
            callback(err,tree);
          });
      },
      function(tree,callback){
        jcrOakAPI.getTTreeService(connection)
          .getChildren(tree,function(err,children){
            callback(err,children);
          });
      }
    ]
  ,function(err, children){
    callback(err,children);
  });

};


var addChild = function(connection, path, name, primaryType, callback){
  jcrOakAPI.getTRootService(connection).getTree(path, function(err,parentTree){
      var children = new tree_types.TTree({path: path });
      jcrOakAPI.getTTreeService(connection).addChild(name, primaryType,children, function(err,tree){
        callback(err,tree);
      });
  });
};

var removeTree = function(connection, path, callback){
  jcrOakAPI.getTRootService(connection).getTree(path,function(err,tree){
    jcrOakAPI.getTTreeService(connection).remove(tree,function(err) {
      callback(err);
    });
  });
};



module.exports.getRootTree = getRootTree;
module.exports.getTree = getTree;
module.exports.getChildren = getChildren;
module.exports.addChild = addChild;
module.exports.removeTree = removeTree;
