var Config = require('../config');
var Redis  = require('ioredis');
var Logger = require('./logger');

var client = new Redis({
  port: Config.redis_port,
  host: Config.redis_host,
  db: Config.redis_db
});

client.on('error', function (err) {
  if (err) {
    Logger.error('connect to redis error, check your redis Config', err);
    process.exit(1);
  }
});

exports = module.exports = client;
