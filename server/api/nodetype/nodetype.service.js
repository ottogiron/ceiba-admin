var jcrOakAPI = require('jcr-oak-api');
var async = require('async');
var treeService = require('../../api/tree/tree.service');
var _ = require('lodash');
var tree_types = jcrOakAPI.tree_types;

var getNodeType = function(connection, path, callback){

  var nodeTypeManager = jcrOakAPI.getTNodeTypeManager(connection);

  async.waterfall([
      function(callback){
        treeService.getTree(connection, path ,function(err,tree){
          callback(err,tree);
        })
      },
      function(tree,callback){
        var dummyType = {propertyDefinitions: [], childNodeDefinitions:[]};
        if(tree.properties['jcr:primaryType']){
          var primaryType = tree.properties['jcr:primaryType'].stringValue;
          nodeTypeManager.getNodeType(primaryType,function(err,nodetype){
            nodetype.propertyDefinitions = _.map(nodetype.propertyDefinitions,mapPropertyDefinitonTypesToString);
            callback(err,nodetype);
          });
        }
        else{
          callback(null,dummyType);
        }
      }
    ]
  ,function(err,nodetype){
      callback(err,nodetype);
  });
};

function mapPropertyDefinitonTypesToString(propertyDefinition){

    _.forEach(tree_types.TType,function(n,key){
      if(n === propertyDefinition.requiredType){
          propertyDefinition.requiredType = key;
          return;
      }
    });
   return propertyDefinition;
}


module.exports.getNodeType = getNodeType;
