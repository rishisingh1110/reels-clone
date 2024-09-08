const redis = require('redis');
const { REDIS_HOST, REDIS_PORT } = require('../config');

const client = redis.createClient({ host: REDIS_HOST, port: REDIS_PORT });

exports.cache = (req, res, next) => {
  const key = 'videos';
  client.get(key, (err, data) => {
    if (err) throw err;
    if (data !== null) {
      res.status(200).json(JSON.parse(data));
    } else {
      next();
    }
  });
};
