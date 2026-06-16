import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
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

const pageVariants = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -15 }
};

const pageTransition = {
  type: 'tween',
  ease: 'easeInOut',
  duration: 0.35
} as const;

function App() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('landing');

  return (
    <>
      <Disclaimer />
      <AnimatePresence mode="wait">
        {currentScreen === 'landing' && (
          <motion.div
            key="landing"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
          >
            <LandingPage onGetStarted={() => setCurrentScreen('upload')} />
          </motion.div>
        )}
        
        {currentScreen === 'upload' && (
          <motion.div
            key="upload"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
          >
            <LeaseUpload onUploadComplete={() => setCurrentScreen('analysis')} />
          </motion.div>
        )}
        
        {currentScreen === 'analysis' && (
          <motion.div
            key="analysis"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
          >
            <AnalysisTimeline onComplete={() => setCurrentScreen('wow')} />
          </motion.div>
        )}

        {currentScreen === 'wow' && (
          <motion.div
            key="wow"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
          >
            <WowMoment 
              report={MOCK_REPORT} 
              onContinue={() => setCurrentScreen('report')}
              onHome={() => setCurrentScreen('landing')} 
            />
          </motion.div>
        )}
        
        {currentScreen === 'report' && (
          <motion.div
            key="report"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
          >
            <ViolationReport 
              report={MOCK_REPORT} 
              onViewLandlord={() => setCurrentScreen('landlord')}
              onGenerateLetter={() => setCurrentScreen('letter')}
              onViewImpact={() => setCurrentScreen('wow')}
            />
          </motion.div>
        )}

        {currentScreen === 'landlord' && (
          <motion.div
            key="landlord"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
          >
            <LandlordPanel 
              intel={MOCK_LANDLORD_INTEL} 
              onBack={() => setCurrentScreen('report')} 
            />
          </motion.div>
        )}

        {currentScreen === 'letter' && (
          <motion.div
            key="letter"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
          >
            <DemandLetterGenerator 
              letter={generateDemandLetter(MOCK_REPORT)}
              onBack={() => setCurrentScreen('report')} 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
