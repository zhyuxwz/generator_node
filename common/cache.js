var Redis  = require('./redis');
var _      = require('lodash');
var Logger = require('./logger');

var get = function (key, callback) {
  var t = new Date();
  Redis.get(key, function (err, data) {
    if (err) {
      return callback(err);
    }
    if (!data) {
      return callback();
    }
    data         = JSON.parse(data);
    var duration = (new Date() - t);
    Logger.debug('Cache', 'get', key, (duration + 'ms').green);
    callback(null, data);
  });
};

exports.get = get;

// time 参数可选，秒为单位
var set = function (key, value, time, callback) {
  var t = new Date();

  if (typeof time === 'function') {
    callback = time;
    time     = null;
  }
  callback = callback || _.noop;
  value    = JSON.stringify(value);

  if (!time) {
    Redis.set(key, value, callback);
  } else {
    Redis.setex(key, time, value, callback);
  }
  var duration = (new Date() - t);
  Logger.debug("Cache", "set", key, (duration + 'ms').green);
};

exports.set = set;
