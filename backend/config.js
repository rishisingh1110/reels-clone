require('dotenv').config();

module.exports = {
    PORT: process.env.PORT || 4000,
    MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/reels',
    REDIS_HOST: process.env.REDIS_HOST || '127.0.0.1',
    REDIS_PORT: process.env.REDIS_PORT || 6379,
    UPLOAD_PATH: 'uploads',
    S3_BUCKET: process.env.S3_BUCKET || 'your-s3-bucket-name',
    AWS_REGION: process.env.AWS_REGION || 'your-region',
  };
  