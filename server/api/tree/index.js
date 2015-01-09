'use strict';

var express = require('express');
var controller = require('./tree.controller');

var pathRegExp = ':path(/*)';
var router = express.Router();
router.get('/', controller.index);
router.get(pathRegExp + '/children',controller.getChildren);
router.get(pathRegExp, controller.show);
router.post(pathRegExp + '/children', controller.create);
router.put(pathRegExp, controller.update);
router.patch(pathRegExp, controller.update);
router.delete(pathRegExp, controller.destroy);

module.exports = router;
