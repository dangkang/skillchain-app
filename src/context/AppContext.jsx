import { createContext, useState, useContext, useCallback } from 'react';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [wallet, setWallet] = useState(null);
  const [sklBalance, setSklBalance] = useState(0);
  
  const [userProfile, setUserProfile] = useState({
    name: '山田太郎',
    did: 'did:ethr:0x1234...5678',
    memberSince: '2024年1月'
  });

  const connectWallet = useCallback(() => {
    const dummyWallet = "0xAbCdEf12345678901234567890aBcDeF12345678";
    setWallet(dummyWallet);
    setSklBalance(350); // Set initial balance from dummy data
  }, []);

  const disconnectWallet = useCallback(() => {
    setWallet(null);
    setSklBalance(0);
  }, []);

  // NFT証明書データ
  const [nftCertificates, setNftCertificates] = useState([
    {
      id: 1,
      type: 'certification',
      title: 'AWS認定ソリューションアーキテクト',
      issuer: 'Amazon Web Services',
      issueDate: '2024-03-15',
      tokenId: 'NFT-AWS-2024-001',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400'
    },
    {
      id: 2,
      type: 'training',
      title: 'ブロックチェーン開発基礎コース',
      issuer: 'SkillChain Academy',
      issueDate: '2024-05-20',
      tokenId: 'NFT-TRAIN-2024-042',
      sklEarned: 50,
      image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400'
    },
    {
      id: 3,
      type: 'contribution',
      title: 'オープンソースプロジェクト貢献',
      issuer: 'React Core Team',
      issueDate: '2024-08-10',
      tokenId: 'NFT-OSS-2024-089',
      sklEarned: 100,
      image: 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=400'
    },
    {
      id: 4,
      type: 'certification',
      title: 'Google Cloud Professional',
      issuer: 'Google Cloud',
      issueDate: '2024-09-05',
      tokenId: 'NFT-GCP-2024-127',
      image: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=400'
    }
  ]);

  // スキルトークン履歴
  const [sklHistory, setSklHistory] = useState([
    { id: 1, date: '2024-11-10', type: 'earned', amount: 100, description: 'OSS貢献評価', from: 'React Core Team' },
    { id: 2, date: '2024-11-05', type: 'earned', amount: 50, description: '研修修了', from: 'SkillChain Academy' },
    { id: 3, date: '2024-10-28', type: 'spent', amount: -30, description: 'プレミアム研修受講', to: 'Advanced AI Course' },
    { id: 4, date: '2024-10-15', type: 'earned', amount: 80, description: 'ピアレビュー実施', from: 'Community' },
    { id: 5, date: '2024-09-20', type: 'earned', amount: 120, description: 'プロジェクト完遂', from: 'Client Project Alpha' },
    { id: 6, date: '2024-09-10', type: 'spent', amount: -20, description: 'NFT発行手数料', to: 'Platform' }
  ]);

  // DAO投票データ
  const [daoProposals, setDaoProposals] = useState([
    {
      id: 1,
      title: '次期研修コース: 生成AI実践開発',
      description: 'ChatGPT APIを活用した実践的なアプリケーション開発を学ぶコース',
      proposer: 'tech_innovator.eth',
      status: 'active',
      endDate: '2024-11-20',
      votes: { for: 1250, against: 320 },
      userVoted: false,
      requiredSKL: 100
    },
    {
      id: 2,
      title: 'ピアレビュー評価基準の改定',
      description: 'コード品質だけでなく、チームコラボレーション能力も評価対象に含める',
      proposer: 'dao_member_42.eth',
      status: 'active',
      endDate: '2024-11-18',
      votes: { for: 890, against: 450 },
      userVoted: true,
      votedFor: true,
      requiredSKL: 50
    },
    {
      id: 3,
      title: 'NFT発行手数料の引き下げ',
      description: '現在500円の手数料を300円に引き下げ、より多くの技術者が利用しやすく',
      proposer: 'community_voice.eth',
      status: 'closed',
      endDate: '2024-11-10',
      votes: { for: 2100, against: 180 },
      result: 'approved',
      requiredSKL: 50
    }
  ]);

  // ピアレビューデータ
  const [peerReviews, setPeerReviews] = useState({
    pending: [
      {
        id: 1,
        reviewee: 'dev_alice.eth',
        project: 'DeFiダッシュボード開発',
        deadline: '2024-11-15',
        sklReward: 30
      },
      {
        id: 2,
        reviewee: 'engineer_bob.eth',
        project: 'NFTマーケットプレイス',
        deadline: '2024-11-18',
        sklReward: 40
      }
    ],
    completed: [
      {
        id: 3,
        reviewee: 'coder_charlie.eth',
        project: 'スマートコントラクト監査',
        completedDate: '2024-11-05',
        sklEarned: 50,
        rating: 4.5
      }
    ],
    received: [
      {
        id: 4,
        reviewer: 'senior_dev.eth',
        project: 'React Component Library',
        date: '2024-10-20',
        rating: 5,
        comment: '優れたコード品質とドキュメント。再利用性が高い設計。',
        sklEarned: 100
      }
    ]
  });

  const value = {
    wallet,
    sklBalance,
    connectWallet,
    disconnectWallet,
    userProfile,
    setUserProfile,
    nftCertificates,
    setNftCertificates,
    sklHistory,
    setSklHistory,
    daoProposals,
    setDaoProposals,
    peerReviews,
    setPeerReviews
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
