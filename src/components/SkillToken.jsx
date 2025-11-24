import React from 'react';
import { useApp } from '../context/AppContext';
import { Paper, Typography, Grid, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, Avatar, Card, CardContent, LinearProgress } from '@mui/material';
import { Stars, TrendingUp, TrendingDown, School, HowToVote, Code, Group, EmojiEvents, Assignment, Verified } from '@mui/icons-material';

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

  // 月間統計（モックデータ）
  const thisMonthEarned = 230;
  const lastMonthEarned = 180;
  const monthlyGrowth = ((thisMonthEarned - lastMonthEarned) / lastMonthEarned * 100).toFixed(1);

  // レベル計算（モック）
  const currentLevel = Math.floor(totalEarned / 500) + 1;
  const nextLevelProgress = ((totalEarned % 500) / 500) * 100;

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

      {/* Monthly Stats & Level */}
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>今月の獲得状況</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h4" color="primary.main">{thisMonthEarned} SKL</Typography>
              <Chip
                label={`${monthlyGrowth > 0 ? '+' : ''}${monthlyGrowth}%`}
                color={monthlyGrowth > 0 ? 'success' : 'error'}
                icon={monthlyGrowth > 0 ? <TrendingUp /> : <TrendingDown />}
              />
            </Box>
            <Typography variant="body2" color="text.secondary">
              先月比: {monthlyGrowth > 0 ? '増加' : '減少'}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">スキルレベル</Typography>
              <Chip icon={<EmojiEvents />} label={`Level ${currentLevel}`} color="primary" />
            </Box>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              次のレベルまで: {500 - (totalEarned % 500)} SKL
            </Typography>
            <LinearProgress
              variant="determinate"
              value={nextLevelProgress}
              sx={{ height: 10, borderRadius: 5 }}
            />
          </CardContent>
        </Card>
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
        <Typography variant="h6" gutterBottom>SKLの獲得方法</Typography>
        <Paper sx={{p: 2}}>
            <InfoItem icon={<School />} title="研修修了" text="認定研修コースを修了すると50-100 SKLを獲得" />
            <InfoItem icon={<Code />} title="OSS貢献" text="オープンソースプロジェクトへの貢献で80-150 SKL" />
            <InfoItem icon={<Group />} title="ピアレビュー" text="他のエンジニアのレビューで30-50 SKL" />
            <InfoItem icon={<EmojiEvents />} title="プロジェクト完遂" text="クライアントプロジェクトの成功で100-200 SKL" />
            <InfoItem icon={<Verified />} title="資格取得" text="公式資格認定を取得すると100-150 SKL" />
            <InfoItem icon={<Assignment />} title="技術記事執筆" text="コミュニティに貢献する記事で20-40 SKL" />
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant="h6" gutterBottom>SKLの使用方法</Typography>
        <Paper sx={{p: 2}}>
            <InfoItem icon={<School color="primary" />} title="プレミアム研修" text="高度な技術研修をSKLで受講可能 (30-100 SKL)" />
            <InfoItem icon={<HowToVote color="primary" />} title="DAO投票権" text="プラットフォームの方針決定に参加 (50+ SKL保有)" />
            <InfoItem icon={<Stars color="primary" />} title="NFT発行" text="自己申告の実績をNFT化 (20 SKL)" />
            <InfoItem icon={<Verified color="primary" />} title="プレミアム機能" text="優先レビュー、高度な分析など (50 SKL/月)" />
            <InfoItem icon={<EmojiEvents color="primary" />} title="特典交換" text="企業スポンサー提供の特典と交換 (100-500 SKL)" />
            <InfoItem icon={<Group color="primary" />} title="メンタリング" text="上級エンジニアとの1on1セッション (80 SKL)" />
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
