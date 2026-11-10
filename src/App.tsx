import React, { useState } from 'react';
import { Header, AppTab } from './components/Header';
import { CinematicPlayer } from './components/video/CinematicPlayer';
import { ChapterList } from './components/video/ChapterList';
import { GoogleFlowStudio } from './components/studio/GoogleFlowStudio';
import { EdiTransactionLab } from './components/edi-lab/EdiTransactionLab';
import { StoryboardGrid } from './components/studio/StoryboardGrid';
import { CharacterRosterModal } from './components/CharacterRosterModal';
import { PROVIDER_FLOW_CURRICULUM } from './data/providerFlowCurriculum';
import { PresenterId, VideoChapter, VideoScene } from './types/video';
import { 
  Play, Users, Sparkles, BookOpen, ChevronRight, ShieldCheck, 
  HelpCircle, CheckCircle, ArrowRight
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<AppTab>('player');
  const [currentChapterId, setCurrentChapterId] = useState<string>('ch01');
  const [currentSceneIndex, setCurrentSceneIndex] = useState<number>(0);
  const [completedChapterIds, setCompletedChapterIds] = useState<string[]>(['ch01']);
  const [isCharacterModalOpen, setIsCharacterModalOpen] = useState(false);
  const [selectedPresenter, setSelectedPresenter] = useState<PresenterId>('michael');

  const currentChapter: VideoChapter = 
    PROVIDER_FLOW_CURRICULUM.find(c => c.id === currentChapterId) || PROVIDER_FLOW_CURRICULUM[0];
  
  const currentScene: VideoScene = currentChapter.scenes[currentSceneIndex] || currentChapter.scenes[0];

  const handleSelectChapter = (chapterId: string) => {
    setCurrentChapterId(chapterId);
    setCurrentSceneIndex(0);
    if (!completedChapterIds.includes(chapterId)) {
      setCompletedChapterIds(prev => [...prev, chapterId]);
    }
  };

  const handleSelectSceneFromStoryboard = (chapterId: string, sceneIndex: number) => {
    setCurrentChapterId(chapterId);
    setCurrentSceneIndex(sceneIndex);
    setActiveTab('player');
    if (!completedChapterIds.includes(chapterId)) {
      setCompletedChapterIds(prev => [...prev, chapterId]);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      
      {/* GLOBAL HEADER */}
      <Header
        activeTab={activeTab}
        onTabChange={setActiveTab}
        activePresenter={selectedPresenter}
      />

      {/* MAIN CONTAINER */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 lg:p-8 space-y-8">
        
        {/* SUB-HEADER UTILITY STRIP */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-slate-900/80 border border-cyan-500/20 text-xs font-mono-tech">
          <div className="flex items-center gap-2 text-slate-300">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span className="text-cyan-400 font-bold">COURSE:</span>
            <span>USA Healthcare Provider Complete Business Flow</span>
            <span className="text-slate-600">/</span>
            <span className="text-emerald-400">HIPAA 5010 & WEDI SNIP 1–7</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsCharacterModalOpen(true)}
              className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-500/30 flex items-center gap-1.5 transition-all"
            >
              <Users className="w-3.5 h-3.5" />
              <span>Presenter Roster</span>
            </button>

            <button
              onClick={() => setActiveTab('studio')}
              className="px-3 py-1 rounded-lg bg-cyan-950 hover:bg-cyan-900 text-cyan-400 border border-cyan-500/40 flex items-center gap-1.5 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Google Flow AI Agents</span>
            </button>
          </div>
        </div>

        {/* TAB 1: CINEMATIC VIDEO PLAYER EXPERIENCE */}
        {activeTab === 'player' && (
          <div className="space-y-8">
            {/* The 16:9 Cinematic Player */}
            <CinematicPlayer
              currentChapter={currentChapter}
              currentSceneIndex={currentSceneIndex}
              onSceneChange={setCurrentSceneIndex}
              onChapterChange={handleSelectChapter}
              allChapters={PROVIDER_FLOW_CURRICULUM}
              onOpenFlowStudio={() => setActiveTab('studio')}
            />

            {/* Split Section: Chapter Details & Curriculum Navigator */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Left 2 Cols: Deep Dive Takeaways & Scene Script */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* Active Chapter Overview Box */}
                <div className="p-6 rounded-2xl bg-slate-900/80 border border-cyan-500/20 shadow-xl space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div>
                      <span className="text-[10px] font-mono-tech text-cyan-400 font-bold uppercase tracking-wider">
                        CURRENT MODULE BREAKDOWN · CHAPTER {currentChapter.chapterNumber}
                      </span>
                      <h3 className="text-xl font-bold text-white font-display mt-0.5">
                        {currentChapter.title}
                      </h3>
                    </div>
                    <span className="px-2.5 py-1 rounded bg-slate-950 text-cyan-300 border border-cyan-500/30 text-xs font-mono-tech">
                      {currentChapter.category}
                    </span>
                  </div>

                  <p className="text-sm text-slate-300 leading-relaxed font-sans">
                    {currentChapter.summary}
                  </p>

                  {/* Key Takeaways */}
                  <div className="space-y-2 pt-2">
                    <span className="text-xs font-mono-tech text-cyan-400 font-bold block">
                      CORE BUSINESS & TECHNICAL TAKEAWAYS:
                    </span>
                    <div className="space-y-2">
                      {currentChapter.keyTakeaways.map((takeaway, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
                          <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                          <span>{takeaway}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Active Spoken Dialogue Transcript */}
                  <div className="p-4 rounded-xl bg-slate-950 border border-cyan-500/30 space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono-tech">
                      <span className="text-cyan-400 font-bold">
                        SPOKEN DIALOGUE ({currentScene.presenter.toUpperCase()} · SCENE {currentSceneIndex + 1}):
                      </span>
                      <span className="text-slate-500">Duration: ~{currentScene.durationSec}s</span>
                    </div>
                    <p className="text-sm text-slate-200 font-sans italic leading-relaxed">
                      "{currentScene.narrationScript}"
                    </p>
                  </div>
                </div>

                {/* Quick Action Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div 
                    onClick={() => setActiveTab('edi_lab')}
                    className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-cyan-400 cursor-pointer transition-all group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white font-display group-hover:text-cyan-300">
                        Launch EDI Transaction Lab
                      </span>
                      <ArrowRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-1 transition-transform" />
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                      Inspect and edit real 837P, 835, 820 payloads with segment-by-segment syntax checks.
                    </p>
                  </div>

                  <div 
                    onClick={() => setActiveTab('studio')}
                    className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-cyan-400 cursor-pointer transition-all group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white font-display group-hover:text-cyan-300">
                        Export Google Flow Prompts
                      </span>
                      <ArrowRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-1 transition-transform" />
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                      Generate new video scenes or copy 8K photoreal prompts for Google Flow & Veo.
                    </p>
                  </div>
                </div>

              </div>

              {/* Right Col: Chapter List Navigator */}
              <div className="lg:col-span-1">
                <ChapterList
                  chapters={PROVIDER_FLOW_CURRICULUM}
                  selectedChapterId={currentChapterId}
                  onSelectChapter={handleSelectChapter}
                  completedChapterIds={completedChapterIds}
                />
              </div>

            </div>
          </div>
        )}

        {/* TAB 2: GOOGLE FLOW STUDIO & AI AGENTS */}
        {activeTab === 'studio' && (
          <GoogleFlowStudio
            currentScene={currentScene}
            onPreviewSceneInPlayer={(sc) => {
              setActiveTab('player');
            }}
          />
        )}

        {/* TAB 3: EDI LAB & SYNTAX INSPECTOR */}
        {activeTab === 'edi_lab' && (
          <EdiTransactionLab />
        )}

        {/* TAB 4: STORYBOARD MATRIX */}
        {activeTab === 'storyboard' && (
          <StoryboardGrid
            chapters={PROVIDER_FLOW_CURRICULUM}
            onSelectScene={handleSelectSceneFromStoryboard}
          />
        )}

      </main>

      {/* CHARACTER DOSSIER MODAL */}
      <CharacterRosterModal
        isOpen={isCharacterModalOpen}
        onClose={() => setIsCharacterModalOpen(false)}
        selectedCharacterId={selectedPresenter}
        onSelectCharacter={(id) => {
          setSelectedPresenter(id);
          setIsCharacterModalOpen(false);
        }}
      />

      {/* GLOBAL FOOTER */}
      <footer className="w-full bg-slate-950 border-t border-cyan-500/20 py-6 px-4 md:px-8 text-center text-xs font-mono-tech text-slate-500 space-y-1 mt-12">
        <div className="text-slate-400 font-semibold">
          Healthcare EDI Academy · Complete Provider Business Flow Masterclass
        </div>
        <div>
          HIPAA 5010 Standards · WEDI SNIP Levels 1–7 · Google Flow & Veo Prompt Architecture
        </div>
      </footer>

    </div>
  );
}
