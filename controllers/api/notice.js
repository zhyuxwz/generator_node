var Notices = require('../../domain/notices');

module.exports = {
  //发送通知
  sendBookTake: function (req, res) {
    Notices.sendBookTake(req.body.userId, req.body.recNum, req.body.name, req.body.code).then(function (result) {
      res.send({data: {'result': result}});
    }).catch(function (err) {
      res.send({data: {'error': err}});
    });
  }
};

