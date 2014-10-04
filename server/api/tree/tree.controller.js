'use strict';

var _ = require('lodash');
var Tree = require('./tree.model');
var jcrOakAPI = require('jcr-oak-api');
var tree_types = jcrOakAPI.tree_types;
var jcrConnectionFactory =  require('../../jcr/connection');


var connection = jcrConnectionFactory.getConnection();
var treeService = jcrOakAPI.getTTreeService(connection);
var rootService = jcrOakAPI.getTRootService(connection);

// Get list of trees
exports.index = function(req, res) {  
    //get the root tree
    rootService.getTree('/', function(err, tree) {
       if(err) { return handleError(res, err); }
       if(!tree) { return res.send(404); }
       return res.json([tree]);
    });
};

exports.getChildren = function(req,res){
    var path = decodeURIComponent(req.params.id);
    rootService.getTree(path,function(err,tree){
      if(err){return handleError(res, err);}
      if(!tree) { return res.send(404); }
      treeService.getChildren(tree,function(err,children){
        if(err){return handleError(res, err);}
        if(!children) { return res.send(404); }
        return res.json(children);
      });      
    });
};

// Get a single tree
exports.show = function(req, res) {
  rootService.getTree(req.params.id, function(err, tree) {
       if(err) { return handleError(res, err); }
       if(!tree) { return res.send(404); }
       treeService.getProperties(tree,function(err,properties){
           if(err) { return handleError(res, err); }
           if(!properties) { return res.send(404); }
           tree.properties = properties;
           return res.json(tree);
       });
       
    });
};

// Creates a new tree in the DB.
exports.create = function(req, res) {
  rootService.getTree(req.body.parentPath,function(err,parentTree){
      if(err || !parentTree.exists) { return handleError(res,err);}
      var children = new tree_types.TTree({path: req.body.parentPath });
      treeService.addChild(req.body.name,children,function(err,tree){
        if(err) { return handleError(res, err); }
        return res.json(201, tree);
    });
  });
  
};

// Updates an existing tree in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Tree.findById(req.params.id, function (err, tree) {
    if (err) { return handleError(res, err); }
    if(!tree) { return res.send(404); }
    var updated = _.merge(tree, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, tree);
    });
  });
};

// Deletes a tree from the DB.
exports.destroy = function(req, res) {
  var path = decodeURIComponent(req.params.id);
  rootService.getTree(path,function(err,tree){
    if(err) { return handleError(res, err); }
    if(!tree) { return res.send(404); }
    treeService.remove(tree,function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    }); 
  }); 
};

function handleError(res, err) {
  return res.send(500, err);
}