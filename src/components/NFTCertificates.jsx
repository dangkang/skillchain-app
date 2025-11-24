import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Grid, Card, CardContent, CardMedia, Typography, Box, Paper, ToggleButton, ToggleButtonGroup, Chip, Modal, Fade, Backdrop } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxWidth: 800,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: { xs: 'column', md: 'row' },
  gap: 3,
};

const types = [
  { id: 'all', label: 'All' },
  { id: 'certification', label: 'Certification' },
  { id: 'training', label: 'Training' },
  { id: 'contribution', label: 'Contribution' }
];

const typeColors = {
  certification: 'primary',
  training: 'secondary',
  contribution: 'success',
};

function NFTCertificates() {
  const { wallet, nftCertificates } = useApp();
  const [selectedType, setSelectedType] = useState('all');
  const [selectedNFT, setSelectedNFT] = useState(null);

  const handleOpen = (nft) => setSelectedNFT(nft);
  const handleClose = () => setSelectedNFT(null);

  const handleTypeChange = (event, newType) => {
    if (newType !== null) {
      setSelectedType(newType);
    }
  };

  const filteredNFTs = selectedType === 'all'
    ? nftCertificates
    : nftCertificates.filter(nft => nft.type === selectedType);

  if (!wallet) {
    return (
      <Paper sx={{ p: 4, textAlign: 'center' }}>
        <Typography>Please connect your wallet to view your NFT certificates.</Typography>
      </Paper>
    );
  }

  return (
    <Box>
      <Paper sx={{ p: 2, mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <ToggleButtonGroup
          value={selectedType}
          exclusive
          onChange={handleTypeChange}
          aria-label="nft type filter"
        >
          {types.map(type => (
            <ToggleButton key={type.id} value={type.id} aria-label={type.label}>
              {type.label}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
        <Typography variant="subtitle1">{filteredNFTs.length} Certificates</Typography>
      </Paper>

      <Grid container spacing={3}>
        {filteredNFTs.map(nft => (
          <Grid item key={nft.id} xs={12} sm={6} md={4} lg={3}>
            <Card onClick={() => handleOpen(nft)} sx={{ cursor: 'pointer', height: '100%' }}>
              <CardMedia
                component="img"
                height="140"
                image={nft.image}
                alt={nft.title}
              />
              <CardContent>
                <Chip label={nft.type} color={typeColors[nft.type] || 'default'} size="small" sx={{ mb: 1 }} />
                <Typography gutterBottom variant="h6" component="div" noWrap>
                  {nft.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  by {nft.issuer}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Issued: {nft.issueDate}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={!!selectedNFT}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={!!selectedNFT}>
          <Box sx={style}>
            <CardMedia
              component="img"
              sx={{ width: { xs: '100%', md: 300 }, objectFit: 'cover' }}
              image={selectedNFT?.image}
              alt={selectedNFT?.title}
            />
            <Box>
              <Chip label={selectedNFT?.type} color={typeColors[selectedNFT?.type] || 'default'} size="small" sx={{ mb: 1 }} />
              <Typography id="transition-modal-title" variant="h4" component="h2">
                {selectedNFT?.title}
              </Typography>
              <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                <strong>Issuer:</strong> {selectedNFT?.issuer}<br />
                <strong>Issue Date:</strong> {selectedNFT?.issueDate}<br />
                <strong>Token ID:</strong> {selectedNFT?.tokenId}
              </Typography>
              {selectedNFT?.sklEarned && (
                <Typography variant="h6" color="primary.main" sx={{ mt: 2 }}>
                  + {selectedNFT.sklEarned} SKL Earned
                </Typography>
              )}
            </Box>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
}

export default NFTCertificates;
