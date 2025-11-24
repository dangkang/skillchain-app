import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Box, Paper, Typography, Tabs, Tab, Card, CardContent, Button, LinearProgress, Chip,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid
} from '@mui/material';
import { CheckCircle, Cancel, HowToVote } from '@mui/icons-material';

function ProposalCard({ proposal, onVoteClick }) {
  const { sklBalance } = useApp();
  const totalVotes = proposal.votes.for + proposal.votes.against;
  const forPercentage = totalVotes > 0 ? (proposal.votes.for / totalVotes) * 100 : 0;
  const canVote = sklBalance >= proposal.requiredSKL;

  const getStatusChip = () => {
    if (proposal.status === 'closed') {
      return <Chip label={proposal.result === 'approved' ? 'Approved' : 'Rejected'} color={proposal.result === 'approved' ? 'success' : 'error'} />;
    }
    if (proposal.userVoted) {
      return <Chip label="Voted" color="info" variant="outlined" />;
    }
    return <Chip label="Active" color="primary" />;
  };

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h6">{proposal.title}</Typography>
          {getStatusChip()}
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>{proposal.description}</Typography>
        
        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" color="success.main">For: {proposal.votes.for} ({forPercentage.toFixed(1)}%)</Typography>
            <Typography variant="body2" color="error.main">Against: {proposal.votes.against} ({(100 - forPercentage).toFixed(1)}%)</Typography>
          </Box>
          <LinearProgress variant="determinate" value={forPercentage} color="success" sx={{ height: 8, borderRadius: 4, '& .MuiLinearProgress-bar': { backgroundColor: 'success.main' }, bgcolor: 'error.light' }} />
        </Box>

        <Grid container spacing={2} sx={{ color: 'text.secondary', mb: 2 }}>
            <Grid item xs={12} sm={4}>
                <Typography variant="caption">Proposer: {proposal.proposer}</Typography>
            </Grid>
            <Grid item xs={6} sm={4}>
                <Typography variant="caption">Ends: {proposal.endDate}</Typography>
            </Grid>
            <Grid item xs={6} sm={4}>
                <Typography variant="caption">Required: {proposal.requiredSKL} SKL</Typography>
            </Grid>
        </Grid>

        {proposal.status === 'active' && !proposal.userVoted && (
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 2 }}>
            <Button variant="outlined" color="success" onClick={() => onVoteClick(proposal, true)} disabled={!canVote}>
              Vote For
            </Button>
            <Button variant="outlined" color="error" onClick={() => onVoteClick(proposal, false)} disabled={!canVote}>
              Vote Against
            </Button>
          </Box>
        )}
         {!canVote && proposal.status === 'active' && !proposal.userVoted && (
             <Typography variant="caption" color="error.main">You need at least {proposal.requiredSKL} SKL to vote.</Typography>
         )}
      </CardContent>
    </Card>
  );
}

function DAOVoting() {
  const { wallet, sklBalance, daoProposals, setDaoProposals } = useApp();
  const [tab, setTab] = useState('active');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedVote, setSelectedVote] = useState(null);

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  const handleVoteClick = (proposal, voteFor) => {
    setSelectedVote({ proposal, voteFor });
    setDialogOpen(true);
  };

  const handleConfirmVote = () => {
    if (!selectedVote) return;
    const { proposal, voteFor } = selectedVote;
    
    // NOTE: This is a mock update. In a real app, this would be a blockchain transaction.
    setDaoProposals(proposals => proposals.map(p => {
      if (p.id === proposal.id) {
        return {
          ...p,
          userVoted: true,
          votedFor: voteFor,
          votes: {
            ...p.votes,
            [voteFor ? 'for' : 'against']: p.votes[voteFor ? 'for' : 'against'] + 1
          }
        };
      }
      return p;
    }));

    setDialogOpen(false);
    setSelectedVote(null);
  };

  if (!wallet) {
    return (
      <Paper sx={{ p: 4, textAlign: 'center' }}>
        <Typography>Please connect your wallet to participate in DAO voting.</Typography>
      </Paper>
    );
  }

  const filteredProposals = daoProposals.filter(p => tab === 'all' || p.status === tab);

  return (
    <Box>
      <Paper sx={{ p: 2, mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
        <HowToVote color="primary" sx={{ fontSize: 40 }} />
        <Box>
          <Typography variant="h6">Your Voting Power</Typography>
          <Typography>{sklBalance} SKL</Typography>
        </Box>
      </Paper>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tab} onChange={handleTabChange} aria-label="proposals filter">
          <Tab label="Active" value="active" />
          <Tab label="Closed" value="closed" />
          <Tab label="All" value="all" />
        </Tabs>
      </Box>

      {filteredProposals.map(proposal => (
        <ProposalCard key={proposal.id} proposal={proposal} onVoteClick={handleVoteClick} />
      ))}

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Confirm Your Vote</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You are about to vote <strong>{selectedVote?.voteFor ? 'FOR' : 'AGAINST'}</strong> on the proposal:
            <br />
            <strong>"{selectedVote?.proposal.title}"</strong>
            <br /><br />
            This action is irreversible.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleConfirmVote} autoFocus variant="contained" color={selectedVote?.voteFor ? 'success' : 'error'}>
            Confirm Vote
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default DAOVoting;
