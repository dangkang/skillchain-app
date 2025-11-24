import { useApp } from '../context/AppContext'

function SkillToken() {
  const { userProfile, sklHistory } = useApp()

  const totalEarned = sklHistory
    .filter(item => item.type === 'earned')
    .reduce((sum, item) => sum + item.amount, 0)

  const totalSpent = Math.abs(
    sklHistory
      .filter(item => item.type === 'spent')
      .reduce((sum, item) => sum + item.amount, 0)
  )

  return (
    <div className="skill-token">
      <h1 className="page-title">SKLトークン</h1>

      {/* 残高カード */}
      <div className="skl-balance-card">
        <div className="balance-header">
          <span className="balance-icon-large">💎</span>
          <div className="balance-info">
            <p className="balance-label">現在の残高</p>
            <h2 className="balance-amount-large">{userProfile.sklBalance} SKL</h2>
          </div>
        </div>
        <div className="balance-stats">
          <div className="stat-item">
            <span className="stat-label">累計獲得</span>
            <span className="stat-value earned">+{totalEarned} SKL</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">累計使用</span>
            <span className="stat-value spent">-{totalSpent} SKL</span>
          </div>
        </div>
      </div>

      {/* SKLの使い道 */}
      <section className="skl-section">
        <h2 className="section-title">SKLトークンの使い道</h2>
        <div className="use-cases">
          <div className="use-case-card">
            <div className="use-case-icon">📚</div>
            <h3 className="use-case-title">プレミアム研修受講</h3>
            <p className="use-case-desc">高度な技術研修をSKLで受講可能</p>
            <p className="use-case-cost">30-100 SKL</p>
          </div>
          <div className="use-case-card">
            <div className="use-case-icon">🗳️</div>
            <h3 className="use-case-title">DAO投票権</h3>
            <p className="use-case-desc">プラットフォームの方針決定に参加</p>
            <p className="use-case-cost">50+ SKL保有で投票可能</p>
          </div>
          <div className="use-case-card">
            <div className="use-case-icon">🎖️</div>
            <h3 className="use-case-title">NFT発行</h3>
            <p className="use-case-desc">自己申告の実績をNFT化</p>
            <p className="use-case-cost">20 SKL</p>
          </div>
          <div className="use-case-card">
            <div className="use-case-icon">⭐</div>
            <h3 className="use-case-title">プレミアム機能</h3>
            <p className="use-case-desc">優先レビュー、高度な分析など</p>
            <p className="use-case-cost">50 SKL/月</p>
          </div>
        </div>
      </section>

      {/* 取引履歴 */}
      <section className="skl-section">
        <h2 className="section-title">取引履歴</h2>
        <div className="skl-history-list">
          {sklHistory.map(item => (
            <div key={item.id} className="skl-history-item">
              <div className="history-left">
                <div className={`history-icon ${item.type}`}>
                  {item.type === 'earned' ? '📈' : '📉'}
                </div>
                <div className="history-info">
                  <p className="history-desc">{item.description}</p>
                  <p className="history-party">
                    {item.from ? `from: ${item.from}` : `to: ${item.to}`}
                  </p>
                  <p className="history-date">{item.date}</p>
                </div>
              </div>
              <div className={`history-amount ${item.type}`}>
                {item.amount > 0 ? '+' : ''}{item.amount} SKL
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 獲得方法 */}
      <section className="skl-section">
        <h2 className="section-title">SKLトークンの獲得方法</h2>
        <div className="earn-methods">
          <div className="earn-method">
            <div className="earn-icon">🎓</div>
            <div className="earn-content">
              <h3 className="earn-title">研修修了</h3>
              <p className="earn-desc">認定研修コースを修了すると50-100 SKLを獲得</p>
            </div>
          </div>
          <div className="earn-method">
            <div className="earn-icon">💻</div>
            <div className="earn-content">
              <h3 className="earn-title">OSS貢献</h3>
              <p className="earn-desc">オープンソースプロジェクトへの貢献で80-150 SKL</p>
            </div>
          </div>
          <div className="earn-method">
            <div className="earn-icon">👥</div>
            <div className="earn-content">
              <h3 className="earn-title">ピアレビュー</h3>
              <p className="earn-desc">他のエンジニアのレビューで30-50 SKL</p>
            </div>
          </div>
          <div className="earn-method">
            <div className="earn-icon">🚀</div>
            <div className="earn-content">
              <h3 className="earn-title">プロジェクト完遂</h3>
              <p className="earn-desc">クライアントプロジェクトの成功で100-200 SKL</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default SkillToken
