var properties = require('../../properties.js');
var auth = require('../auth.js');

exports.delete = function(router) {
  console.log('service.path.delete()');
  // router.delete("/v1/auth/code", auth.deleteCode);
};

exports.get = function(router) {
  console.log('service.path.get()');
};

exports.post = function(router) {
  console.log('service.path.post()');
  router.post("/v1/auth", auth.post);
  router.post("/v1/auth/name/password", auth.postNamePasswordUser);
  router.post("/v1/auth/name", auth.postNameUser);
  router.post("/v1/auth/id", auth.postIDUser);
  router.post("/v1/auth/client", auth.postClient);
  router.post("/v1/auth/token", auth.postToken);
  router.post("/v1/auth/code", auth.postCode);
};
