export const fetchVideos = async () => {
    const response = await fetch('/api/videos');
    const data = await response.json();
    return data;
  };

  const api_url = process.env.REACT_APP_API_URL || 'http://localhost:4000';
  
  export const uploadVideo = async (file) => {
    const formData = new FormData();
    formData.append('video', file);
  
    const response = await fetch(`${api_url}/api/upload`, {
      method: 'POST',
      body: formData,
    });
  
    const data = await response.json();
    return data.url;
  };
  