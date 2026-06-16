import { useState } from 'react';
import LandingPage from './components/LandingPage';
import LeaseUpload from './components/LeaseUpload';
import AnalysisTimeline from './components/AnalysisTimeline';
import ViolationReport from './components/ViolationReport';
import LandlordPanel from './components/LandlordPanel';
import DemandLetterGenerator from './components/DemandLetterGenerator';
import WowMoment from './components/WowMoment';
import Disclaimer from './components/Disclaimer';
import type { AppScreen } from './types';
import { MOCK_REPORT, MOCK_LANDLORD_INTEL, generateDemandLetter } from './mockData';

function App() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('landing');

  return (
    <>
      <Disclaimer />
      {currentScreen === 'landing' && (
        <LandingPage onGetStarted={() => setCurrentScreen('upload')} />
      )}
      
      {currentScreen === 'upload' && (
        <LeaseUpload onUploadComplete={() => setCurrentScreen('analysis')} />
      )}
      
      {currentScreen === 'analysis' && (
        <AnalysisTimeline onComplete={() => setCurrentScreen('wow')} />
      )}

      {currentScreen === 'wow' && (
        <WowMoment 
          report={MOCK_REPORT} 
          onContinue={() => setCurrentScreen('report')}
          onHome={() => setCurrentScreen('landing')} 
        />
      )}
      
      {currentScreen === 'report' && (
        <ViolationReport 
          report={MOCK_REPORT} 
          onViewLandlord={() => setCurrentScreen('landlord')}
          onGenerateLetter={() => setCurrentScreen('letter')}
          onViewImpact={() => setCurrentScreen('wow')}
        />
      )}

      {currentScreen === 'landlord' && (
        <LandlordPanel 
          intel={MOCK_LANDLORD_INTEL} 
          onBack={() => setCurrentScreen('report')} 
        />
      )}

      {currentScreen === 'letter' && (
        <DemandLetterGenerator 
          letter={generateDemandLetter(MOCK_REPORT)}
          onBack={() => setCurrentScreen('report')} 
        />
      )}
    </>
  );
}

export default App;
