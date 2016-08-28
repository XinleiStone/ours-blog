
var mysql = require('mysql');
var dbconfig = require('../../config/config');

var connection = mysql.createConnection(dbconfig.connection);

connection.query('CREATE DATABASE ' + dbconfig.database);

connection.query('\
CREATE TABLE `' + dbconfig.database + '`.`' + dbconfig.users_table + '` ( \
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT, \
    `username` VARCHAR(20) NOT NULL, \
    `password` CHAR(60) NOT NULL, \
        PRIMARY KEY (`id`), \
    UNIQUE INDEX `id_UNIQUE` (`id` ASC), \
    UNIQUE INDEX `username_UNIQUE` (`username` ASC) \
)');

console.log('Success: Database Users Created!')

connection.query('\
CREATE TABLE `' + dbconfig.database + '`.`' + dbconfig.notes_table + '` ( \
    `id` bigint(20) NOT NULL AUTO_INCREMENT,\
    `content` varchar(255) DEFAULT NULL,\
    `time` datetime DEFAULT NULL,\
    `title` varchar(255) DEFAULT NULL,\
    `userId` int(11) NOT NULL,\
        PRIMARY KEY (`id`), \
    UNIQUE INDEX `id_UNIQUE` (`id` ASC)\
)');

console.log("Success: Database Notes Created")
connection.end();
