import React, { useState, useEffect } from 'react';
import { UserProgress, SoundSettings } from './types';
import { loadProgress, saveProgress, resetProgress } from './utils/storage';
import { updateSoundSettings, playCompleteSound, playBadgeSound, playSuccessSound } from './utils/audio';
import { MISSIONS } from './data/missionsData';

import { Navbar } from './components/Navbar';
import { WelcomeScreen } from './components/WelcomeScreen';
import { MissionsMap } from './components/MissionsMap';
import { Confetti } from './components/Confetti';
import { FloatingReward, RewardEvent } from './components/FloatingReward';
import { BookViewerModal } from './components/BookViewerModal';
import { MedalsModal } from './components/MedalsModal';
import { AdultsGuideModal } from './components/AdultsGuideModal';

import { Mission1VitalFunctions } from './components/missions/Mission1VitalFunctions';
import { Mission2Nutrition } from './components/missions/Mission2Nutrition';
import { Mission3TinaWorkshop } from './components/missions/Mission3TinaWorkshop';
import { Mission4Relation } from './components/missions/Mission4Relation';
import { Mission5Reproduction } from './components/missions/Mission5Reproduction';
import { Mission6HealthyHabits } from './components/missions/Mission6HealthyHabits';
import { Mission7KathrineSwitzer } from './components/missions/Mission7KathrineSwitzer';
import { Mission8FinalChallenge } from './components/missions/Mission8FinalChallenge';
import { UnitReviewView } from './components/UnitReviewView';
import { QuickBookSummaryView } from './components/QuickBookSummaryView';

