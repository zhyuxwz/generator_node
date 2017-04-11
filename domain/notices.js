var Tops         = require('../common/tops');
var Tools        = require('../common/tools');
var SmsRecordDao = require('../infrastructure/smsRecordDao');

module.exports = {
  sendBookTake: function (userId, recNum, name, code) {
    var tmp     = '${name}你好，有人为你制作了一份告白书，立即进入微信小程序"告白书"查看吧。提取码：${code}。';
    var content = Tools.substitute(tmp, {name: name, code: code});
    console.log(content);
    return new Promise(function (resolve, reject) {
      Tops.sendBookTakeSms(recNum, name, code).then(function (result) {
        if (result.result.success) {
          SmsRecordDao.add({userId: userId, phone: recNum, content: Tools.substitute(tmp, {name: name, code: code})});
          resolve(result);
        }
      }).catch(function (err) {
        reject(err);
      })
    });
  }
};