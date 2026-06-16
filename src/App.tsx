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

const variants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

const transition = { type: 'tween', ease: 'easeInOut', duration: 0.3 } as const;

function App() {
  const [screen, setScreen] = useState<AppScreen>('landing');

  const go = (s: AppScreen) => setScreen(s);

  return (
    <>
      <Disclaimer />
      {/* Offset content below the fixed disclaimer bar */}
      <div className="pt-9">
        <AnimatePresence mode="wait">
          {screen === 'landing' && (
            <motion.div key="landing" variants={variants} initial="initial" animate="animate" exit="exit" transition={transition}>
              <LandingPage onGetStarted={() => go('upload')} />
            </motion.div>
          )}

          {screen === 'upload' && (
            <motion.div key="upload" variants={variants} initial="initial" animate="animate" exit="exit" transition={transition}>
              <LeaseUpload onUploadComplete={() => go('analysis')} />
            </motion.div>
          )}

          {screen === 'analysis' && (
            <motion.div key="analysis" variants={variants} initial="initial" animate="animate" exit="exit" transition={transition}>
              <AnalysisTimeline onComplete={() => go('wow')} />
            </motion.div>
          )}

          {screen === 'wow' && (
            <motion.div key="wow" variants={variants} initial="initial" animate="animate" exit="exit" transition={transition}>
              <WowMoment
                report={MOCK_REPORT}
                onContinue={() => go('report')}
                onHome={() => go('landing')}
              />
            </motion.div>
          )}

          {screen === 'report' && (
            <motion.div key="report" variants={variants} initial="initial" animate="animate" exit="exit" transition={transition}>
              <ViolationReport
                report={MOCK_REPORT}
                onViewLandlord={() => go('landlord')}
                onGenerateLetter={() => go('letter')}
                onViewImpact={() => go('wow')}
              />
            </motion.div>
          )}

          {screen === 'landlord' && (
            <motion.div key="landlord" variants={variants} initial="initial" animate="animate" exit="exit" transition={transition}>
              <LandlordPanel intel={MOCK_LANDLORD_INTEL} onBack={() => go('report')} />
            </motion.div>
          )}

          {screen === 'letter' && (
            <motion.div key="letter" variants={variants} initial="initial" animate="animate" exit="exit" transition={transition}>
              <DemandLetterGenerator letter={generateDemandLetter(MOCK_REPORT)} onBack={() => go('report')} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

export default App;
