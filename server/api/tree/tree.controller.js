'use strict';

var _ = require('lodash');
var Tree = require('./tree.model');
var jcrOakAPI = require('jcr-oak-api');
var jcrUtils =  require('../../jcr/utils');
var treeService = require('../../api/tree/tree.service');
var nodeTypeService = require('../../api/nodetype/nodetype.service');

function getCleanPath(path){
  var npath = path === '/root' ? '/': path;
  return npath;
}


// Get list of trees
exports.index = function(req, res) {
    var connection = jcrUtils.getConnection();
    treeService.getRootTree(connection, function(err,rootTree){
      connection.end();
      console.log('hola mundo');
      if(err) { return handleError(res, err); }
      if(!rootTree) { return res.send(404); }
      return res.json(rootTree);
    });
};

exports.getChildren = function(req,res){
    var path = getCleanPath(req.params.path);
    var connection = jcrUtils.getConnection();
    treeService.getChildren(connection, path, function(err, children){
      connection.end();
      if(err){return handleError(res, err);}
      if(!children) { return res.send(404); }
      return res.json(children);
    });
};

exports.getNodeType = function(req, res){
  var path = getCleanPath(req.params.path);
  var connection = jcrUtils.getConnection();
  nodeTypeService.getNodeType(connection, path, function(err, nodetype){
    connection.end();
    if(err){return handleError(res, err);}
    if(!nodetype) { return res.send(404); }
    return res.json(nodetype);
  });
};

// Get a single tree
exports.show = function(req, res) {
  var path = getCleanPath(req.params.path);
  var connection = jcrUtils.getConnection();
  treeService.getTree(connection, path, function(err, tree){
    connection.end();
    if(err) { return handleError(res, err); }
    if(!tree) { return res.send(404); }
      return res.json(tree);
  });

};

// Creates a new tree in the DB.
exports.create = function(req, res) {
  var path = getCleanPath(req.params.path);
  var connection = jcrUtils.getConnection();
  treeService.addChild(connection, path, req.body.name, function(err,tree){
    connection.end();
    if(err) { return handleError(res, err); }
    return res.json(201, tree);
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
  var path = getCleanPath(req.params.path);
  var connection = jcrUtils.getConnection();
  treeService.removeTree(connection, path, function(err){
    connection.end();
    if(err) { return handleError(res, err); }
    return res.send(204);
  });
};



function handleError(res, err) {
  console.log(err);
  return res.send(500, err);
}
