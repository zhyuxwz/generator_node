var Models = require('../model');

module.exports = {
  dbs: Models.dbs,
  //添加page
  add: function (data, t) {
    return new Promise(function (resolve, reject) {
      var model = Models.pageModel.build(data);
      model.save({transaction: t}).then(function (result) {
        resolve(result);
      }).catch(function (err) {
        reject(err)
      });
    });
  },

  //添加pages
  adds: function (list, t) {
    return new Promise(function (resolve, reject) {
      Models.pageModel.bulkCreate(list, {transaction: t}).then(function (result) {
        resolve(result);
      }).catch(function (err) {
        reject(err)
      });
    });
  },

  getPagesByBookId: function (bookid) {
    return new Promise(function (resolve, reject) {
      Models.pageModel.findAll({
        where: {bookId: bookid}
      }).then(function (result) {
        resolve(result);
      }).catch(function (err) {
        reject(err)
      });
    });
  }
};