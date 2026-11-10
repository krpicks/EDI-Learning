import React, { useState } from 'react';
import { VideoChapter, VideoScene } from '../../types/video';
import { Film, Play, Eye, Camera, Clock, CheckCircle2 } from 'lucide-react';

interface StoryboardGridProps {
  chapters: VideoChapter[];
  onSelectScene: (chapterId: string, sceneIndex: number) => void;
}

export const StoryboardGrid: React.FC<StoryboardGridProps> = ({
  chapters,
  onSelectScene,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Fundamentals', 'Patient Journey', 'Claim Life Cycle', 'Validation', 'Payment & Reconciliation'];

  const filteredChapters = selectedCategory === 'All'
    ? chapters
    : chapters.filter(c => c.category === selectedCategory);

  return (
    <div className="w-full space-y-6">
      
      {/* Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-950 to-cyan-950/40 border border-cyan-500/30 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded bg-cyan-500 text-slate-950 font-mono-tech text-[10px] font-bold">
              STORYBOARD MATRIX
            </span>
            <span className="text-xs font-mono-tech text-cyan-300">
              CINEMATIC PRODUCTION GRID (MATCHES GOOGLE FLOW SPEC)
            </span>
          </div>
          <h2 className="text-2xl font-bold text-white font-display">
            Full Healthcare Provider Storyboard Suite
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Inspect all scene frames, camera setups, lighting parameters, and synchronized dialogue across the complete 10-chapter curriculum. Click any card to launch playback.
          </p>
        </div>

        {/* Filter Categories */}
        <div className="flex flex-wrap gap-1.5">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono-tech transition-all ${
                selectedCategory === cat
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-950/40'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-400 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Chapters & Scenes */}
      <div className="space-y-8">
        {filteredChapters.map(ch => (
          <div key={ch.id} className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-cyan-950 text-cyan-400 font-mono-tech font-bold text-xs flex items-center justify-center border border-cyan-500/40">
                  {ch.chapterNumber.toString().padStart(2, '0')}
                </span>
                <div>
                  <h3 className="text-base font-bold text-white font-display">
                    {ch.title}
                  </h3>
                  <div className="flex items-center gap-2 text-[11px] font-mono-tech text-slate-400 mt-0.5">
                    <span>{ch.category}</span>
                    <span>·</span>
                    <span>{ch.scenes.length} Production Scenes</span>
                    <span>·</span>
                    <span>Standards: {ch.ediStandards.join(', ')}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Scenes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {ch.scenes.map((scene, idx) => (
                <div
                  key={scene.id}
                  onClick={() => onSelectScene(ch.id, idx)}
                  className="group cursor-pointer p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-cyan-400 transition-all flex flex-col justify-between space-y-3 hover:shadow-xl hover:shadow-cyan-950/30"
                >
                  <div>
                    {/* Scene Tag */}
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono-tech text-cyan-400 font-bold">
                        FRAME {ch.chapterNumber}.{scene.sceneNumber} · {scene.presenter.toUpperCase()}
                      </span>
                      <div className="flex items-center gap-1 text-[10px] font-mono-tech text-slate-500">
                        <Clock className="w-3 h-3" />
                        <span>{scene.durationSec}s</span>
                      </div>
                    </div>

                    <h4 className="text-xs font-bold text-white font-display group-hover:text-cyan-300 transition-colors">
                      {scene.title}
                    </h4>

                    {/* Camera spec pill */}
                    <div className="flex items-center gap-1.5 text-[10px] font-mono-tech text-slate-400 mt-2 bg-slate-900 p-1.5 rounded border border-slate-800">
                      <Camera className="w-3 h-3 text-cyan-400" />
                      <span className="truncate">{scene.googleFlowPrompt.cameraMotion}</span>
                    </div>

                    {/* Script snippet */}
                    <p className="text-[11px] text-slate-300 line-clamp-3 mt-2 font-sans italic leading-relaxed">
                      "{scene.narrationScript}"
                    </p>
                  </div>

                  {/* Footer Action */}
                  <div className="pt-2 border-t border-slate-900 flex items-center justify-between text-[10px] font-mono-tech text-cyan-400">
                    <span>{scene.slideType.replace('_', ' ').toUpperCase()}</span>
                    <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      <Play className="w-3 h-3 fill-cyan-400" />
                      <span>Launch In Player</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
