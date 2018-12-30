var database = require('./database.js');
var sql = require('./relational/sql.js');
var bcrypt = require('bcryptjs');
var user = require('./object/user.js');
var client = require('./object/client.js');
var code = require('./object/code.js');
var token = require('./object/token.js');


exports.getNamePasswordUser = function(name, password, callback) {
  console.log("relational.getNamePasswordUser")
  this.getNameUser(name, function(err, user) {
    if (err) {
      return callback(err, null);
    } else {
      console.log("bcrypt start)))))))))))))))))))))))))))))))))");
      bcrypt.compare(password, user.password, function(err, result) {
        console.log("bcrypt compare");
        if (err) {
          return callback(err, null);
        }
        if (result) {
          // return callback(null, user);
          database.getQueryResult(sql.updateUserLogin(user), function(err, result, fields) {
            return callback(null,user);
          });
        } else {
          return callback(err, null);
        }
      });
    }
  });
};


exports.getNameUser = function(name, callback) {
  console.log('relational.getNameUser');
  if (typeof name !== "undefined") {
    database.getQueryResult(sql.selectNameUser(name), function(err, result) {
      u = null;
      if (result !== undefined && result != null && result.length > 0) {
        u = new user();
        u.idUser = result[0].id;
        u.idAccount = result[0].idAccount;
        u.name = result[0].name;
        u.email = result[0].email;
        u.role = result[0].role;
        u.password = result[0].password;
      } else {
        return callback(new Error("user is null"), null);
      }
      return callback(err, u);
    });
  } else {
    return callback(new Error("typeof name === \"undefined\""), null);
  }
};

exports.getClient = function(identification, callback) {
  console.log('relational.getClient');
  if (typeof identification !== "undefined") {
    database.getQueryResult(sql.selectClient(identification), function(err, result) {
      var c = null;
      if (result !== undefined && result.length > 0) {
        c = new client();
        c.idClient = result[0].id;
        c.idUser = result[0].idUser;
        c.name = result[0].name;
        c.identification = result[0].identification;
        c.secret = result[0].secret;
      }
      return callback(err, c);
    });
  } else {
    return callback(new Error("typeof identification === \"undefined\""), null);
  }
}


exports.getIDUser = function(id, callback) {
  console.log('relational.getIDUser ' + id);
  if (typeof id !== "undefined") {
    database.getQueryResult(sql.selectIDUser(id), function(err, result) {
      if (err) throw err;
      if (result !== undefined && result != null && result.length > 0) {
        u = new user();
        u.idUser = result[0].id;
        u.name = result[0].name;
        u.email = result[0].email;
        u.role = result[0].role;
        u.password = result[0].password;
        return callback(err, u);
      } else {
        return callback(err, null);
      }

    });
  } else {
    return callback(new Error("typeof id === \"undefined\""), null);
  }
};

exports.setToken = function(value, idUser, idClient, callback) {
  console.log('relational.setToken');
  if (typeof value !== "undefined") {
    database.getQueryResult(sql.insertToken(value, idClient, idUser), function(err, result) {
        // if(err) throw err;
        var t = new token();
        t.idClient = idClient;
        t.idUser = idUser;
        t.value = value;
        return callback(null,t);
      });
  } else {
    return callback(new Error("typeof token === \"undefined\""), null);
  }
}


exports.getToken = function(key, callback) {
  console.log('relational.getToken');
  if (typeof key !== "undefined" && key !== 'null') {
    database.getQueryResult(sql.selectToken(key), function(err, result) {
      var t = null;
      if (result !== undefined && result.length > 0) {
        t = new token();
        t.idToken = result[0].id;
        t.idClient = result[0].idClient;
        t.idUser = result[0].idUser;
        t.value = result[0].value;
      }
      return callback(err, t);
    });
  } else {
    return callback(new Error("typeof key === \"undefined\""), null);
  }
}

exports.setCode = function(value, idClient, idUser, redirectURI, callback) {
  console.log('relational.setCode');
  if (typeof code !== "undefined") {
    database.getQueryResult(sql.insertCode(value, idClient, idUser, redirectURI), function(err, result) {
        var c = new code();
        c.value = value;
        c.idClient = idClient;
        c.idUser = idUser;
        c.redirectURI = redirectURI;
        console.log(c);
        return callback(null, c);
      });
  } else {
    return callback(new Error("typeof code === \"undefined\""));
  }
}



exports.getCode = function(key, callback) {
  console.log('relational.getCode');
  if (typeof key !== "undefined") {
    database.getQueryResult(sql.selectCode(key), function(err, result) {
      if(err) {
        return callback(err,null);
      }
      var c = new code();
      if (result !== undefined && result != null && result.length > 0) {
        c.idCode = result[0].id;
        c.idClient = result[0].idClient;
        c.idUser = result[0].idUser;
        c.value = result[0].value;
        c.redirectURI = result[0].redirectURI;
      }
      return callback(err, c);
    });
  } else {
    return callback(new Error("typeof key === \"undefined\""), null);
  }
}


exports.removeCode = function(value, callback) {
  console.log('relational.removeCode');
  if (typeof value !== "undefined") {
    database.getQueryResult(sql.deleteCode(value), function(err, result) {
      if (err) throw err;
      callback(err, result);
    });
  } else {
    return callback(new Error("typeof value === \"undefined\""), null);
  }
}
