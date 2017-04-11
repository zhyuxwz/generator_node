messages = function (req, res) {
  return function (template, locals) {
    var flash  = req.flash()
      , types  = Object.keys(flash)
      , output = '';

    if (types.length) {
      if (template) {
        locals          = locals || {};
        locals.messages = flash;
        res.render(template, locals, function (err, html) {
          if (html) {
            output = html;
          }
        });
      } else {
        var buf = [];
        types.forEach(function (type) {
          var msgs = flash[type];
          if (msgs) {
            msgs.forEach(function (msg) {
              if (type == 'success') {
                buf.push('SuccessTips("' + msg + '");');
              }
              if (type == 'error') {
                buf.push('ErrorTips("' + msg + '");');
              }
            });
          }
        });
        output = buf.join('\n');
      }
    }

    return output;
  };
};

module.exports = function (req, res, next) {
  res.locals.messages = messages(req, res);
  next();
};