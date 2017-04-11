var Config = require('../../config');
var Books  = require('../../domain/books');

module.exports = {
  //根据id获取
  getById: function (req, res) {
    Books.getById(req.query.id).then(function (result) {
      res.send({data: {'result': result}});
    }).catch(function (err) {
      res.send({data: {'error': err}});
    });
  },

  //创建book
  create: function (req, res) {
    Books.create(req.body).then(function (result) {
      res.send({
        data: {'result': {status: true, msg: "创建成功", bookid: result.id}}
      });
    }).catch(function (err) {
      res.send({data: {'error': err}});
    });
  },

  //获取list
  getList: function (req, res) {
    Books.getList(req.query.userId, req.query.pageIndex, Config.pageSize).then(function (result) {
      res.send({data: {'result': result}});
    }).catch(function (err) {
      res.send({data: {'error': err}});
    });
  },

  //获取qiniu图片上传token
  getQiniuToken: function (req, res) {
    Books.getQiniuToken(req.query.fileName).then(function (result) {
      res.send({data: {'result': {token: result}}});
    }).catch(function (err) {
      res.send({data: {'error': err}});
    })
  }
};
