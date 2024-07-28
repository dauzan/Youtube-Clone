import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    /**
     * PUT ERROR HANDLER
     * so when it come to error it doesn't call the api making traffic spike and exceed qouta limit
     */
    try {
      axios.get('http://localhost:3000/youtube')
      .then(response => {
        const data = response.data.contents
        .filter(item => item.type === "video")
        .map(item => ({
          thumbnails: item.video.thumbnails[0]["url"],
          title: item.video.title
        }));
        setVideos(data);
      })
    } catch(error) {
      console.error('There is an error:', error);
    }
  }, []);

  return (
    <div>
      {Array.isArray(videos) && videos.map((item, index) => (
        <div key={index}>
          <img src={item["thumbnails"]} alt={index} />
          <h3 key={index}>{item["title"]}</h3>
        </div>
      ))}
    </div>
  )
}

export default App