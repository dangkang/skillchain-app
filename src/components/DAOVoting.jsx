import { useState } from 'react'
import { useApp } from '../context/AppContext'

function DAOVoting() {
  const { daoProposals, userProfile } = useApp()
  const [filter, setFilter] = useState('active')
  const [selectedProposal, setSelectedProposal] = useState(null)

  const filters = [
    { id: 'active', label: '進行中' },
    { id: 'closed', label: '終了' },
    { id: 'all', label: 'すべて' }
  ]

  const filteredProposals = filter === 'all'
    ? daoProposals
    : daoProposals.filter(p => p.status === filter)

  const getVotePercentage = (votes) => {
    const total = votes.for + votes.against
    if (total === 0) return { for: 0, against: 0 }
    return {
      for: Math.round((votes.for / total) * 100),
      against: Math.round((votes.against / total) * 100)
    }
  }

  const handleVote = (proposal, voteFor) => {
    if (userProfile.sklBalance < proposal.requiredSKL) {
      alert(`投票には${proposal.requiredSKL} SKL以上の保有が必要です`)
      return
    }
    alert(`「${voteFor ? '賛成' : '反対'}」で投票しました`)
    setSelectedProposal(null)
  }

  return (
    <div className="dao-voting">
      <h1 className="page-title">DAO投票</h1>

      {/* 投票権情報 */}
      <div className="voting-power-card">
        <div className="voting-power-icon">🗳️</div>
        <div className="voting-power-info">
          <h3>あなたの投票権</h3>
          <p className="voting-power-value">{userProfile.sklBalance} SKL保有</p>
          <p className="voting-power-desc">
            {userProfile.sklBalance >= 50
              ? '✓ すべての提案に投票可能'
              : `あと${50 - userProfile.sklBalance} SKLで投票権を獲得`}
          </p>
        </div>
      </div>

      {/* フィルター */}
      <div className="filter-tabs">
        {filters.map(f => (
          <button
            key={f.id}
            className={`filter-tab ${filter === f.id ? 'active' : ''}`}
            onClick={() => setFilter(f.id)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* 提案リスト */}
      <div className="proposals-list-full">
        {filteredProposals.length === 0 ? (
          <div className="empty-state">
            <p className="empty-icon">📋</p>
            <p className="empty-text">提案がありません</p>
          </div>
        ) : (
          filteredProposals.map(proposal => {
            const percentage = getVotePercentage(proposal.votes)
            return (
              <div key={proposal.id} className="proposal-card-full">
                <div className="proposal-status-badge">
                  {proposal.status === 'active' && <span className="badge active">進行中</span>}
                  {proposal.status === 'closed' && proposal.result === 'approved' && (
                    <span className="badge approved">✓ 可決</span>
                  )}
                  {proposal.status === 'closed' && proposal.result === 'rejected' && (
                    <span className="badge rejected">✕ 否決</span>
                  )}
                  {proposal.userVoted && <span className="badge voted">投票済み</span>}
                </div>

                <h3 className="proposal-title-large">{proposal.title}</h3>
                <p className="proposal-description-full">{proposal.description}</p>

                <div className="proposal-meta-grid">
                  <div className="meta-item">
                    <span className="meta-label">提案者</span>
                    <span className="meta-value">{proposal.proposer}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">投票期限</span>
                    <span className="meta-value">{proposal.endDate}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">必要SKL</span>
                    <span className="meta-value">{proposal.requiredSKL} SKL</span>
                  </div>
                </div>

                {/* 投票結果 */}
                <div className="vote-results">
                  <div className="vote-bar-container">
                    <div className="vote-bar">
                      <div
                        className="vote-bar-for"
                        style={{ width: `${percentage.for}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="vote-counts">
                    <div className="vote-count-item for">
                      <span className="vote-label">賛成</span>
                      <span className="vote-number">{proposal.votes.for} ({percentage.for}%)</span>
                    </div>
                    <div className="vote-count-item against">
                      <span className="vote-label">反対</span>
                      <span className="vote-number">{proposal.votes.against} ({percentage.against}%)</span>
                    </div>
                  </div>
                </div>

                {/* 投票ボタン */}
                {proposal.status === 'active' && !proposal.userVoted && (
                  <div className="vote-actions">
                    <button
                      className="vote-button for"
                      onClick={() => setSelectedProposal({ ...proposal, voteFor: true })}
                      disabled={userProfile.sklBalance < proposal.requiredSKL}
                    >
                      賛成
                    </button>
                    <button
                      className="vote-button against"
                      onClick={() => setSelectedProposal({ ...proposal, voteFor: false })}
                      disabled={userProfile.sklBalance < proposal.requiredSKL}
                    >
                      反対
                    </button>
                  </div>
                )}

                {proposal.userVoted && (
                  <div className="voted-status">
                    ✓ 投票済み（{proposal.votedFor ? '賛成' : '反対'}）
                  </div>
                )}
              </div>
            )
          })
        )}
      </div>

      {/* 投票確認モーダル */}
      {selectedProposal && (
        <div className="modal-overlay" onClick={() => setSelectedProposal(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedProposal(null)}>✕</button>
            <h2 className="modal-title">投票確認</h2>
            <div className="modal-body">
              <div className="vote-confirmation">
                <h3>{selectedProposal.title}</h3>
                <p className="vote-choice">
                  {selectedProposal.voteFor ? '✓ 賛成' : '✕ 反対'}で投票します
                </p>
                <div className="vote-info">
                  <p>この投票は取り消すことができません。</p>
                  <p>投票にSKLは消費されません。</p>
                </div>
              </div>
              <div className="modal-actions">
                <button
                  className="btn-secondary"
                  onClick={() => setSelectedProposal(null)}
                >
                  キャンセル
                </button>
                <button
                  className="btn-primary"
                  onClick={() => handleVote(selectedProposal, selectedProposal.voteFor)}
                >
                  投票する
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DAOVoting
