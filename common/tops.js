var Config    = require('../config');
var TopClient = require('./topClient').TopClient;

var client = new TopClient({
  'appkey': Config.alidayu.App_Key,
  'appsecret': Config.alidayu.App_Secret,
  'REST_URL': 'http://gw.api.taobao.com/router/rest'
});

module.exports = {
  sendBookTakeSms: function (recNum, name, code) {
    return new Promise(function (resolve, reject) {
      client.execute('alibaba.aliqin.fc.sms.num.send',
        {
          'sms_type': 'normal',
          'sms_free_sign_name': 'sign_name',
          'rec_num': recNum,
          'sms_template_code': 'code',
          'sms_param': {
            name: name,
            code: code
          }
        },
        function (error, response) {
          if (!error)
            resolve(response);
          else
            reject(error);
        })
      resolve({result: {success: true}});
    });
  }
};