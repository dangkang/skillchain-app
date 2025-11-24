import { useApp } from '../context/AppContext'

function Portfolio() {
  const { nftCertificates, userProfile, sklHistory } = useApp()

  const certifications = nftCertificates.filter(nft => nft.type === 'certification')
  const trainings = nftCertificates.filter(nft => nft.type === 'training')
  const contributions = nftCertificates.filter(nft => nft.type === 'contribution')

  const totalSKLEarned = sklHistory
    .filter(item => item.type === 'earned')
    .reduce((sum, item) => sum + item.amount, 0)

  return (
    <div className="portfolio">
      <h1 className="page-title">ポートフォリオ</h1>

      {/* プロフィールサマリー */}
      <div className="portfolio-header">
        <div className="profile-avatar">
          <div className="avatar-circle">{userProfile.name.charAt(0)}</div>
        </div>
        <div className="profile-info">
          <h2 className="profile-name">{userProfile.name}</h2>
          <p className="profile-did">{userProfile.did}</p>
          <p className="profile-member-since">メンバー登録: {userProfile.memberSince}</p>
        </div>
        <div className="profile-stats">
          <div className="stat-box">
            <div className="stat-value">{nftCertificates.length}</div>
            <div className="stat-label">NFT証明書</div>
          </div>
          <div className="stat-box">
            <div className="stat-value">{totalSKLEarned}</div>
            <div className="stat-label">累計SKL獲得</div>
          </div>
        </div>
      </div>

      {/* スキル概要 */}
      <section className="portfolio-section">
        <h2 className="section-title">スキル概要</h2>
        <div className="skill-summary">
          <div className="skill-category">
            <h3 className="skill-category-title">
              <span className="category-icon">🎓</span>
              資格認定 ({certifications.length})
            </h3>
            <div className="skill-items">
              {certifications.map(cert => (
                <div key={cert.id} className="skill-item">
                  <img src={cert.image} alt={cert.title} className="skill-icon" />
                  <div className="skill-info">
                    <p className="skill-name">{cert.title}</p>
                    <p className="skill-issuer">{cert.issuer}</p>
                    <p className="skill-date">{cert.issueDate}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="skill-category">
            <h3 className="skill-category-title">
              <span className="category-icon">📚</span>
              研修修了 ({trainings.length})
            </h3>
            <div className="skill-items">
              {trainings.map(training => (
                <div key={training.id} className="skill-item">
                  <img src={training.image} alt={training.title} className="skill-icon" />
                  <div className="skill-info">
                    <p className="skill-name">{training.title}</p>
                    <p className="skill-issuer">{training.issuer}</p>
                    <p className="skill-date">{training.issueDate}</p>
                    {training.sklEarned && (
                      <span className="skl-earned-small">+{training.sklEarned} SKL</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="skill-category">
            <h3 className="skill-category-title">
              <span className="category-icon">💻</span>
              プロジェクト貢献 ({contributions.length})
            </h3>
            <div className="skill-items">
              {contributions.map(contrib => (
                <div key={contrib.id} className="skill-item">
                  <img src={contrib.image} alt={contrib.title} className="skill-icon" />
                  <div className="skill-info">
                    <p className="skill-name">{contrib.title}</p>
                    <p className="skill-issuer">{contrib.issuer}</p>
                    <p className="skill-date">{contrib.issueDate}</p>
                    {contrib.sklEarned && (
                      <span className="skl-earned-small">+{contrib.sklEarned} SKL</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* NFTギャラリー */}
      <section className="portfolio-section">
        <h2 className="section-title">NFTギャラリー</h2>
        <div className="nft-gallery">
          {nftCertificates.map(nft => (
            <div key={nft.id} className="gallery-item">
              <img src={nft.image} alt={nft.title} className="gallery-image" />
              <div className="gallery-overlay">
                <p className="gallery-title">{nft.title}</p>
                <p className="gallery-date">{nft.issueDate}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ブロックチェーン検証情報 */}
      <section className="portfolio-section">
        <h2 className="section-title">ブロックチェーン検証</h2>
        <div className="blockchain-info">
          <div className="blockchain-item">
            <span className="blockchain-label">ウォレットアドレス</span>
            <span className="blockchain-value">{userProfile.did}</span>
          </div>
          <div className="blockchain-item">
            <span className="blockchain-label">NFT総数</span>
            <span className="blockchain-value">{nftCertificates.length}件</span>
          </div>
          <div className="blockchain-item">
            <span className="blockchain-label">最終更新</span>
            <span className="blockchain-value">
              {nftCertificates[0]?.issueDate || '-'}
            </span>
          </div>
          <button className="verify-button">
            🔗 ブロックチェーンで検証
          </button>
        </div>
      </section>

      {/* 共有ボタン */}
      <div className="portfolio-actions">
        <button className="btn-primary-large">
          📤 ポートフォリオを共有
        </button>
        <button className="btn-secondary-large">
          📄 PDFでエクスポート
        </button>
      </div>
    </div>
  )
}

export default Portfolio
