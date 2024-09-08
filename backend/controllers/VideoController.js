const path = require('path');
const AWS = require('aws-sdk');
const fs = require('fs');
const redis = require('redis');
const Video = require('../models/Video');
const { UPLOAD_PATH, S3_BUCKET, AWS_REGION, REDIS_HOST, REDIS_PORT } = require('../config');
const client = redis.createClient({ host: REDIS_HOST, port: REDIS_PORT });

const s3 = new AWS.S3();

exports.uploadVideo = async (req, res) => {
  try {
    const file = req.file;

    const params = {
      Bucket: S3_BUCKET,
      Key: `videos/${Date.now()}_${file.originalname}`,
      Body: fs.createReadStream(file.path),
      ContentType: file.mimetype,
      ACL: 'public-read',
    };

    const upload = await s3.upload(params).promise();

    fs.unlinkSync(file.path);

    // Save video metadata to the database
    const newVideo = new Video({ url: upload.Location });
    await newVideo.save();

    // Invalidate cache
    client.del('videos');

    res.status(200).json({ url: upload.Location });
  } catch (error) {
    res.status(500).json({ error: 'Error uploading video' });
  }
};

exports.getVideos = async (req, res) => {
  try {
    // Check if videos are in cache
    client.get('videos', async (err, cachedVideos) => {
      if (cachedVideos) {
        return res.status(200).json(JSON.parse(cachedVideos));
      } else {
        // Fetch videos from database
        const videos = await Video.find();
        client.setex('videos', 3600, JSON.stringify(videos));
        res.status(200).json(videos);
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching videos' });
  }
};
