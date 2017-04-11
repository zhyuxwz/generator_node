var Express = require('express');
var Config  = require('../config');
var Router  = Express.Router();

var UserApi   = require('../controllers/api/user');
var BookApi   = require('../controllers/api/book');
var OrderApi  = require('../controllers/api/order');
var NoticeApi = require('../controllers/api/notice');

//user
Router.get('/user/getByWechat', UserApi.getByWechat);
Router.get('/user/getById', UserApi.getById);
Router.post('/user/create', UserApi.create);

//book
Router.post('/book/create', BookApi.create);
Router.get('/book/getQiniuToken', BookApi.getQiniuToken);
Router.get('/book/getList', BookApi.getList);
Router.get('/book/getById', BookApi.getById);

//notice
Router.post('/notice/sendBookTake', NoticeApi.sendBookTake);

//order
Router.post('/order/submitByWechat', OrderApi.submitByWechat);
Router.get('/order/notifyByWechat', OrderApi.notifyByWechat);

module.exports = Router;