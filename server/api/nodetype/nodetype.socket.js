/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Nodetype = require('./nodetype.model');

exports.register = function(socket) {
  Nodetype.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Nodetype.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('nodetype:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('nodetype:remove', doc);
}