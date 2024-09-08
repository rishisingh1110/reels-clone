const express = require('express');
const multer = require('multer');
const { uploadVideo, getVideos } = require('../controllers/videoController');
const { cache } = require('../middleware/cache');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('video'), uploadVideo);
router.get('/videos', cache, getVideos);

module.exports = router;
