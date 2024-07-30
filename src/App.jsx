  import { useEffect, useState } from 'react';
  import axios from 'axios';
  import './App.css';

  const App = () => {
    const [videos, setVideos] = useState([]);
    const apikey = import.meta.env.VITE_APP_API_KEY;
    const query = 'food';

    useEffect(() => {
      const fetchVideos = async () => {
        try {
          const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}`, {
            params: {
              part: 'snippet',
              q: query,
              maxResults: 10,
              key: apikey
            }
          });
          setVideos(response.data.items);
        } catch (error) {
          console.error('Error fetching videos:', error);
        }
      };

      fetchVideos();
    }, [query, apikey]);

    return (
      <div>
        {videos.length > 0 ? (
          videos.map(video => (
            <div key={video.id.videoId || video.etag}>
              <h2>{video.snippet.title}</h2>
              <img src={video.snippet.thumbnails.default.url} alt={video.snippet.title} />
            </div>
          ))
        ) : (
          <p>No videos found.</p>
        )}
      </div>
    );
  };

  export default App;