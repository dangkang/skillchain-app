import { useState } from 'react'
import { useApp } from '../context/AppContext'

function NFTCertificates() {
  const { nftCertificates } = useApp()
  const [selectedType, setSelectedType] = useState('all')
  const [selectedNFT, setSelectedNFT] = useState(null)

  const types = [
    { id: 'all', label: 'すべて' },
    { id: 'certification', label: '資格認定' },
    { id: 'training', label: '研修修了' },
    { id: 'contribution', label: 'プロジェクト貢献' }
  ]

  const filteredNFTs = selectedType === 'all'
    ? nftCertificates
    : nftCertificates.filter(nft => nft.type === selectedType)

  const getTypeLabel = (type) => {
    const typeMap = {
      certification: '資格認定',
      training: '研修修了',
      contribution: 'プロジェクト貢献'
    }
    return typeMap[type] || type
  }

  return (
    <div className="nft-certificates">
      <h1 className="page-title">NFT証明書</h1>

      <div className="filter-tabs">
        {types.map(type => (
          <button
            key={type.id}
            className={`filter-tab ${selectedType === type.id ? 'active' : ''}`}
            onClick={() => setSelectedType(type.id)}
          >
            {type.label}
          </button>
        ))}
      </div>

      <div className="nft-count">
        {filteredNFTs.length}件の証明書
      </div>

      <div className="nft-grid-large">
        {filteredNFTs.map(nft => (
          <div
            key={nft.id}
            className="nft-card"
            onClick={() => setSelectedNFT(nft)}
          >
            <div className="nft-image-container">
              <img src={nft.image} alt={nft.title} className="nft-image" />
              <span className="nft-type-badge">{getTypeLabel(nft.type)}</span>
            </div>
            <div className="nft-card-body">
              <h3 className="nft-title">{nft.title}</h3>
              <p className="nft-issuer">発行者: {nft.issuer}</p>
              <p className="nft-date">発行日: {nft.issueDate}</p>
              <p className="nft-token-id">Token ID: {nft.tokenId}</p>
              {nft.sklEarned && (
                <div className="nft-skl-earned">
                  <span className="skl-icon">💎</span>
                  <span>+{nft.sklEarned} SKL獲得</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* NFT詳細モーダル */}
      {selectedNFT && (
        <div className="modal-overlay" onClick={() => setSelectedNFT(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedNFT(null)}>✕</button>
            <div className="modal-body">
              <img src={selectedNFT.image} alt={selectedNFT.title} className="modal-nft-image" />
              <div className="modal-nft-details">
                <span className="modal-type-badge">{getTypeLabel(selectedNFT.type)}</span>
                <h2 className="modal-title">{selectedNFT.title}</h2>
                <div className="modal-info-grid">
                  <div className="modal-info-item">
                    <span className="info-label">発行者</span>
                    <span className="info-value">{selectedNFT.issuer}</span>
                  </div>
                  <div className="modal-info-item">
                    <span className="info-label">発行日</span>
                    <span className="info-value">{selectedNFT.issueDate}</span>
                  </div>
                  <div className="modal-info-item">
                    <span className="info-label">Token ID</span>
                    <span className="info-value">{selectedNFT.tokenId}</span>
                  </div>
                  {selectedNFT.sklEarned && (
                    <div className="modal-info-item">
                      <span className="info-label">獲得SKL</span>
                      <span className="info-value highlight">+{selectedNFT.sklEarned} SKL</span>
                    </div>
                  )}
                </div>
                <div className="modal-actions">
                  <button className="btn-primary">ポートフォリオに追加</button>
                  <button className="btn-secondary">シェア</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default NFTCertificates
