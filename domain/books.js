var _       = require('lodash');
var Config  = require('../config');
var Models  = require('../model');
var BookDao = require('../infrastructure/bookDao');
var PageDao = require('../infrastructure/pageDao');
var UserDao = require('../infrastructure/userDao');
var Qiniu   = require("qiniu");

module.exports = {
  //创建新book
  create: function (model) {
    return new Promise(function (resolve, reject) {
      if (model.pages.length <= 0) {
        reject("请至少创建一个书页");
      }
      if (model.pages.length > Config.limit_max_page) {
        reject("书页最多不能超过50页");
      }
      UserDao.getById(model.userId).then(function (result) {
        if (result == null) {
          reject("用户不存在");
        }
      }).catch(function (err) {
        reject("用户不存在");
      });
      //开始创建
      Models.dbs.transaction(function (t) {
        return BookDao.add(model, t).then(function (book) {
          _.each(model.pages, function (page) {
            page.bookId = book.id;
          });
          return PageDao.adds(model.pages, t).then(function (pages) {
            return book;
          });
        });
      }).then(function (result) {
        resolve(result);
      }).catch(function (err) {
        reject(err);
      });
    });
  },

  //获取条件获取list
  getList: function (userid, pageIndex, pageSize) {
    return new Promise(function (resolve, reject) {
      BookDao.getList(userid, pageSize * (pageIndex - 1), pageIndex * pageSize).then(function (books) {
        var eachQueryDetail = [];
        _.each(books, function (book) {
          eachQueryDetail.push(
            new Promise(function (resolve, reject) {
              PageDao.getPagesByBookId(book.id).then(function (pages) {
                book.dataValues.pages = pages;
                resolve(book);
              }).catch(function (err) {
                reject(err);
              })
            })
          );
        });
        Promise.all(eachQueryDetail).then(function (result) {
          resolve(result);
        });
      }).catch(function (err) {
        reject(err);
      });
    });
  },

  //根据id获取
  getById: function (id) {
    return new Promise(function (resolve, reject) {
      BookDao.getById(id).then(function (book) {
        module.exports.getPagesByBookId(book.id).then(function (pages) {
          book.dataValues.pages = pages;
          resolve(book);
        });
      }).catch(function (err) {
        reject(err);
      });
    });
  },

  //根据bookid获取pages
  getPagesByBookId: function (bookid) {
    return new Promise(function (resolve, reject) {
      PageDao.getPagesByBookId(bookid).then(function (result) {
        resolve(result);
      }).catch(function (err) {
        reject(err);
      });
    });
  },

  //获取qiniu文件上传token
  getQiniuToken: function (fileName) {
    return new Promise(function (resolve, reject) {
      Qiniu.conf.ACCESS_KEY = Config.qiniu.ACCESS_KEY;
      Qiniu.conf.SECRET_KEY = Config.qiniu.SECRET_KEY;
      var putPolicy         = new Qiniu.rs.PutPolicy(Config.qiniu.bucket + ":" + fileName);
      var token             = putPolicy.token();
      resolve(token);
    });
  }
};