export default function App() {
  const [progress, setProgress] = useState<UserProgress>(loadProgress);
  const [hasStarted, setHasStarted] = useState<boolean>(() => {
    return localStorage.getItem('ciencias_t1_started') === 'true';
  });

  const [activeView, setActiveView] = useState<string>('map');
  const [showConfetti, setShowConfetti] = useState(false);
  const [reward, setReward] = useState<RewardEvent | null>(null);

  // Modals
  const [isBookOpen, setIsBookOpen] = useState(false);
  const [isMedalsOpen, setIsMedalsOpen] = useState(false);
  const [isAdultsGuideOpen, setIsAdultsGuideOpen] = useState(false);

  // Sync settings with audio system on startup
  useEffect(() => {
    updateSoundSettings(progress.soundSettings);
  }, []);

  // Save progress changes
  const updateProgress = (updater: (prev: UserProgress) => UserProgress) => {
    setProgress((prev) => {
      const next = updater(prev);
      saveProgress(next);
      return next;
    });
  };

  const handleStart = (name: string, avatarId: string) => {
    updateProgress((prev) => ({
      ...prev,
      studentName: name || 'Científica',
      avatarId: avatarId || 'girl_scientist',
    }));
    setHasStarted(true);
    localStorage.setItem('ciencias_t1_started', 'true');
    setActiveView('map');
  };

  // Immediate rewards (+1 ⭐, +10 pts) for completing activities
  const handleAddReward = (stars = 1, pts = 10, message = '¡Punto Estrella!') => {
    playSuccessSound();
    setReward({
      id: Date.now(),
      stars,
      points: pts,
      message,
    });

    updateProgress((prev) => ({
      ...prev,
      totalStars: prev.totalStars + stars,
      points: (prev.points || 0) + pts,
    }));
  };

  const handleCompleteMission = (missionId: string) => {
    setShowConfetti(true);
    playCompleteSound();

    handleAddReward(3, 50, '¡Misión Superada! +3 ⭐');

    updateProgress((prev) => {
      const completed = prev.completedMissions.includes(missionId)
        ? prev.completedMissions
        : [...prev.completedMissions, missionId];
      const medals = prev.medalsEarned.includes(missionId)
        ? prev.medalsEarned
        : [...prev.medalsEarned, missionId];

      return {
        ...prev,
        completedMissions: completed,
        medalsEarned: medals,
      };
    });

    setTimeout(() => {
      setShowConfetti(false);
    }, 4000);
  };

  const handleReset = () => {
    const fresh = resetProgress();
    setProgress(fresh);
    setHasStarted(false);
    localStorage.removeItem('ciencias_t1_started');
    setActiveView('map');
  };

  const handleUpdateSound = (newSettings: SoundSettings) => {
    updateProgress((prev) => ({
      ...prev,
      soundSettings: newSettings,
    }));
  };

  const getAvatarEmoji = (avatarId: string) => {
    switch (avatarId) {
      case 'girl_athlete':
        return '🏃‍♀️';
      case 'girl_artist':
        return '🎨';
      case 'super_hero':
        return '🦸‍♀️';
      default:
        return '👩‍🔬';
    }
  };

  // Get current book pages
  const currentMission = MISSIONS.find((m) => m.id === activeView);
  const bookPagesToView = currentMission ? currentMission.bookPages : MISSIONS[0].bookPages;

  if (!hasStarted) {
    return (
      <WelcomeScreen
        onStart={handleStart}
        defaultName={progress.studentName}
        defaultAvatar={progress.avatarId}
      />
    );
  }

  return (
    <div className="game-canvas-bg min-h-screen flex flex-col text-slate-100 antialiased selection:bg-purple-500 selection:text-white">
      <Confetti active={showConfetti} />
      <FloatingReward reward={reward} onClear={() => setReward(null)} />

      <Navbar
        currentMissionId={activeView}
        onSelectMission={(id) => setActiveView(id)}
        earnedMedalIds={progress.medalsEarned}
        totalStars={progress.totalStars}
        points={progress.points || 0}
        studentName={progress.studentName}
        avatarEmoji={getAvatarEmoji(progress.avatarId)}
        soundSettings={progress.soundSettings}
        onUpdateSoundSettings={handleUpdateSound}
        onOpenMedals={() => setIsMedalsOpen(true)}
        onOpenBook={() => setIsBookOpen(true)}
        onOpenAdultsGuide={() => setIsAdultsGuideOpen(true)}
        onOpenReview={() => setActiveView('review')}
        onOpenQuickSummary={() => setActiveView('quick_summary')}
        onGoHome={() => setActiveView('map')}
      />

      <main className="flex-1 p-3 sm:p-6 pb-20">
        {activeView === 'map' && (
          <MissionsMap
            onSelectMission={(id) => setActiveView(id)}
            earnedMedalIds={progress.medalsEarned}
            studentName={progress.studentName}
            totalStars={progress.totalStars}
            points={progress.points || 0}
            onOpenReview={() => setActiveView('review')}
            onOpenQuickSummary={() => setActiveView('quick_summary')}
          />
        )}

        {activeView === 'quick_summary' && (
          <QuickBookSummaryView
            onBackToMap={() => setActiveView('map')}
            onAddReward={handleAddReward}
            studentName={progress.studentName}
          />
        )}

        {activeView === 'review' && (
          <UnitReviewView
            onBackToMap={() => setActiveView('map')}
            onAddReward={handleAddReward}
            studentName={progress.studentName}
          />
        )}

        {activeView === 'mission_1' && (
          <Mission1VitalFunctions
            onComplete={() => handleCompleteMission('mission_1')}
            onOpenBook={() => setIsBookOpen(true)}
          />
        )}

        {activeView === 'mission_2' && (
          <Mission2Nutrition
            onComplete={() => handleCompleteMission('mission_2')}
            onOpenBook={() => setIsBookOpen(true)}
          />
        )}

        {activeView === 'mission_3' && (
          <Mission3TinaWorkshop
            onComplete={() => handleCompleteMission('mission_3')}
            onOpenBook={() => setIsBookOpen(true)}
          />
        )}

        {activeView === 'mission_4' && (
          <Mission4Relation
            onComplete={() => handleCompleteMission('mission_4')}
            onOpenBook={() => setIsBookOpen(true)}
          />
        )}

        {activeView === 'mission_5' && (
          <Mission5Reproduction
            onComplete={() => handleCompleteMission('mission_5')}
            onOpenBook={() => setIsBookOpen(true)}
          />
        )}

        {activeView === 'mission_6' && (
          <Mission6HealthyHabits
            onComplete={() => handleCompleteMission('mission_6')}
            onOpenBook={() => setIsBookOpen(true)}
          />
        )}

        {activeView === 'mission_7' && (
          <Mission7KathrineSwitzer
            onComplete={() => handleCompleteMission('mission_7')}
            onOpenBook={() => setIsBookOpen(true)}
            onSaveDorsal={(dorsal) => {
              updateProgress((prev) => ({ ...prev, customDorsal: dorsal }));
            }}
          />
        )}

        {activeView === 'mission_8' && (
          <Mission8FinalChallenge
            onComplete={() => handleCompleteMission('mission_8')}
            onOpenBook={() => setIsBookOpen(true)}
            onOpenMedals={() => setIsMedalsOpen(true)}
            studentName={progress.studentName}
          />
        )}
      </main>

      {/* Persistent Modals */}
      <BookViewerModal
        isOpen={isBookOpen}
        onClose={() => setIsBookOpen(false)}
        pages={bookPagesToView}
      />

      <MedalsModal
        isOpen={isMedalsOpen}
        onClose={() => setIsMedalsOpen(false)}
        earnedMedalIds={progress.medalsEarned}
        studentName={progress.studentName}
        totalStars={progress.totalStars}
        points={progress.points || 0}
      />

      <AdultsGuideModal
        isOpen={isAdultsGuideOpen}
        onClose={() => setIsAdultsGuideOpen(false)}
        onResetProgress={handleReset}
      />
    </div>
  );
}
