import React from 'react';
import { useApp } from '../context/AppContext';
import { Link as RouterLink } from 'react-router-dom';
import { Grid, Card, CardContent, Typography, Button, Box, Paper, List, ListItem, ListItemText, ListItemAvatar, Avatar, Divider } from '@mui/material';
import { School, Stars, HowToVote, Group, ArrowForward, TrendingUp, TrendingDown } from '@mui/icons-material';

function StatCard({ title, value, icon, to }) {
  return (
    <Grid item xs={12} sm={6} md={3}>
      <Paper component={RouterLink} to={to} sx={{ p: 2, display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
        <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>{icon}</Avatar>
        <Box>
          <Typography variant="h6">{value}</Typography>
          <Typography variant="body2" color="text.secondary">{title}</Typography>
        </Box>
      </Paper>
    </Grid>
  );
}

function Dashboard() {
  const { wallet, userProfile, sklBalance, nftCertificates, sklHistory, daoProposals, peerReviews } = useApp();

  if (!wallet) {
    return (
      <Paper sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h5">Welcome to SkillChain</Typography>
        <Typography sx={{ mt: 2, mb: 3 }}>Please connect your wallet to view your dashboard.</Typography>
      </Paper>
    );
  }

  const recentNFTs = nftCertificates.slice(0, 2);
  const recentSKL = sklHistory.slice(0, 3);
  const activeProposals = daoProposals.filter(p => p.status === 'active').slice(0, 2);

  return (
    <Grid container spacing={3}>
      {/* Stat Cards */}
      <StatCard title="NFT Certificates" value={nftCertificates.length} icon={<School />} to="/certificates" />
      <StatCard title="SKL Balance" value={sklBalance} icon={<Stars />} to="/tokens" />
      <StatCard title="Active Votes" value={daoProposals.filter(p => p.status === 'active').length} icon={<HowToVote />} to="/voting" />
      <StatCard title="Pending Reviews" value={peerReviews.pending.length} icon={<Group />} to="/review" />

      {/* Recent NFTs */}
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">Recent Certificates</Typography>
            <Button component={RouterLink} to="/certificates" endIcon={<ArrowForward />}>View All</Button>
          </Box>
          <Grid container spacing={2}>
            {recentNFTs.map(nft => (
              <Grid item xs={12} sm={6} key={nft.id}>
                <Card>
                  <CardContent>
                    <Typography variant="subtitle2" noWrap>{nft.title}</Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>{nft.issuer}</Typography>
                    <Typography variant="caption" color="text.secondary">{nft.issueDate}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Grid>

      {/* Recent SKL History */}
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography variant="h6">Recent SKL History</Typography>
            <Button component={RouterLink} to="/tokens" endIcon={<ArrowForward />}>View All</Button>
          </Box>
          <List>
            {recentSKL.map((item, index) => (
              <React.Fragment key={item.id}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: item.type === 'earned' ? 'success.light' : 'error.light' }}>
                      {item.type === 'earned' ? <TrendingUp /> : <TrendingDown />}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={item.description}
                    secondary={item.from ? `from: ${item.from}` : `to: ${item.to}`}
                  />
                  <Typography color={item.type === 'earned' ? 'success.main' : 'error.main'}>
                    {item.amount > 0 ? '+' : ''}{item.amount} SKL
                  </Typography>
                </ListItem>
                {index < recentSKL.length - 1 && <Divider variant="inset" component="li" />}
              </React.Fragment>
            ))}
          </List>
        </Paper>
      </Grid>

      {/* Active Proposals */}
      {activeProposals.length > 0 && (
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography variant="h6">Active DAO Proposals</Typography>
              <Button component={RouterLink} to="/voting" endIcon={<ArrowForward />}>View All</Button>
            </Box>
            <List>
              {activeProposals.map(proposal => (
                <ListItem key={proposal.id} secondaryAction={
                  <Button variant="outlined" size="small" component={RouterLink} to="/voting">
                    Vote
                  </Button>
                }>
                  <ListItemText
                    primary={proposal.title}
                    secondary={`Ends: ${proposal.endDate} | Required: ${proposal.requiredSKL} SKL`}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      )}
    </Grid>
  );
}

export default Dashboard;
