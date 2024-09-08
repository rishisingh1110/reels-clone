const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const videoRoutes = require('./routes/VideoRoutes');
const { PORT, MONGO_URI, REDIS_HOST, REDIS_PORT } = require('./config');

const app = express();

// MongoDB connection
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use('/api', videoRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
