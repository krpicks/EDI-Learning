import React, { useState, useEffect, useRef } from 'react';
import { VideoChapter, VideoScene } from '../../types/video';
import { PresenterAvatar } from './PresenterAvatar';
import { SlideCanvas } from './SlideCanvas';
import { CaptionsOverlay } from './CaptionsOverlay';
import { speechService } from '../../services/speechService';
import { 
  Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Maximize2, 
  Subtitles, Gauge, Sparkles, Film, ArrowRight, Share2, Layers
} from 'lucide-react';

interface CinematicPlayerProps {
  currentChapter: VideoChapter;
  currentSceneIndex: number;
  onSceneChange: (sceneIndex: number) => void;
  onChapterChange: (chapterId: string) => void;
  onOpenFlowStudio?: () => void;
  allChapters: VideoChapter[];
}

export const CinematicPlayer: React.FC<CinematicPlayerProps> = ({
  currentChapter,
  currentSceneIndex,
  onSceneChange,
  onChapterChange,
  onOpenFlowStudio,
  allChapters,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const [showCaptions, setShowCaptions] = useState(true);
  const [currentSpokenWord, setCurrentSpokenWord] = useState<string>('');
  const [sceneProgress, setSceneProgress] = useState(0); // 0 to 100
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const progressTimerRef = useRef<any>(null);

  const scene: VideoScene = currentChapter.scenes[currentSceneIndex] || currentChapter.scenes[0];

  // Stop audio on unmount or scene change
  useEffect(() => {
    speechService.stop();
    setIsPlaying(false);
    setSceneProgress(0);
    setCurrentSpokenWord('');
  }, [currentChapter.id, currentSceneIndex]);

  // Handle Play/Pause
  const togglePlay = () => {
    if (isPlaying) {
      speechService.stop();
      setIsPlaying(false);
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    } else {
      startSceneNarration();
    }
  };

  const startSceneNarration = () => {
    setIsPlaying(true);
    setSceneProgress(0);

    const charCount = scene.narrationScript.length;
    const estimatedDurationMs = Math.max(8000, (charCount * 65) / playbackSpeed);
    const startTime = Date.now();

    if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    progressTimerRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, (elapsed / estimatedDurationMs) * 100);
      setSceneProgress(pct);
      if (pct >= 100) {
        clearInterval(progressTimerRef.current);
      }
    }, 100);

    if (isMuted) {
      // Simulating visual progress without audio
      setTimeout(() => {
        handleNextScene();
      }, estimatedDurationMs);
      return;
    }

    const isFemale = scene.presenter === 'elena' || scene.presenter === 'sarah';

    speechService.speak(scene.narrationScript, {
      rate: playbackSpeed,
      pitch: isFemale ? 1.05 : 0.95,
      voiceGender: isFemale ? 'female' : 'male',
      onWord: (_, word) => {
        setCurrentSpokenWord(word);
      },
      onEnd: () => {
        setIsPlaying(false);
        setSceneProgress(100);
        // Automatically progress to next scene or next chapter if available
        setTimeout(() => {
          handleNextScene();
        }, 1200);
      },
      onError: () => {
        setIsPlaying(false);
      },
    });
  };

  const handleNextScene = () => {
    if (currentSceneIndex < currentChapter.scenes.length - 1) {
      onSceneChange(currentSceneIndex + 1);
    } else {
      // Move to next chapter
      const currentChapterIdx = allChapters.findIndex(c => c.id === currentChapter.id);
      if (currentChapterIdx < allChapters.length - 1) {
        onChapterChange(allChapters[currentChapterIdx + 1].id);
        onSceneChange(0);
      }
    }
  };

  const handlePrevScene = () => {
    if (currentSceneIndex > 0) {
      onSceneChange(currentSceneIndex - 1);
    } else {
      const currentChapterIdx = allChapters.findIndex(c => c.id === currentChapter.id);
      if (currentChapterIdx > 0) {
        onChapterChange(allChapters[currentChapterIdx - 1].id);
        onSceneChange(0);
      }
    }
  };

  const toggleFullscreen = () => {
    if (!playerContainerRef.current) return;
    if (!document.fullscreenElement) {
      playerContainerRef.current.requestFullscreen().catch(err => console.log(err));
    } else {
      document.exitFullscreen().catch(err => console.log(err));
    }
  };

  return (
    <div 
      ref={playerContainerRef}
      className="relative w-full rounded-2xl overflow-hidden bg-slate-950 border border-cyan-500/30 shadow-2xl flex flex-col group select-none"
    >
      {/* TOP BROADCAST TELEMETRY BAR */}
      <div className="px-5 py-2.5 bg-slate-950/90 border-b border-cyan-500/20 flex items-center justify-between z-20 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
            <span className="text-xs font-bold font-mono-tech tracking-wider text-rose-300">
              {isPlaying ? 'PLAYING VIDEO' : 'PAUSED'}
            </span>
          </div>
          <span className="text-slate-600">|</span>
          <div className="text-xs font-mono-tech text-cyan-300">
            CHAPTER {currentChapter.chapterNumber}: {currentChapter.shortTitle}
          </div>
          <span className="text-slate-600 hidden sm:inline">|</span>
          <div className="text-xs font-mono-tech text-slate-400 hidden sm:inline">
            SCENE {currentSceneIndex + 1} OF {currentChapter.scenes.length}
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Quick Google Flow Prompt Button */}
          {onOpenFlowStudio && (
            <button
              onClick={onOpenFlowStudio}
              className="px-2.5 py-1 rounded bg-cyan-950 hover:bg-cyan-900 border border-cyan-500/40 text-[11px] font-mono-tech text-cyan-300 flex items-center gap-1.5 transition-all shadow-sm"
              title="Inspect or export Google Flow prompt for this scene"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Google Flow Prompt</span>
            </button>
          )}

          <div className="text-[11px] font-mono-tech text-slate-400 px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
            4K UHD · 60 FPS
          </div>
        </div>
      </div>

      {/* MAIN CINEMATIC STAGE (16:9 PROPORTION) */}
      <div className="relative w-full aspect-[16/9] min-h-[460px] bg-slate-950 overflow-hidden flex flex-col md:flex-row p-4 gap-4">
        
        {/* Left / Center: Interactive Slide Visuals */}
        <div className="relative flex-1 h-full rounded-xl overflow-hidden border border-cyan-500/20 shadow-inner">
          <SlideCanvas scene={scene} />
        </div>

        {/* Right / Corner: Presenter Avatar (Michael Anderson, Elena Vance, Dr. Jenkins) */}
        <div className="relative md:w-72 flex flex-col items-center justify-center">
          <PresenterAvatar
            presenterId={scene.presenter}
            pose={scene.pose}
            isSpeaking={isPlaying && !isMuted}
            currentWord={currentSpokenWord}
            size="normal"
          />

          {/* Presenter Speech Prompt Tooltip */}
          <div className="w-full mt-2 p-2 rounded-lg bg-slate-900/90 border border-cyan-500/20 text-center">
            <span className="text-[10px] font-mono-tech text-slate-400">
              VOICE SYNTHESIS · {scene.presenter.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Synchronized Closed Captions Overlay */}
        <CaptionsOverlay
          script={scene.narrationScript}
          currentSpokenWord={currentSpokenWord}
          isSpeaking={isPlaying}
          visible={showCaptions}
        />
      </div>

      {/* TIMELINE PROGRESS SCRUBBER */}
      <div className="relative w-full h-2 bg-slate-900 cursor-pointer group/progress">
        <div 
          className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-emerald-400 transition-all duration-150"
          style={{ width: `${sceneProgress}%` }}
        />
        {/* Hover scrub thumb */}
        <div 
          className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-cyan-300 rounded-full shadow-lg border-2 border-slate-950 opacity-0 group-hover/progress:opacity-100 transition-opacity"
          style={{ left: `${sceneProgress}%` }}
        />
      </div>

      {/* PLAYER CONTROLS FOOTER */}
      <div className="px-5 py-3.5 bg-slate-950 border-t border-cyan-500/20 flex flex-wrap items-center justify-between gap-4 z-20">
        
        {/* Left: Playback Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={handlePrevScene}
            className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-all"
            title="Previous Scene"
          >
            <SkipBack className="w-4 h-4" />
          </button>

          <button
            onClick={togglePlay}
            className="p-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold transition-all shadow-lg shadow-cyan-950/60 flex items-center justify-center"
            title={isPlaying ? 'Pause Video' : 'Play Video with Voice Narration'}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 fill-slate-950" />
            ) : (
              <Play className="w-5 h-5 fill-slate-950 ml-0.5" />
            )}
          </button>

          <button
            onClick={handleNextScene}
            className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-all"
            title="Next Scene"
          >
            <SkipForward className="w-4 h-4" />
          </button>

          {/* Audio Mute Toggle */}
          <button
            onClick={() => {
              setIsMuted(!isMuted);
              if (isPlaying && !isMuted) speechService.stop();
            }}
            className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-all ml-2"
            title={isMuted ? 'Unmute Voice' : 'Mute Voice'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
          </button>

          {/* Time Marker */}
          <div className="text-xs font-mono-tech text-slate-400 ml-2">
            Scene {currentSceneIndex + 1} / {currentChapter.scenes.length}
          </div>
        </div>

        {/* Center: Scene Quick Chips */}
        <div className="hidden lg:flex items-center gap-1.5 overflow-x-auto max-w-md py-1">
          {currentChapter.scenes.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => onSceneChange(idx)}
              className={`px-2.5 py-1 rounded text-[11px] font-mono-tech transition-all flex items-center gap-1.5 ${
                idx === currentSceneIndex
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-900/40'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-400 border border-slate-800'
              }`}
            >
              <span>{idx + 1}</span>
              <span className="truncate max-w-[100px]">{s.title.split(':')[0]}</span>
            </button>
          ))}
        </div>

        {/* Right: Settings, Speed, CC, Fullscreen */}
        <div className="flex items-center gap-3">
          {/* Playback Speed */}
          <div className="flex items-center bg-slate-900 rounded-lg border border-slate-800 p-0.5">
            {[0.75, 1.0, 1.25, 1.5].map(speed => (
              <button
                key={speed}
                onClick={() => setPlaybackSpeed(speed)}
                className={`px-2 py-0.5 rounded text-[10px] font-mono-tech transition-all ${
                  playbackSpeed === speed
                    ? 'bg-cyan-950 text-cyan-300 font-bold border border-cyan-500/40'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {speed}x
              </button>
            ))}
          </div>

          {/* Closed Captions Button */}
          <button
            onClick={() => setShowCaptions(!showCaptions)}
            className={`p-2 rounded-lg border transition-all ${
              showCaptions
                ? 'bg-cyan-950 border-cyan-500/50 text-cyan-300'
                : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300'
            }`}
            title="Toggle Closed Captions"
          >
            <Subtitles className="w-4 h-4" />
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-all"
            title="Toggle Fullscreen"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
