var Models = require('../model');

module.exports = {
  dbs: Models.dbs,
  add: function (data, t) {
    return new Promise(function (resolve, reject) {
      var model = Models.smsRecordModel.build(data);
      model.save({transaction: t}).then(function (result) {
        resolve(result);
      }).catch(function (err) {
        reject(err)
      });
    });
  }
};