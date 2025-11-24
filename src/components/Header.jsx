import { useApp } from '../context/AppContext'

function Header() {
  const { currentView, setCurrentView, userProfile } = useApp()

  const navItems = [
    { id: 'dashboard', label: 'ダッシュボード', icon: '🏠' },
    { id: 'nft', label: 'NFT証明書', icon: '🎖️' },
    { id: 'skl', label: 'SKLトークン', icon: '💎' },
    { id: 'review', label: 'ピアレビュー', icon: '👥' },
    { id: 'dao', label: 'DAO投票', icon: '🗳️' },
    { id: 'portfolio', label: 'ポートフォリオ', icon: '📊' },
    { id: 'service-value', label: 'サービス価値', icon: '⚖️' } // この行を追加
  ]

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-top">
          <div className="logo" onClick={() => setCurrentView('dashboard')}>
            <span className="logo-icon">⛓️</span>
            <span className="logo-text">SkillChain</span>
          </div>
          <div className="user-profile">
            <span className="user-skl">
              {userProfile.sklBalance.toLocaleString()} SKL
            </span>
            <span className="user-name">{userProfile.name}</span>
            <div className="user-avatar"></div>
          </div>
        </div>

        <nav className="navigation">
          {navItems.map(item => (
            <button
              key={item.id}
              className={`nav-item ${currentView === item.id ? 'active' : ''}`}
              onClick={() => setCurrentView(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </header>
  )
}

export default Header