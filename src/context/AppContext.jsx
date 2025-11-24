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
    },
    {
      id: 5,
      type: 'certification',
      title: 'Azure Solutions Architect Expert',
      issuer: 'Microsoft',
      issueDate: '2024-07-22',
      tokenId: 'NFT-AZURE-2024-065',
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400'
    },
    {
      id: 6,
      type: 'training',
      title: 'Web3フルスタック開発コース',
      issuer: 'SkillChain Academy',
      issueDate: '2024-06-15',
      tokenId: 'NFT-TRAIN-2024-058',
      sklEarned: 75,
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400'
    },
    {
      id: 7,
      type: 'contribution',
      title: 'Ethereum Smart Contract開発',
      issuer: 'Ethereum Foundation',
      issueDate: '2024-04-30',
      tokenId: 'NFT-OSS-2024-045',
      sklEarned: 120,
      image: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?w=400'
    },
    {
      id: 8,
      type: 'training',
      title: 'AIエンジニアリング実践',
      issuer: 'AI Institute',
      issueDate: '2024-02-10',
      tokenId: 'NFT-TRAIN-2024-015',
      sklEarned: 60,
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400'
    },
    {
      id: 9,
      type: 'contribution',
      title: 'Vue.js Core貢献',
      issuer: 'Vue.js Team',
      issueDate: '2024-01-20',
      tokenId: 'NFT-OSS-2024-008',
      sklEarned: 90,
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400'
    },
    {
      id: 10,
      type: 'certification',
      title: 'Kubernetes Administrator (CKA)',
      issuer: 'CNCF',
      issueDate: '2023-12-05',
      tokenId: 'NFT-CKA-2023-189',
      image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=400'
    }
  ]);

  // スキルトークン履歴
  const [sklHistory, setSklHistory] = useState([
    { id: 1, date: '2024-11-10', type: 'earned', amount: 100, description: 'OSS貢献評価', from: 'React Core Team' },
    { id: 2, date: '2024-11-05', type: 'earned', amount: 50, description: '研修修了', from: 'SkillChain Academy' },
    { id: 3, date: '2024-10-28', type: 'spent', amount: -30, description: 'プレミアム研修受講', to: 'Advanced AI Course' },
    { id: 4, date: '2024-10-15', type: 'earned', amount: 80, description: 'ピアレビュー実施', from: 'Community' },
    { id: 5, date: '2024-09-20', type: 'earned', amount: 120, description: 'プロジェクト完遂', from: 'Client Project Alpha' },
    { id: 6, date: '2024-09-10', type: 'spent', amount: -20, description: 'NFT発行手数料', to: 'Platform' },
    { id: 7, date: '2024-08-25', type: 'earned', amount: 90, description: 'Vue.js貢献', from: 'Vue.js Team' },
    { id: 8, date: '2024-08-12', type: 'earned', amount: 75, description: 'Web3研修完了', from: 'SkillChain Academy' },
    { id: 9, date: '2024-07-30', type: 'earned', amount: 120, description: 'Smart Contract開発', from: 'Ethereum Foundation' },
    { id: 10, date: '2024-07-18', type: 'spent', amount: -40, description: 'プレミアム会員登録', to: 'Platform' },
    { id: 11, date: '2024-06-22', type: 'earned', amount: 60, description: 'AI研修修了', from: 'AI Institute' },
    { id: 12, date: '2024-05-15', type: 'earned', amount: 70, description: 'ピアレビュー実施', from: 'Community' },
    { id: 13, date: '2024-04-08', type: 'spent', amount: -25, description: 'DAO提案作成', to: 'Platform' },
    { id: 14, date: '2024-03-20', type: 'earned', amount: 100, description: 'AWS資格取得報酬', from: 'Amazon Web Services' },
    { id: 15, date: '2024-02-14', type: 'earned', amount: 85, description: 'コードレビュー実施', from: 'Community' }
  ]);

  // DAO投票データ
  const [daoProposals, setDaoProposals] = useState([
    {
      id: 1,
      title: '次期研修コース: 生成AI実践開発',
      description: 'ChatGPT APIを活用した実践的なアプリケーション開発を学ぶコース',
      proposer: 'tech_innovator.eth',
      status: 'active',
      endDate: '2024-12-05',
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
      endDate: '2024-12-01',
      votes: { for: 890, against: 450 },
      userVoted: true,
      votedFor: true,
      requiredSKL: 50
    },
    {
      id: 3,
      title: 'SKL報酬の増額提案',
      description: 'ピアレビュー実施時のSKL報酬を現在の30-50から50-80に増額',
      proposer: 'reward_optimizer.eth',
      status: 'active',
      endDate: '2024-11-28',
      votes: { for: 1680, against: 890 },
      userVoted: false,
      requiredSKL: 50
    },
    {
      id: 4,
      title: '新カテゴリー追加: セキュリティ',
      description: 'セキュリティエンジニアリング専門の研修カテゴリーを新設',
      proposer: 'security_pro.eth',
      status: 'active',
      endDate: '2024-12-10',
      votes: { for: 2340, against: 120 },
      userVoted: false,
      requiredSKL: 100
    },
    {
      id: 5,
      title: 'NFT発行手数料の引き下げ',
      description: '現在500円の手数料を300円に引き下げ、より多くの技術者が利用しやすく',
      proposer: 'community_voice.eth',
      status: 'closed',
      endDate: '2024-11-10',
      votes: { for: 2100, against: 180 },
      result: 'approved',
      requiredSKL: 50
    },
    {
      id: 6,
      title: 'DAO投票権の引き下げ',
      description: '投票に必要なSKL保有量を100から50に引き下げ',
      proposer: 'inclusive_dao.eth',
      status: 'closed',
      endDate: '2024-10-25',
      votes: { for: 1890, against: 1120 },
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
        deadline: '2024-12-02',
        sklReward: 30
      },
      {
        id: 2,
        reviewee: 'engineer_bob.eth',
        project: 'NFTマーケットプレイス',
        deadline: '2024-12-05',
        sklReward: 40
      },
      {
        id: 3,
        reviewee: 'dev_carol.eth',
        project: 'Web3 Wallet Integration',
        deadline: '2024-12-08',
        sklReward: 35
      }
    ],
    completed: [
      {
        id: 4,
        reviewee: 'coder_charlie.eth',
        project: 'スマートコントラクト監査',
        completedDate: '2024-11-20',
        sklEarned: 50,
        rating: 4.5
      },
      {
        id: 5,
        reviewee: 'frontend_expert.eth',
        project: 'Reactコンポーネント設計',
        completedDate: '2024-11-15',
        sklEarned: 45,
        rating: 5
      },
      {
        id: 6,
        reviewee: 'backend_ninja.eth',
        project: 'API設計とドキュメント',
        completedDate: '2024-11-10',
        sklEarned: 40,
        rating: 4
      }
    ],
    received: [
      {
        id: 7,
        reviewer: 'senior_dev.eth',
        project: 'React Component Library',
        date: '2024-10-20',
        rating: 5,
        comment: '優れたコード品質とドキュメント。再利用性が高い設計。',
        sklEarned: 100
      },
      {
        id: 8,
        reviewer: 'code_master.eth',
        project: 'TypeScript Migration',
        date: '2024-09-15',
        rating: 4,
        comment: '型定義が適切で、移行がスムーズに行われました。テストカバレッジも良好。',
        sklEarned: 80
      },
      {
        id: 9,
        reviewer: 'architect_pro.eth',
        project: 'Microservices Architecture',
        date: '2024-08-30',
        rating: 5,
        comment: 'システム設計が優れており、スケーラビリティも考慮されています。',
        sklEarned: 120
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
