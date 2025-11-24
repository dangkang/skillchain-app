import { AppProvider, useApp } from './context/AppContext'
import Header from './components/Header'
import Dashboard from './components/Dashboard'
import NFTCertificates from './components/NFTCertificates'
import SkillToken from './components/SkillToken'
import PeerReview from './components/PeerReview'
import DAOVoting from './components/DAOVoting'
import Portfolio from './components/Portfolio'
import ServiceValue from './components/ServiceValue' // この行を追加

function AppContent() {
  const { currentView } = useApp()

  return (
    <div className="app">
      <Header />
      <main className="main-content">
        {currentView === 'dashboard' && <Dashboard />}
        {currentView === 'nft' && <NFTCertificates />}
        {currentView === 'skl' && <SkillToken />}
        {currentView === 'review' && <PeerReview />}
        {currentView === 'dao' && <DAOVoting />}
        {currentView === 'portfolio' && <Portfolio />}
        {currentView === 'service-value' && <ServiceValue />} {/* この行を追加 */}
      </main>
    </div>
  )
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  )
}

export default App