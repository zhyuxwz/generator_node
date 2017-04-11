var Orders = require('../../domain/orders');

exports.submitByWechat = function (req, res) {
  Orders.submitByWechat(req.body).then(function (result) {
    res.send({data: {'result': {status: true, msg: "创建成功", orderId: result.id, orderNum: result.orderNum}}});
  }).catch(function (err) {
    res.send({data: {'error': err}});
  });
};

exports.notifyByWechat = function (req, res) {
  res.send({data: {'foo': 'notifyByWechat'}});
};