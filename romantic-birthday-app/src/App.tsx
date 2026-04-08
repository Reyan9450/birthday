import { useState } from 'react'
import LoadingScreen from './LoadingScreen'
import FloatingHeartsBackground from './FloatingHeartsBackground'
import MusicToggle from './MusicToggle'
import PageTransition from './PageTransition'
import HeartMiniGame from './HeartMiniGame'
import RomanticIntro from './RomanticIntro'
import FirstMeeting from './FirstMeeting'
import WhyILoveYou from './WhyILoveYou'
import LoveLetters from './LoveLetters'
import BirthdayWish from './BirthdayWish'
import RelationshipTimer from './RelationshipTimer'
import FinalPage from './FinalPage'

function App() {
  const [currentSection, setCurrentSection] = useState(0)
  const [loading, setLoading] = useState(true)

  const onNext = () => setCurrentSection(prev => Math.min(prev + 1, 7))

  if (loading) {
    return <LoadingScreen onComplete={() => setLoading(false)} />
  }

  const renderSection = () => {
    switch (currentSection) {
      case 0: return <HeartMiniGame onNext={onNext} />
      case 1: return <RomanticIntro onNext={onNext} />
      case 2: return <FirstMeeting onNext={onNext} />
      case 3: return <WhyILoveYou onNext={onNext} />
      case 4: return <LoveLetters onNext={onNext} />
      case 5: return <BirthdayWish onNext={onNext} />
      case 6: return <RelationshipTimer onNext={onNext} />
      case 7: return <FinalPage />
      default: return null
    }
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-pink-50">
      <FloatingHeartsBackground />
      <MusicToggle />
      <PageTransition sectionKey={currentSection}>
        {renderSection()}
      </PageTransition>
    </div>
  )
}

export default App
