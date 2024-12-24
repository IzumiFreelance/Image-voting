import React from 'react';
import { Modal, Box, IconButton, Typography, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const ImageModal = ({ open, onClose, image }) => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = image.url;
    link.download = 'downloaded-image.jpg';
    link.click();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Check out this image!',
        url: image.url,
      });
    } else {
      alert('Sharing not supported on this browser.');
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="image-modal-title"
      aria-describedby="image-modal-description"
    >
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: { xs: 1, sm: 2 },
        borderRadius: 2,
        textAlign: 'center',
        width: { xs: '95%', sm: '70%', md: '50%' },
        height: 'auto'
      }}>
        <IconButton onClick={onClose} sx={{ position: 'absolute', top: 10, right: 10 }}>
          <CloseIcon />
        </IconButton>
        <img src={image.url} alt={image.title} style={{ width: '100%', height: 'auto', maxHeight: '80vh' }} />
        <Typography id="image-modal-description" sx={{ mt: 2 }}>
          {image.title}
        </Typography>
        <Button variant="contained" color="primary" onClick={handleDownload} sx={{ mt: 2 }}>Download</Button>
        <Button variant="contained" color="secondary" onClick={handleShare} sx={{ mt: 2, ml: 2 }}>Share</Button>
      </Box>
    </Modal>
  );
};

export default ImageModal;
