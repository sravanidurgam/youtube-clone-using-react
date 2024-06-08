import Grid from '@mui/material/Unstable_Grid2';
import { Box } from '@mui/material';

const Description = ({ videoDesc }) => {
  const videoId = videoDesc ? videoDesc.id.videoId : null;
  return (
    <Grid xs={8}>
      {videoId ? (
        <iframe
          width="100%"
          height="600"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      ) : (
        <p>Loading video...</p>
      )}
      {videoDesc && (
        <Box sx={{ m: "10px 0" }}>
          <h1>{videoDesc.snippet.title}</h1>
          <h5>{videoDesc.snippet.description}</h5>
        </Box>
      )}
    </Grid>
  );
};

export default Description;
