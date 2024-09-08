import React from 'react';
import ReactPlayer from 'react-player';

const VideoPlayer = ({ src }) => {
  return (
    <div className="video-player">
      <ReactPlayer url={src} controls={true} playing loop width="100%" height="100%" />
    </div>
  );
};

export default VideoPlayer;
