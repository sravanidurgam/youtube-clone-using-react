import './App.css';
import _ from "lodash";
import Grid from '@mui/material/Unstable_Grid2';
import { Box } from '@mui/material';
import SearchBar from './components/SearchBar';
import Description from './components/Description';
import VideoList from './components/VideoList';
import axios from 'axios';
import { useEffect, useState } from 'react';

const API_KEY = 'AIzaSyCJdnCDa6fPBgWXL50isSuULPuyqEXZyf0'; 
const URL = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&key=${API_KEY}&q=`;

function App() {
  const [videoDesc, setVideoDesc] = useState(null);
  const [videoList, setVideoList] = useState([]);
  const [videos, setVideos] = useState(null);

  const onChange = (term) => {
    console.log(`Searching for: ${term}`);
    axios.get(`${URL}${term}`).then(res => {
      console.log('API response:', res.data);
      const items = res.data.items;
      setVideos(items);
      setVideoDesc(items[0]);
      setVideoList(items);
    }).catch(error => {
      console.error('Error fetching data from YouTube API:', error);
    });
  };

  const onVideoSelection = (index) => {
    setVideoDesc(videos[index]);
  };

  useEffect(() => {
    console.log('Fetching initial data...');
    axios.get(`${URL}cartoon`).then(res => {
      console.log('Initial API response:', res.data);
      const items = res.data.items;
      setVideos(items);
      setVideoDesc(items[0]);
      setVideoList(items);
    }).catch(error => {
      console.error('Error fetching initial data from YouTube API:', error);
    });
  }, []);

  const videoSearch = _.debounce(term => onChange(term), 300);

  return (
    <Box sx={{ flexGrow: 1, p: "0 20px" }}>
      <SearchBar onChange={videoSearch} />
      <Grid container sx={{ pt: "20px" }}>
        <Description videoDesc={videoDesc} />
        <VideoList videoList={videoList} onVideoSelection={onVideoSelection} />
      </Grid>
    </Box>
  );
}

export default App;
