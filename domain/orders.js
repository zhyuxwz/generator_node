var OrderDao = require('../infrastructure/orderDao');
var WxPay    = require('weixin-pay');
var Config   = require('../config');
var Models   = require('../model');
var Moment   = require('moment');

var wxPay = WxPay({
  appid: Config.wechat.appid,
  mch_id: Config.wechat.mch_id,
  partner_key: Config.wechat.partner_key
});

module.exports = {
  //创建微信支付
  submitByWechat: function (model) {
    return new Promise(function (resolve, reject) {
      //开始创建
      Models.dbs.transaction().then(function (t) {
        module.exports.bulidOrderNum().then(function (orderNum) {
          model.orderNum = orderNum;
          model.paid     = false;
          model.tradeNum = '';
          OrderDao.add(model, t).then(function (order) {
            //todo 提交微信统一支付订单
            //wxPay.createUnifiedOrder({
            //  body: '支付测试',
            //  out_trade_no: '20140703' + Math.random().toString().substr(2, 10),
            //  total_fee: 1,
            //  spbill_create_ip: '192.168.2.210',
            //  notify_url: 'http://wxpay_notify_url',
            //  trade_type: 'NATIVE',
            //  product_id: '1234567890'
            //}, function (err, result) {
            //  console.log(result);
            //});
            t.commit();
            resolve(order);
          })
        }).catch(function (err) {
          t.rollback();
          reject(err);
        });
      }).catch(function (err) {
        reject(err);
      });
    });
  },

  //生成订单号
  bulidOrderNum: function () {
    return new Promise(function (resolve, reject) {
      try {
        var now       = Moment();
        var orderNum  = now.format("YYYYMMDDHH") + Math.random().toString().slice(-6);
        var startTime = Moment(now.format("YYYYMMDD HH")).format("YYYYMMDD HH");
        var endTime   = Moment(now.format("YYYYMMDD HH")).add(1, 'hours').format("YYYYMMDD HH");
        //判断重复
        module.exports.getOrderByNumAndTime(orderNum, startTime, endTime).then(function (existCount) {
          if (existCount > 0) {
            return module.exports.bulidOrderNum();
          } else {
            resolve(orderNum);
          }
        }).catch(function (err) {
          console.log(err);
          reject(err);
        });
      } catch (err) {
        reject(err);
      }
    });
  },

  //根据订单号获取一段时间内订单号相同的订单数量
  getOrderByNumAndTime: function (orderNum, startTime, endTime) {
    return new Promise(function (resolve, reject) {
      Models.orderModel.count({
        where: {orderNum: orderNum, createdAt: {$between: [startTime, endTime]}}
      }).then(function (result) {
        resolve(result);
      }).catch(function (err) {
        reject(err)
      });
    })
  }
};