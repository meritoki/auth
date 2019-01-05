/*
 * Name: User.js
 * Date: 2015-07-08
 * Author: Joaquin Osvaldo Rodriguez
 */
var relational = require('../../model/relational.js');
var properties = require('../properties.js');
var http = require('http');

exports.post = function(req, res, next) {
  var user = req.body;
  console.log(user);
  relational.setAuth(user, function (error, user) {
    if (error) {
      console.log(error);
      var status = 500;
      res.status(status).end(http.STATUS_CODES[status]);
    } else {
      res.end(JSON.stringify(user));
    }
  });
}

exports.postNamePasswordUser = function(req, res, next) {
  console.log('postNamePasswordUser');
  var name = req.body.name;
  var password = req.body.password;
  relational.getNamePasswordUser(name, password, function (error, u) {
    if (error) {
      console.log(error);
      var status = 401;
      res.status(status).end(http.STATUS_CODES[status]);
    } else {
      if(u) {
        res.end(JSON.stringify(u));
      } else {
        var status = 401;
        res.status(status).end(http.STATUS_CODES[status]);
      }
    }
  });
};

exports.postNameUser = function(req, res, next) {
  console.log('postNameUser');
  var name = req.body.name;
  relational.getNameUser(name, function (error, u) {
    if (error) {
      console.log(error);
      var status = 401;
      res.status(status).end(http.STATUS_CODES[status]);
    } else {
      res.end(JSON.stringify(u));
    }
  });
};

exports.postIDUser = function(req, res, next) {
  console.log('postIDUser');
  var idUser = req.body.iduser;
  relational.getIDUser(idUser, function (error, u) {
    if (error) {
      console.log(error);
      var status = 401;
      res.status(status).end(http.STATUS_CODES[status]);
    } else {
      if(u) {
        res.end(JSON.stringify(u));
      } else {
        var status = 401;
        res.status(status).end(http.STATUS_CODES[status]);
      }
    }
  });
};

exports.postClient = function(req, res, next) {
  console.log('postClient');
  var identification = req.body.identification;
  relational.getClient(identification, function (error, c) {
    if (error) {
      console.log(error);
      var status = 401;
      res.status(status).end(http.STATUS_CODES[status]);
    } else {
      if(c) {
        res.end(JSON.stringify(c));
      } else {
        var status = 401;
        res.status(status).end(http.STATUS_CODES[status]);
      }
    }
  });
};

exports.postToken = function(req, res, next) {
  console.log('postToken');
  var key = req.body.key;
  if(key != undefined && key != null) {
    relational.getToken(key, function (error, token) {
      if (error) {
        console.log(error);
        var status = 401;
        res.status(status).end(http.STATUS_CODES[status]);
      } else {
        res.end(JSON.stringify(token));
      }
    });
  } else {
    var token = req.body.token;
    var idUser = req.body.idUser;
    var idClient = req.body.idClient;
    relational.setToken(token, idUser, idClient, function (error, token) {
      if (error) {
        console.log(error);
        var status = 401;
        res.status(status).end(http.STATUS_CODES[status]);
      } else {
        res.end(JSON.stringify(token));
      }
    });
  }
};

exports.postCode = function(req, res, next) {
  console.log('postCode');
  var key = req.body.key;
  if(key != undefined && key != null) {
    relational.getCode(key, function (error, code) {
      if (error) {
        console.log(error);
        var status = 401;
        res.status(status).end(http.STATUS_CODES[status]);
      } else {
        res.end(JSON.stringify(code));
      }
    });
  } else {
    var value = req.body.value;
    var idUser = req.body.idUser;
    var idClient = req.body.idClient;
    var redirectURI = req.body.redirectURI;
    relational.setCode(value, idUser, idClient, redirectURI,  function (error, code) {
      if (error) {
        res.end(JSON.stringify(error));
      }
      res.end(JSON.stringify(code));

    });
  }
};

exports.deleteCode = function (req,res,next) {
  var key = req.body.key;
  relational.getRemoveCode(key, function (error, result) {
    if (error) {
      res.end(error);
    } else {
      res.end(JSON.stringify("message:success"));
    }
  });
}
