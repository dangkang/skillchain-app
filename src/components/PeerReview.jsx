import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Box, Paper, Typography, Tabs, Tab, Badge, Card, CardContent, CardActions, Button,
  Dialog, DialogTitle, DialogContent, DialogActions, Rating, TextField, List, ListItem, ListItemText, Avatar, Divider
} from '@mui/material';
import { RateReview, CheckCircle, Inbox } from '@mui/icons-material';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

function ReviewDialog({ open, handleClose, review }) {
  const [rating, setRating] = useState(4);
  const [comment, setComment] = useState('');

  const handleSubmit = () => {
    // Mock submission
    console.log({ reviewId: review.id, rating, comment });
    handleClose();
  };

  if (!review) return null;

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Submit Peer Review</DialogTitle>
      <DialogContent>
        <Typography variant="h6">{review.project}</Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Reviewing: {review.reviewee}
        </Typography>
        <Box sx={{ my: 3 }}>
          <Typography component="legend">Overall Rating</Typography>
          <Rating
            name="simple-controlled"
            value={rating}
            onChange={(event, newValue) => {
              setRating(newValue);
            }}
          />
        </Box>
        <TextField
          autoFocus
          margin="dense"
          id="comment"
          label="Feedback Comment"
          type="text"
          fullWidth
          variant="outlined"
          multiline
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">
          Submit Review ({review.sklReward} SKL)
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function PeerReview() {
  const { wallet, peerReviews } = useApp();
  const [tabValue, setTabValue] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);

  if (!wallet) {
    return (
      <Paper sx={{ p: 4, textAlign: 'center' }}>
        <Typography>Please connect your wallet to participate in peer reviews.</Typography>
      </Paper>
    );
  }

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleOpenDialog = (review) => {
    setSelectedReview(review);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedReview(null);
  };

  const tabs = [
    { label: 'Pending', data: peerReviews.pending, icon: <Inbox /> },
    { label: 'Completed', data: peerReviews.completed, icon: <CheckCircle /> },
    { label: 'Received', data: peerReviews.received, icon: <RateReview /> },
  ];

  return (
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={handleTabChange} centered>
          {tabs.map((tab, index) => (
            <Tab
              key={index}
              label={
                <Badge badgeContent={tab.data.length} color="primary">
                  {tab.label}
                </Badge>
              }
            />
          ))}
        </Tabs>
      </Box>

      <CustomTabPanel value={tabValue} index={0}>
        {peerReviews.pending.map(review => (
          <Card key={review.id} sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6">{review.project}</Typography>
              <Typography variant="body2" color="text.secondary">Reviewee: {review.reviewee}</Typography>
              <Typography variant="body2" color="text.secondary">Deadline: {review.deadline}</Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: 'space-between' }}>
              <Chip label={`Reward: ${review.sklReward} SKL`} color="success" />
              <Button variant="contained" onClick={() => handleOpenDialog(review)}>Start Review</Button>
            </CardActions>
          </Card>
        ))}
      </CustomTabPanel>

      <CustomTabPanel value={tabValue} index={1}>
        <List component={Paper}>
          {peerReviews.completed.map((review, index) => (
            <React.Fragment key={review.id}>
              <ListItem>
                <ListItemText
                  primary={review.project}
                  secondary={`Reviewed: ${review.reviewee} on ${review.completedDate}`}
                />
                <Box textAlign="right">
                  <Rating value={review.rating} readOnly />
                  <Typography variant="body2" color="success.main">+{review.sklEarned} SKL</Typography>
                </Box>
              </ListItem>
              {index < peerReviews.completed.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </CustomTabPanel>

      <CustomTabPanel value={tabValue} index={2}>
        <List component={Paper}>
          {peerReviews.received.map((review, index) => (
             <React.Fragment key={review.id}>
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary={review.project}
                  secondary={
                    <>
                      <Typography component="span" variant="body2" color="text.primary">
                        "{review.comment}"
                      </Typography>
                      <br />
                      - {review.reviewer} on {review.date}
                    </>
                  }
                />
                 <Box textAlign="right">
                  <Rating value={review.rating} readOnly />
                  <Typography variant="body2" color="success.main">+{review.sklEarned} SKL</Typography>
                </Box>
              </ListItem>
              {index < peerReviews.received.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </CustomTabPanel>

      <ReviewDialog open={dialogOpen} handleClose={handleCloseDialog} review={selectedReview} />
    </Box>
  );
}

export default PeerReview;
