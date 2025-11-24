import { useState } from 'react'
import { useApp } from '../context/AppContext'

function PeerReview() {
  const { peerReviews } = useApp()
  const [activeTab, setActiveTab] = useState('pending')
  const [selectedReview, setSelectedReview] = useState(null)

  const tabs = [
    { id: 'pending', label: 'レビュー依頼', count: peerReviews.pending.length },
    { id: 'completed', label: '完了したレビュー', count: peerReviews.completed.length },
    { id: 'received', label: '受け取ったレビュー', count: peerReviews.received.length }
  ]

  const handleStartReview = (review) => {
    setSelectedReview(review)
  }

  return (
    <div className="peer-review">
      <h1 className="page-title">ピアレビュー</h1>

      <div className="review-tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`review-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
            {tab.count > 0 && <span className="tab-badge">{tab.count}</span>}
          </button>
        ))}
      </div>

      {/* レビュー依頼 */}
      {activeTab === 'pending' && (
        <div className="review-content">
          {peerReviews.pending.length === 0 ? (
            <div className="empty-state">
              <p className="empty-icon">📭</p>
              <p className="empty-text">現在レビュー依頼はありません</p>
            </div>
          ) : (
            <div className="review-list">
              {peerReviews.pending.map(review => (
                <div key={review.id} className="review-card">
                  <div className="review-header">
                    <h3 className="review-project-title">{review.project}</h3>
                    <span className="review-reward-badge">
                      💎 {review.sklReward} SKL
                    </span>
                  </div>
                  <div className="review-details">
                    <p className="review-detail-item">
                      <span className="detail-label">レビュー対象:</span>
                      <span className="detail-value">{review.reviewee}</span>
                    </p>
                    <p className="review-detail-item">
                      <span className="detail-label">期限:</span>
                      <span className="detail-value">{review.deadline}</span>
                    </p>
                  </div>
                  <button
                    className="btn-primary"
                    onClick={() => handleStartReview(review)}
                  >
                    レビューを開始
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 完了したレビュー */}
      {activeTab === 'completed' && (
        <div className="review-content">
          {peerReviews.completed.length === 0 ? (
            <div className="empty-state">
              <p className="empty-icon">📝</p>
              <p className="empty-text">完了したレビューはまだありません</p>
            </div>
          ) : (
            <div className="review-list">
              {peerReviews.completed.map(review => (
                <div key={review.id} className="review-card completed">
                  <div className="review-header">
                    <h3 className="review-project-title">{review.project}</h3>
                    <span className="completion-badge">✓ 完了</span>
                  </div>
                  <div className="review-details">
                    <p className="review-detail-item">
                      <span className="detail-label">レビュー対象:</span>
                      <span className="detail-value">{review.reviewee}</span>
                    </p>
                    <p className="review-detail-item">
                      <span className="detail-label">完了日:</span>
                      <span className="detail-value">{review.completedDate}</span>
                    </p>
                    <p className="review-detail-item">
                      <span className="detail-label">評価:</span>
                      <span className="detail-value">{'⭐'.repeat(Math.floor(review.rating))}</span>
                    </p>
                  </div>
                  <div className="skl-earned-banner">
                    💎 {review.sklEarned} SKL を獲得しました
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 受け取ったレビュー */}
      {activeTab === 'received' && (
        <div className="review-content">
          {peerReviews.received.length === 0 ? (
            <div className="empty-state">
              <p className="empty-icon">⭐</p>
              <p className="empty-text">受け取ったレビューはまだありません</p>
            </div>
          ) : (
            <div className="review-list">
              {peerReviews.received.map(review => (
                <div key={review.id} className="review-card received">
                  <div className="review-header">
                    <h3 className="review-project-title">{review.project}</h3>
                    <div className="rating-display">
                      {'⭐'.repeat(review.rating)}
                    </div>
                  </div>
                  <div className="review-details">
                    <p className="review-detail-item">
                      <span className="detail-label">レビュアー:</span>
                      <span className="detail-value">{review.reviewer}</span>
                    </p>
                    <p className="review-detail-item">
                      <span className="detail-label">レビュー日:</span>
                      <span className="detail-value">{review.date}</span>
                    </p>
                  </div>
                  <div className="review-comment">
                    <p className="comment-label">コメント:</p>
                    <p className="comment-text">{review.comment}</p>
                  </div>
                  <div className="skl-earned-banner">
                    💎 {review.sklEarned} SKL を獲得しました
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* レビュー開始モーダル */}
      {selectedReview && (
        <div className="modal-overlay" onClick={() => setSelectedReview(null)}>
          <div className="modal-content review-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedReview(null)}>✕</button>
            <h2 className="modal-title">ピアレビュー実施</h2>
            <div className="modal-body">
              <div className="review-info">
                <h3>{selectedReview.project}</h3>
                <p>レビュー対象: {selectedReview.reviewee}</p>
              </div>
              <div className="review-form">
                <div className="form-group">
                  <label>コード品質（1-5）</label>
                  <div className="rating-input">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button key={star} className="star-button">⭐</button>
                    ))}
                  </div>
                </div>
                <div className="form-group">
                  <label>技術力（1-5）</label>
                  <div className="rating-input">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button key={star} className="star-button">⭐</button>
                    ))}
                  </div>
                </div>
                <div className="form-group">
                  <label>コメント</label>
                  <textarea
                    className="review-textarea"
                    placeholder="詳細なフィードバックを記入してください..."
                    rows="6"
                  />
                </div>
              </div>
              <div className="modal-actions">
                <button className="btn-secondary" onClick={() => setSelectedReview(null)}>
                  キャンセル
                </button>
                <button className="btn-primary">
                  レビューを提出（{selectedReview.sklReward} SKL獲得）
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PeerReview
