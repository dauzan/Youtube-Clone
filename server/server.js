import express from 'express';
import axios from 'axios';

const app = express();

const searchName = 'food';

app.get('/youtube', (req, res) => {
    axios.get(`https://youtube.googleapis.com/youtube/v3/search?key=AIzaSyDZYZ51BQez_eLtZahx549HjXgcJglvU80&q=${searchName}&part=snippet`)
    .then(response => {
        res.set('Access-Control-Allow-Origin', '*')
        res.send(response.data.items)
    });
})

const options = {
    method: 'GET',
    url: 'https://youtube138.p.rapidapi.com/search/',
    params: {
        q: 'food'
    },
    headers: {
      'X-RapidAPI-Key': '61c9f783e3msh16c3d1965101ae2p188f73jsn1e39744d79e9',
      'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
    }
  };
  
  try {
      const response = await axios.request(options);

      app.get('/youtube', (req, res) => {
        res.set('Access-Control-Allow-Origin', '*')
        res.send(response.data);
      })
  } catch (error) {
      console.error(error);
  }

app.listen(3000, () => console.log('Go to port 3000'));