'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var jcrOakAPI = require('jcr-oak-api');
var jcrUtils =  require('../../jcr/utils');


describe('GET /api/nodetypes', function() {
var connection;

  beforeEach(function(done){
    connection = jcrUtils.getConnection();
    done();
  });

  afterEach(function(done){
    if(connection){
      connection.end();
    }
    done();
  });

  it('should respond with JSON array', function(done) {
    request(app)
      .get('/api/nodetypes')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        done();
      });
  });

  it('should return a JSON array of nodetypes',function(done){
    var nodeTypeManager = jcrOakAPI.getTNodeTypeManager(connection);
    nodeTypeManager.should.be.ok;
    nodeTypeManager.getAllNodeTypes(function(err,nodeTypes){
      nodeTypes.should.be.an.instanceOf(Array);
      nodeTypes.length.should.be.above(0);    
      done();
    });
  });

});
