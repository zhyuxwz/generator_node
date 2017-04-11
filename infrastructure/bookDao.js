var Models = require('../model');

module.exports = {
  dbs: Models.dbs,
  //添加book
  add: function (data, t) {
    return new Promise(function (resolve, reject) {
      var model = Models.bookModel.build(data);
      model.save({transaction: t}).then(function (result) {
        resolve(result);
      }).catch(function (err) {
        reject(err)
      });
    });
  },

  getById: function (id) {
    return new Promise(function (resolve, reject) {
      Models.bookModel.findById(id).then(function (result) {
        resolve(result);
      }).catch(function (err) {
        reject(err);
      })
    });
  },

  getList: function (userid, skip, take) {
    return new Promise(function (resolve, reject) {
      Models.bookModel.findAll({
        where: {userId: userid},
        offset: skip,
        limit: take
      }).then(function (result) {
        resolve(result);
      }).catch(function (err) {
        reject(err);
      })
    });
  }
};