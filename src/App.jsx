import { useState, useEffect } from 'react';
import { Container, Typography, Box, CssBaseline, ThemeProvider, createTheme, Button } from '@mui/material';
import ImageCard from './components/ImageCard';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },
  },
});

function App() {
  const [images, setImages] = useState([]);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response1 = await fetch('https://api.waifu.pics/nsfw/waifu');
        const data1 = await response1.json();

        const response2 = await fetch('https://api.waifu.pics/nsfw/waifu');
        const data2 = await response2.json();

        setImages([
          { id: 1, url: data1.url, votes: 0 },
          { id: 2, url: data2.url, votes: 0 }
        ]); // Use different URLs from the responses
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };
    fetchImages();
  }, []);

  const handleVote = async (id) => {
    const votedImage = images.find(img => img.id === id);
    console.log('Voted for:', votedImage);
    // Fetch a new image to replace the opposite one
    const response = await fetch('https://api.waifu.pics/sfw/waifu');
    const newImageData = await response.json();

    setImages(prevImages =>
      prevImages.map(image =>
        image.id !== id
          ? { id: image.id, url: newImageData.url, votes: image.votes } // Replace the opposite image
          : { id: image.id, url: image.url, votes: image.votes + 1 } // Increment votes for the voted image
      )
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box sx={{ my: 4, textAlign: 'center' }}>
          <Typography
            variant="h2"
            component="h1"
            sx={{
              mb: 4,
              background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 'bold'
            }}
          >
            Choose Your Favorite
          </Typography>
          
          {!winner ? (
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' }, // Stack on small screens
                justifyContent: 'center',
                gap: 2
              }}
            >
              {images.map((image) => (
                <ImageCard
                  key={image.id}
                  image={image}
                  onVote={handleVote}
                  showVoteButtons={true}
                />
              ))}
            </Box>
          ) : (
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ mb: 3, color: '#90caf9' }}>
                You chose:
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <ImageCard
                  image={winner}
                  showVoteButtons={false}
                />
              </Box>
              <Button 
                variant="contained" 
                color="primary"
                sx={{ mt: 3 }}
                onClick={() => setWinner(null)}
              >
                Vote Again
              </Button>
            </Box>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
