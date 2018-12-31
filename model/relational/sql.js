exports.selectNameUser = function (name) {
    return 'SELECT u.id, u.idAccount, u.name, u.password, u.registerDate, u.activityDate, u.login, u.role FROM auth.User u  WHERE name = \'' + name + '\';';
};

exports.updateUserLogin = function (user) {
    return 'UPDATE auth.User SET login=login + 1, activityDate=NOW() WHERE id=' + user.idUser + ';';
};


exports.selectIDUser = function (idUser) {
    return 'SELECT u.id, u.idAccount, u.name, u.password, u.registerDate, u.activityDate, u.login, u.role FROM auth.User u WHERE id ='  + idUser + ';';
    // SELECT u.idUser, u.name, u.password, u.registerDate, u.activityDate, u.login, u.role, e.address AS email, q.path AS path FROM User u LEFT OUTER JOIN Email e ON e.idUser=u.idUser  WHERE u.idUser = 1;
};


exports.insertToken = function (value, idClient, idUser) {
    return 'INSERT INTO auth.`Token` (value,idClient,idUser) VALUES (\'' + value + '\',' + idClient + ',' + idUser + ');';
}



exports.selectCode = function (key) {
    return 'SELECT id,idClient,idUser,redirectURI, value FROM auth.`Code` where value=\'' + key + '\';';
}

exports.selectToken = function (key) {
    return 'SELECT id,idClient,idUser, value FROM `Token` where value=\'' + key + '\';';
}

exports.selectClient = function (identification) {
    return 'SELECT id, idUser, name, identification, secret FROM auth.Client where identification=\'' + identification + '\';';
}


exports.insertCode = function (value, idClient, idUser, redirectURI) {
    return 'INSERT INTO auth.`Code` (value,idClient,idUser,redirectURI) VALUES (\'' + value + '\',' + idClient + ',' + idUser + ',\'' + redirectURI + '\');';
}

exports.deleteCode = function (value) {
    return 'DELETE FROM `Code` where value=\'' + value + '\';';
}

exports.insertUser = function(user) {
    var sql ="INSERT INTO auth.Account (`uuid`) VALUES (uuid());";
    sql += "SET @idAccount = LAST_INSERT_ID();"
    sql+= "INSERT INTO auth.User (idAccount, name, password,role,`uuid`) VALUES (@idAccount, \""+user.name+"\", \""+user.password+"\", \""+user.role+"\", uuid());";
    sql += "COMMIT;";
    sql += "SET @idUser=LAST_INSERT_ID();"
    sql += "SELECT id AS idUser, idAccount, role, password, name FROM auth.User where id=@idUser;";
    return sql;
}
