import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const options = {
  method: 'GET',
  url: 'https://youtube138.p.rapidapi.com/search/',
  params: {
    q: 'food',
    hl: 'en',
  },
  headers: {
    'x-rapidapi-key': '61c9f783e3msh16c3d1965101ae2p188f73jsn1e39744d79e9',
    'x-rapidapi-host': 'youtube138.p.rapidapi.com'
  }
};

const resaxios = await axios.request(options);

const App = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(resaxios);
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