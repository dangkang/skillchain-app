import React from 'react';
import { useApp } from '../context/AppContext';
import { Paper, Typography, Grid, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip } from '@mui/material';
import { Stars, TrendingUp, TrendingDown, School, HowToVote, Code, Group } from '@mui/icons-material';

function SkillToken() {
  const { wallet, sklBalance, sklHistory } = useApp();

  if (!wallet) {
    return (
      <Paper sx={{ p: 4, textAlign: 'center' }}>
        <Typography>Please connect your wallet to view your SKL token information.</Typography>
      </Paper>
    );
  }

  const totalEarned = sklHistory
    .filter(item => item.type === 'earned')
    .reduce((sum, item) => sum + item.amount, 0);

  const totalSpent = Math.abs(
    sklHistory
      .filter(item => item.type === 'spent')
      .reduce((sum, item) => sum + item.amount, 0)
  );

  return (
    <Grid container spacing={3}>
      {/* Balance Card */}
      <Grid item xs={12}>
        <Paper sx={{ p: 3, display: 'flex', alignItems: 'center', flexDirection: { xs: 'column', sm: 'row' } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: { xs: 2, sm: 0 } }}>
            <Stars sx={{ fontSize: 60, color: 'primary.main', mr: 2 }} />
            <Box>
              <Typography variant="h4">{sklBalance} SKL</Typography>
              <Typography color="text.secondary">Current Balance</Typography>
            </Box>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: 'flex', gap: 4 }}>
            <Box textAlign="center">
              <Typography variant="h6" color="success.main">+{totalEarned} SKL</Typography>
              <Typography color="text.secondary">Total Earned</Typography>
            </Box>
            <Box textAlign="center">
              <Typography variant="h6" color="error.main">-{totalSpent} SKL</Typography>
              <Typography color="text.secondary">Total Spent</Typography>
            </Box>
          </Box>
        </Paper>
      </Grid>

      {/* Transaction History */}
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>Transaction History</Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="skl history table">
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>From/To</TableCell>
                <TableCell align="right">Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sklHistory.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>
                    <Chip
                      icon={row.type === 'earned' ? <TrendingUp /> : <TrendingDown />}
                      label={row.type}
                      color={row.type === 'earned' ? 'success' : 'error'}
                      size="small"
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell>{row.from || row.to}</TableCell>
                  <TableCell align="right">
                    <Typography color={row.type === 'earned' ? 'success.main' : 'error.main'}>
                      {row.amount > 0 ? '+' : ''}{row.amount} SKL
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      
      {/* How to Earn/Use */}
      <Grid item xs={12} md={6}>
        <Typography variant="h6" gutterBottom>How to Earn SKL</Typography>
        <Paper sx={{p: 2}}>
            <InfoItem icon={<School />} title="Complete Training" text="Earn 50-100 SKL for completing certified courses." />
            <InfoItem icon={<Code />} title="OSS Contribution" text="Earn 80-150 SKL for contributions to open-source projects." />
            <InfoItem icon={<Group />} title="Peer Review" text="Earn 30-50 SKL for reviewing other engineers' work." />
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant="h6" gutterBottom>How to Use SKL</Typography>
        <Paper sx={{p: 2}}>
            <InfoItem icon={<School color="primary" />} title="Premium Training" text="Access advanced courses with SKL." />
            <InfoItem icon={<HowToVote color="primary" />} title="DAO Voting" text="Participate in governance by holding SKL." />
        </Paper>
      </Grid>
    </Grid>
  );
}

const InfoItem = ({icon, title, text}) => (
    <Box sx={{display: 'flex', alignItems: 'center', mb: 2}}>
        <Avatar sx={{mr: 2, bgcolor: 'action.hover'}}>{icon}</Avatar>
        <Box>
            <Typography variant="subtitle1">{title}</Typography>
            <Typography variant="body2" color="text.secondary">{text}</Typography>
        </Box>
    </Box>
)

export default SkillToken;
