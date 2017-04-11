var UserDao = require('../infrastructure/userDao');

module.exports = {
  //创建用户
  add: function (model) {
    return new Promise(function (resolve, reject) {
      UserDao.add(model).then(function (result) {
        resolve(result);
      }).catch(function (err) {
        reject(err);
      });
    });
  },

  //根据openid获取用户
  getByWechat: function (openid) {
    return new Promise(function (resolve, reject) {
      UserDao.getByOpenId(openid).then(function (result) {
        resolve(result);
      }).catch(function (err) {
        reject(err);
      });
    });
  },

  //根据id获取用户
  getById: function (id) {
    return new Promise(function (resolve, reject) {
      UserDao.getById(id).then(function (result) {
        resolve(result);
      }).catch(function (err) {
        reject(err);
      });
    });
  }
};