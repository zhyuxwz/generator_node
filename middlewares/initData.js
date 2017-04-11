var Config = require('../config');

exports.init = function (req, res, next) {
  var user_agent   = req.headers['user-agent'].toLowerCase();
  Config.is_wechat = /micromessenger/i.test(user_agent);

  Config.res = res;

  res.locals.config = Config;
  next();
};