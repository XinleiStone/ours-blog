// 实现与MySQL交互
var mysql = require('mysql');
var $conf = require('../config/config');
/*var $util = require('../util/util');*/
var $sql = require('./notesMapping');


// 使用连接池，提升性能
var pool = mysql.createPool({
    host: $conf.connection.host,
    user: $conf.connection.user,
    password: $conf.connection.password,
    database: $conf.database,
    port: $conf.port
});

// 向前台返回JSON方法的简单封装
var jsonWrite = function(res, ret) {
    if (typeof ret === 'undefined') {
        res.json({
            code: '1',
            msg: '操作失败'
        });
    } else {
        res.json(ret);
    }
};

module.exports = {
    add: function(req, res, next) {
        pool.getConnection(function(err, connection) {
            // 获取前台页面传过来的参数
            var param = req.body;

            var date = new Date();
            var year = date.getFullYear(); //获取当前年份
            var mon = date.getMonth() + 1; //获取当前月份
            var da = date.getDate(); //获取当前日
            var h = date.getHours(); //获取小时
            var m = date.getMinutes(); //获取分钟
            var s = date.getSeconds(); //获取秒

            var now = year + "-" + mon + "-" + da + "-" + h + ":" + m + ":" + s;

            // 建立连接，向表中插入值
            connection.query($sql.insert, [param.content, now, param.title, req.user.id], function(err, result) {
                if (result) {
                    // 释放连接 
                    connection.release();
                    next();
                } else {
                    // 释放连接 
                    connection.release();
                    next("error");
                }
            });
        });
    },
    getNotesList: function(req, res, next) {
        pool.getConnection(function(err, connection) {
            // 获取前台页面传过来的参数
            var param = req.query || req.params;

            // 建立连接，获取相应userid的notes
            connection.query($sql.queryByUserId, [req.user.id], function(err, result) {
                if (result) {
                    req.resultData = result;
                    // 释放连接 
                    connection.release();
                    return next();
                } else {
                    // 释放连接 
                    connection.release();
                    return next("error");
                }
                // res.redirect('/');

            });
        });
    },
    display: function(req, res, next) {
        pool.getConnection(function(err, connection) {
            // 获取前台页面传过来的参数
            var param = req.query || req.params;
            if (!param.id) {
                param.id = req.body.id;
            }

            // 建立连接，获取相应userid的notes
            connection.query($sql.queryByNoteId, param.id, function(err, result) {
                if (result) {
                    req.resultData = result;
                    // 释放连接 
                    connection.release();
                    return next();
                } else {
                    // 释放连接 
                    connection.release();
                    return next("error");
                }
                // res.redirect('/');

            });
        });
    },
    modify: function(req, res, next) {
        pool.getConnection(function(err, connection) {
            // 获取前台页面传过来的参数
            var param = req.body;

            var date = new Date();
            var year = date.getFullYear(); //获取当前年份
            var mon = date.getMonth() + 1; //获取当前月份
            var da = date.getDate(); //获取当前日
            var h = date.getHours(); //获取小时
            var m = date.getMinutes(); //获取分钟
            var s = date.getSeconds(); //获取秒

            var now = year + "-" + mon + "-" + da + "-" + h + ":" + m + ":" + s;

            // 建立连接，获取相应userid的notes
            connection.query($sql.update, [param.content, now, param.title, req.user.id, param.id], function(err, result) {
                if (!err) {
                    // 释放连接 
                    connection.release();
                    return next();
                } else {
                    // 释放连接 
                    connection.release();
                    return next("error");
                }
            });
        });
    },
    delete: function(req, res, next) {
        pool.getConnection(function(err, connection) {
            // 获取前台页面传过来的参数
            var param = req.query || req.params;

            // 建立连接，获取相应userid的notes
            connection.query($sql.delete, param.id, function(err, result) {
                if (!err) {
                    connection.release();
                    return next();
                } else {
                    connection.release();
                    return next("error");
                }
            });
        });
    }
};