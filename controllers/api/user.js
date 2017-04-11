var Users = require('../../domain/users');

module.exports = {
  //根据openid获取用户
  getByWechat: function (req, res) {
    Users.getByWechat(req.query.openid).then(function (result) {
      res.send({data: {'result': result}});
    }).catch(function (err) {
      res.send({data: {'error': err}});
    });
  },

  //根据id获取用户
  getById: function (req, res) {
    Users.getById(req.query.id).then(function (result) {
      res.send({data: {'result': result}});
    }).catch(function (err) {
      res.send({data: {'error': err}});
    });
  },

  //创建用户
  create: function (req, res) {
    Users.add(req.body).then(function (result) {
      res.send({data: {'result': {status: true, msg: "创建成功", id: result.id}}});
    }).catch(function (err) {
      res.send({data: {'error': err}});
    });
  }
};
