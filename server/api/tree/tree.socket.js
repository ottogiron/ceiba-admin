/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Tree = require('./tree.model');

exports.register = function(socket) {
  Tree.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Tree.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('tree:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('tree:remove', doc);
}