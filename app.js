var Config = require('./config');

var Express        = require('express');
var Session        = require('express-session');
var Compress       = require('compression');
var Path           = require('path');
var Favicon        = require('serve-favicon');
var BodyParser     = require('body-parser');
var CookieParser   = require('cookie-parser');
var Errorhandler   = require('errorhandler');
var EjsMate        = require('ejs-mate');
var ExpressLayouts = require('express-ejs-layouts');
var _              = require('lodash');
var Util           = require('util');
var Flash          = require('connect-flash');

var ErrorPageMiddleware = require('./middlewares/errorPage');
var InitData            = require('./middlewares/initData');
var Messages            = require('./middlewares/message');
var ApiRouter           = require('./routes/api');

var App = Express();

App.set('views', Path.join(__dirname, 'views'));
App.set('view engine', 'html');
App.engine('html', EjsMate);
App.set('layout', 'layout');
App.set("layout extractScripts", true);
App.set("layout extractStyles", true);
App.disable('x-powered-by');

//通用的中间件
App.use(ExpressLayouts);
App.use(BodyParser.json({limit: '1mb'}));
App.use(BodyParser.urlencoded({extended: true, limit: '1mb'}));
App.use(Express.static(Path.join(__dirname, 'public')));
App.use(Compress());
App.use(CookieParser(Config.session_secret));
App.use(Session({
  secret: Config.session_secret,
  resave: true,
  saveUninitialized: true
}));
App.use(Flash());
App.use(Messages);

//自定义中间件
App.use(InitData.init);
App.use(ErrorPageMiddleware.errorPage);

_.extend(App.locals, {
  config: Config,
  util: Util,
  _: _
});

//路由设置
App.use('/api', ApiRouter);

//404
App.use(function (req, res, next) {
  return res.status(404).send('404 Not Found');
});

//500
if (Config.debug) {
  App.use(Errorhandler());
} else {
  App.use(function (err, req, res, next) {
    return res.status(500).send('500 status');
  });
}

App.listen(Config.port);

module.exports = App;
