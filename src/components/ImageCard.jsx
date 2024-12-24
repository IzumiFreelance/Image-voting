import React, { useState } from 'react';
import { Card, CardMedia, CardContent, Typography, Button, Box } from '@mui/material';
import { motion } from 'framer-motion';
import ImageModal from './ImageModal';

const ImageCard = ({ image, onVote, showVoteButtons = true, onImageClick }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(image);

  const handleOpenModal = () => {
    setModalOpen(true);
    setCurrentImage(image); // Set the current image to the one clicked
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <Card 
        sx={{ 
          width: { xs: '100%', sm: 400, md: 580 }, 
          height: 600, 
          cursor: 'pointer',
          '&:hover': {
            boxShadow: 6
          }
        }}
        onClick={handleOpenModal} 
      >
        <CardMedia
          component="img"
          height="100%"
          width="100%"
          image={image.url}
          alt={image.title}
          sx={{ objectFit: 'cover' }}
        />
        <CardContent>
          <Typography variant="h6" component="div" textAlign="center">
            {image.title}
          </Typography>
        </CardContent>
      </Card>
      {showVoteButtons && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => onVote(image.id)}
          >
            Vote
          </Button>
        </Box>
      )}
      <ImageModal open={modalOpen} onClose={() => setModalOpen(false)} image={currentImage} />
    </motion.div>
  );
};

export default ImageCard;
