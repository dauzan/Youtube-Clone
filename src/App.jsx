import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get('https://youtube138.p.rapidapi.com/search/', {
          params: {
            key: process.env.RAPIDAPI_KEY,
            q: 'React tutorials',
            part: 'snippet',
            type: 'video',
          },
        });
        setVideos(response.data.items);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div>
      {videos.map(video => (
        <div key={video.id.videoId}>
          <h2>{video.snippet.title}</h2>
          <img src={video.snippet.thumbnails.default.url} alt={video.snippet.title} />
        </div>
      ))}
    </div>
  );
};

export default App;