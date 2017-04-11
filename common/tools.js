var Bcrypt    = require('bcryptjs');
var Moment    = require('moment');
var Validator = require('validator');

Moment.locale('zh-cn'); // 使用中文

// 格式化时间
exports.formatDate = function (date, friendly) {
  date = Moment(date);

  if (friendly) {
    return date.fromNow();
  } else {
    return date.format('YYYY-MM-DD HH:mm');
  }
};

exports.getVal = function (value) {
  if (value !== undefined) {
    return Validator.trim(value)
  }
  return undefined;
};

exports.validateId = function (str) {
  return (/^[a-zA-Z0-9\-_]+$/i).test(str);
};

exports.bhash = function (str, callback) {
  Bcrypt.hash(str, 10, callback);
};

exports.bcompare = function (str, hash, callback) {
  Bcrypt.compare(str, hash, callback);
};

exports.substitute = function (str, o, regexp) {
  return str.replace(regexp || /\\?\${([^{}]+)\}/g, function (match, name) {
    return (o[name] === undefined) ? '' : o[name];
  });
};