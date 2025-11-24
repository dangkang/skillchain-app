import { useApp } from '../context/AppContext'

function Dashboard() {
  const { userProfile, nftCertificates, sklHistory, daoProposals, peerReviews, setCurrentView } = useApp()

  const recentNFTs = nftCertificates.slice(0, 3)
  const recentSKL = sklHistory.slice(0, 3)
  const activeProposals = daoProposals.filter(p => p.status === 'active')
  const pendingReviews = peerReviews.pending

  return (
    <div className="dashboard">
      <h1 className="page-title">ダッシュボード</h1>

      {/* ステータスカード */}
      <div className="status-cards">
        <div className="status-card">
          <div className="card-icon">🎖️</div>
          <div className="card-content">
            <div className="card-value">{nftCertificates.length}</div>
            <div className="card-label">NFT証明書</div>
          </div>
        </div>

        <div className="status-card">
          <div className="card-icon">💎</div>
          <div className="card-content">
            <div className="card-value">{userProfile.sklBalance}</div>
            <div className="card-label">SKLトークン</div>
          </div>
        </div>

        <div className="status-card">
          <div className="card-icon">🗳️</div>
          <div className="card-content">
            <div className="card-value">{activeProposals.length}</div>
            <div className="card-label">進行中の投票</div>
          </div>
        </div>

        <div className="status-card">
          <div className="card-icon">👥</div>
          <div className="card-content">
            <div className="card-value">{pendingReviews.length}</div>
            <div className="card-label">レビュー待ち</div>
          </div>
        </div>
      </div>

      {/* 最近のNFT */}
      <section className="dashboard-section">
        <div className="section-header">
          <h2 className="section-title">最近のNFT証明書</h2>
          <button className="view-all-button" onClick={() => setCurrentView('nft')}>
            すべて表示 →
          </button>
        </div>
        <div className="nft-grid">
          {recentNFTs.map(nft => (
            <div key={nft.id} className="nft-card-mini">
              <img src={nft.image} alt={nft.title} className="nft-card-image" />
              <div className="nft-card-info">
                <h3 className="nft-card-title">{nft.title}</h3>
                <p className="nft-card-date">{nft.issueDate}</p>
                {nft.sklEarned && (
                  <span className="skl-badge">+{nft.sklEarned} SKL</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 最近のSKL履歴 */}
      <section className="dashboard-section">
        <div className="section-header">
          <h2 className="section-title">最近のSKL履歴</h2>
          <button className="view-all-button" onClick={() => setCurrentView('skl')}>
            すべて表示 →
          </button>
        </div>
        <div className="skl-list">
          {recentSKL.map(item => (
            <div key={item.id} className="skl-item">
              <div className="skl-item-left">
                <div className={`skl-icon ${item.type}`}>
                  {item.type === 'earned' ? '📈' : '📉'}
                </div>
                <div className="skl-item-info">
                  <p className="skl-item-desc">{item.description}</p>
                  <p className="skl-item-from">
                    {item.from ? `from: ${item.from}` : `to: ${item.to}`}
                  </p>
                </div>
              </div>
              <div className={`skl-amount ${item.type}`}>
                {item.amount > 0 ? '+' : ''}{item.amount} SKL
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* アクティブな投票 */}
      {activeProposals.length > 0 && (
        <section className="dashboard-section">
          <div className="section-header">
            <h2 className="section-title">投票が必要です</h2>
            <button className="view-all-button" onClick={() => setCurrentView('dao')}>
              投票ページへ →
            </button>
          </div>
          <div className="proposals-list">
            {activeProposals.slice(0, 2).map(proposal => (
              <div key={proposal.id} className="proposal-card-mini">
                <h3 className="proposal-title">{proposal.title}</h3>
                <p className="proposal-description">{proposal.description}</p>
                <div className="proposal-meta">
                  <span className="proposal-deadline">期限: {proposal.endDate}</span>
                  <span className={`vote-status ${proposal.userVoted ? 'voted' : 'pending'}`}>
                    {proposal.userVoted ? '✓ 投票済み' : '未投票'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ペンディングレビュー */}
      {pendingReviews.length > 0 && (
        <section className="dashboard-section">
          <div className="section-header">
            <h2 className="section-title">レビュー依頼</h2>
            <button className="view-all-button" onClick={() => setCurrentView('review')}>
              レビューページへ →
            </button>
          </div>
          <div className="reviews-list">
            {pendingReviews.map(review => (
              <div key={review.id} className="review-card-mini">
                <div className="review-info">
                  <h3 className="review-project">{review.project}</h3>
                  <p className="review-reviewee">レビュー対象: {review.reviewee}</p>
                </div>
                <div className="review-meta">
                  <span className="review-deadline">期限: {review.deadline}</span>
                  <span className="review-reward">報酬: {review.sklReward} SKL</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

export default Dashboard
