var jcrOakAPI = require('jcr-oak-api');
var async = require('async');
var treeService = require('../../api/tree/tree.service');

module.exports.getNodeType = function(connection, path, callback){


  var nodeTypeManager = jcrOakAPI.getTNodeTypeManager(connection);

  async.waterfall([
      function(callback){
        treeService.getTree(connection, path ,function(err,tree){
          callback(err,tree);
        })
      },
      function(tree,callback){
        var primaryType = tree.properties['jcr:primaryType'].stringValue;
        nodeTypeManager.getNodeType(primaryType,function(err,nodetype){
          callback(err,nodetype);
        });

      }
    ]
  ,function(err,nodetype){
      callback(err,nodetype);
  });

};
