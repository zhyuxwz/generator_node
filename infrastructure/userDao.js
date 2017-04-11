var Models = require('../model');

module.exports = {
  dbs: Models.dbs,
  //添加用户
  add: function (data, t) {
    return new Promise(function (resolve, reject) {
      var model = Models.userModel.build(data);
      model.save({transaction: t}).then(function (result) {
        resolve(result);
      }).catch(function (err) {
        reject(err)
      });
    });
  },

  //根据openid获取用户
  getByOpenId: function (openid) {
    return new Promise(function (resolve, reject) {
      var model = Models.userModel.findOne({
        where: {
          openId: openid
        }
      }).then(function (result) {
        resolve(result);
      }).catch(function (err) {
        reject(err);
      })
    });
  },

  //根据id获取用户
  getById: function (id) {
    return new Promise(function (resolve, reject) {
      var model = Models.userModel.findById(id).then(function (result) {
        resolve(result);
      }).catch(function (err) {
        reject(err);
      })
    });
  }
};