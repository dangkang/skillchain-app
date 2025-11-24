import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Box, Paper, Typography, Grid, Avatar, Chip, Button, Tabs, Tab, List, ListItem, ListItemAvatar, ListItemText, Divider, ImageList, ImageListItem, ImageListItemBar
} from '@mui/material';
import { School, Code, Group, Share, PictureAsPdf, Link as LinkIcon } from '@mui/icons-material';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function Portfolio() {
  const { wallet, userProfile, nftCertificates, sklHistory } = useApp();
  const [tabValue, setTabValue] = useState(0);

  if (!wallet) {
    return (
      <Paper sx={{ p: 4, textAlign: 'center' }}>
        <Typography>Please connect your wallet to view your portfolio.</Typography>
      </Paper>
    );
  }

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const totalSKLEarned = sklHistory
    .filter(item => item.type === 'earned')
    .reduce((sum, item) => sum + item.amount, 0);
  
  const certifications = nftCertificates.filter(nft => nft.type === 'certification');
  const trainings = nftCertificates.filter(nft => nft.type === 'training');
  const contributions = nftCertificates.filter(nft => nft.type === 'contribution');

  const skillSections = [
    { label: "Certifications", icon: <School />, data: certifications },
    { label: "Training", icon: <Code />, data: trainings },
    { label: "Contributions", icon: <Group />, data: contributions },
  ];

  return (
    <Paper>
      {/* Header */}
      <Box sx={{ p: 4 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <Avatar sx={{ width: 80, height: 80, bgcolor: 'primary.main', fontSize: '2.5rem' }}>
              {userProfile.name.charAt(0)}
            </Avatar>
          </Grid>
          <Grid item xs>
            <Typography variant="h4">{userProfile.name}</Typography>
            <Typography variant="body1" color="text.secondary" sx={{ wordBreak: 'break-all' }}>{userProfile.did}</Typography>
            <Chip label={`Member Since ${userProfile.memberSince}`} size="small" sx={{ mt: 1 }} />
          </Grid>
          <Grid item>
            <Box textAlign="center" sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1, minWidth: 120 }}>
              <Typography variant="h5">{nftCertificates.length}</Typography>
              <Typography variant="body2" color="text.secondary">NFTs</Typography>
            </Box>
          </Grid>
          <Grid item>
            <Box textAlign="center" sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1, minWidth: 120 }}>
              <Typography variant="h5">{totalSKLEarned}</Typography>
              <Typography variant="body2" color="text.secondary">SKL Earned</Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Divider />

      {/* Skills Section */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={handleTabChange} centered>
          {skillSections.map((section, index) => (
            <Tab key={index} label={section.label} icon={section.icon} iconPosition="start" />
          ))}
        </Tabs>
      </Box>
      {skillSections.map((section, index) => (
        <CustomTabPanel key={index} value={tabValue} index={index}>
          <List>
            {section.data.map(item => (
              <ListItem key={item.id}>
                <ListItemAvatar>
                  <Avatar variant="rounded" src={item.image} />
                </ListItemAvatar>
                <ListItemText primary={item.title} secondary={`by ${item.issuer} on ${item.issueDate}`} />
              </ListItem>
            ))}
          </List>
        </CustomTabPanel>
      ))}
      <Divider />

      {/* NFT Gallery */}
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" sx={{ p: 1 }}>NFT Gallery</Typography>
        <ImageList variant="quilted" cols={4} rowHeight={164}>
          {nftCertificates.map((item) => (
            <ImageListItem key={item.id}>
              <img src={`${item.image}&w=164&h=164&fit=crop&auto=format`} alt={item.title} loading="lazy" />
              <ImageListItemBar title={item.title} subtitle={item.issuer} />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
      <Divider />

      {/* Actions */}
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
        <Button variant="outlined" startIcon={<LinkIcon />}>Verify on Blockchain</Button>
        <Button variant="outlined" startIcon={<Share />}>Share Portfolio</Button>
        <Button variant="contained" startIcon={<PictureAsPdf />}>Export as PDF</Button>
      </Box>
    </Paper>
  );
}

export default Portfolio;
