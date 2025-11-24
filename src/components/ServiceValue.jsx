import { useApp } from '../context/AppContext'

function ServiceValue() {
  const {
    setCurrentView,
    userProfile,
    nftCertificates,
    sklHistory,
    daoProposals,
    peerReviews
  } = useApp()

  // --- Calculate Costs (Investment) ---
  const reviewsDone = peerReviews.completed.length;
  const votesCastCount = daoProposals.filter(p => p.userVote).length;

  // --- Calculate Outcomes (Returns) ---
  const certsEarned = nftCertificates.length;
  const totalSKLEarned = sklHistory
    .filter(item => item.type === 'earned')
    .reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="service-value">
      <h1 className="page-title">サービス価値の評価</h1>
      <p className="page-subtitle">あなたの活動コストと得られた成果を比較します。</p>

      <div className="value-grid">
        {/* --- コスト (あなたの投資) --- */}
        <div className="value-card investment-card">
          <h2 className="card-title">あなたの投資 (コスト)</h2>
          <div className="value-item">
            <span className="item-label">完了したピアレビュー</span>
            <span className="item-value">{reviewsDone} 件</span>
          </div>
          <div className="value-item">
            <span className="item-label">参加したDAO投票</span>
            <span className="item-value">{votesCastCount} 件</span>
          </div>
           <div className="value-item">
            <span className="item-label">プラットフォーム利用時間</span>
            <span className="item-value">約 15 時間 <small>(推定値)</small></span>
          </div>
          <div className="card-summary">
            <p>スキル証明とコミュニティへの貢献のために、貴重な時間と専門知識を投資しています。</p>
          </div>
        </div>

        {/* --- 成果 (あなたへのリターン) --- */}
        <div className="value-card return-card">
          <h2 className="card-title">あなたへのリターン (成果)</h2>
          <div className="value-item">
            <span className="item-label">獲得したNFT証明書</span>
            <span className="item-value highlight">{certsEarned} 件</span>
          </div>
          <div className="value-item">
            <span className="item-label">獲得したSKLトークン</span>
            <span className="item-value highlight">{totalSKLEarned.toLocaleString()} SKL</span>
          </div>
          <div className="value-item">
            <span className="item-label">ポートフォリオ価値</span>
            <span className="item-value">向上中 🚀</span>
          </div>
          <div className="card-summary">
            <p>あなたのスキルはブロックチェーン上で証明され、経済的なインセンティブと信頼性の高いポートフォリオを構築しています。</p>
          </div>
        </div>
      </div>

      {/* --- 評価サマリー --- */}
      <div className="evaluation-summary">
        <h2>総合評価</h2>
        <p>
          SkillChainプラットフォームは、あなたの専門的な活動を具体的な価値（NFT証明書、SKLトークン）に転換します。
          ピアレビューやDAOへの参加といった「コスト」は、あなたの専門性を証明し、コミュニティ内での影響力を高めるための重要な「投資」です。
        </p>
        <p>
          現在の活動により、あなたは <strong>{certsEarned}件のNFT証明書</strong>と<strong>{totalSKLEarned.toLocaleString()} SKL</strong> を獲得しました。これは、あなたのスキルと貢献が客観的に評価され、価値として蓄積されていることを示しています。
          今後もプラットフォームを活用することで、キャリアの可能性をさらに広げることができるでしょう。
        </p>
        <div className="summary-actions">
           <button className="btn-primary" onClick={() => setCurrentView('portfolio')}>ポートフォリオを確認</button>
           <button className="btn-secondary" onClick={() => setCurrentView('skl')}>SKLトークンの使い方を見る</button>
        </div>
      </div>
    </div>
  )
}

export default ServiceValue