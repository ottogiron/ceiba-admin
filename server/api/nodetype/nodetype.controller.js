'use strict';

var _ = require('lodash');
var Nodetype = require('./nodetype.model');
var jcrOakAPI = require('jcr-oak-api');
var jcrUtils =  require('../../jcr/utils');


// Get list of nodetypes
exports.index = function(req, res) {
  var connection = jcrUtils.getConnection();
  var nodeTypeManager = jcrOakAPI.getTNodeTypeManager(connection);
  nodeTypeManager.getAllNodeTypes(function(err,allNodeTypes){
    if(err){ return handleError(res,err);}
    connection.end();
    return res.json(allNodeTypes);
  });
};

// Get a single nodetype
exports.show = function(req, res) {
  Nodetype.findById(req.params.id, function (err, nodetype) {
    if(err) { return handleError(res, err); }
    if(!nodetype) { return res.send(404); }
    return res.json(nodetype);
  });
};

// Creates a new nodetype in the DB.
exports.create = function(req, res) {
  Nodetype.create(req.body, function(err, nodetype) {
    if(err) { return handleError(res, err); }
    return res.json(201, nodetype);
  });
};

// Updates an existing nodetype in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Nodetype.findById(req.params.id, function (err, nodetype) {
    if (err) { return handleError(res, err); }
    if(!nodetype) { return res.send(404); }
    var updated = _.merge(nodetype, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, nodetype);
    });
  });
};

// Deletes a nodetype from the DB.
exports.destroy = function(req, res) {
  Nodetype.findById(req.params.id, function (err, nodetype) {
    if(err) { return handleError(res, err); }
    if(!nodetype) { return res.send(404); }
    nodetype.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
