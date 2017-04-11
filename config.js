var config = {
  debug: true,

  name: 'name',
  description: 'desc',
  keywords: 'keywords',

  // 程序运行的端口
  port: 3000,
  host: 'http://localhost',

  //mysql
  mysql: {
    db: 'db',
    host: 'ip',
    port: '3306',
    user: 'root',
    password: 'password'
  },

  wechat: {
    appid: "",
    mch_id: "",
    partner_key: ""
  },

  pageSize: 10,

  qiniu: {
    ACCESS_KEY: '',
    SECRET_KEY: '',
    bucket: ''
  },

  alidayu: {
    App_Key: "",
    App_Secret: ""
  },

  //wechat
  is_wechat: false,
  wechat_appid: '',
  wechat_secret: '',
  wechat_token: '',
  wechat_encodingAESKey: '',

  //ali dayu sms
  alidayuSmsAppKey: '',
  alidayuSmsAppSecret: '',

  aliossAppId: '',
  aliossAppSecret: '',

  aliossImgHost: '',
  aliossImg: '',

  smsActiveTime: '1200',
  smsIntervalTime: '60',

  img404: 'holder.js/%sx%s?text=404',

  session_secret: 'session_secret',
  auth_cookie_name: 'auth_cookie_name',

  res: null,

  admins: {user_login_name: true}
};

module.exports = config;