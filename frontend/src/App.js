import React, { useState, useEffect } from 'react';
import VideoPlayer from './components/VideoPlayer';
import UploadForm from './components/UploadForm';
import { fetchVideos } from './services/api';

function App() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    async function loadVideos() {
      const fetchedVideos = await fetchVideos();
      setVideos(fetchedVideos);
    }
    loadVideos();
  }, []);

  const addVideo = (newVideo) => {
    setVideos([...videos, newVideo]);
  };

  return (
    <div className="App">
      <h1>Instagram Reels Clone</h1>
      <UploadForm addVideo={addVideo} />
      <div className="video-feed">
        {videos.map((video, index) => (
          <VideoPlayer key={index} src={video.url} />
        ))}
      </div>
    </div>
  );
}

export default App;
