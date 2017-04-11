var Config    = require('../config');
var Sequelize = require('sequelize');

var dbs = new Sequelize(Config.mysql.db, Config.mysql.user, Config.mysql.password, {
  host: Config.mysql.host,
  port: Config.mysql.port,
  dialect: 'mysql',
  timezone: '+08:00'
});

var userModel      = dbs.import('userModel');
var bookModel      = dbs.import('bookModel');
var orderModel     = dbs.import('orderModel');
var pageModel      = dbs.import('pageModel');
var smsRecordModel = dbs.import('smsRecordModel');

userModel.sync();
bookModel.sync();
orderModel.sync();
pageModel.sync();
smsRecordModel.sync();

exports.userModel      = userModel;
exports.bookModel      = bookModel;
exports.orderModel     = orderModel;
exports.pageModel      = pageModel;
exports.smsRecordModel = smsRecordModel;

exports.dbs = dbs;