import React from 'react';
import { VideoChapter } from '../../types/video';
import { CheckCircle2, Clock, PlayCircle, ShieldCheck, Tag } from 'lucide-react';

interface ChapterListProps {
  chapters: VideoChapter[];
  selectedChapterId: string;
  onSelectChapter: (chapterId: string) => void;
  completedChapterIds: string[];
}

export const ChapterList: React.FC<ChapterListProps> = ({
  chapters,
  selectedChapterId,
  onSelectChapter,
  completedChapterIds,
}) => {
  return (
    <div className="w-full bg-slate-900/90 rounded-2xl border border-cyan-500/20 p-4 shadow-xl backdrop-blur-md">
      <div className="flex items-center justify-between pb-3 border-b border-cyan-500/20 mb-3">
        <div>
          <h3 className="text-sm font-bold text-white font-display uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            Curriculum Navigator · 10 Modules
          </h3>
          <p className="text-[11px] text-slate-400 font-mono-tech mt-0.5">
            Complete USA Healthcare Provider Business Flow
          </p>
        </div>
        <div className="text-[11px] font-mono-tech px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/40">
          {completedChapterIds.length} / {chapters.length} Completed
        </div>
      </div>

      <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
        {chapters.map((ch) => {
          const isSelected = ch.id === selectedChapterId;
          const isCompleted = completedChapterIds.includes(ch.id);

          return (
            <button
              key={ch.id}
              onClick={() => onSelectChapter(ch.id)}
              className={`w-full text-left p-3 rounded-xl transition-all border flex items-start gap-3 group ${
                isSelected
                  ? 'bg-gradient-to-r from-cyan-950/80 to-slate-900 border-cyan-400 shadow-md shadow-cyan-950/50'
                  : 'bg-slate-950/60 hover:bg-slate-800/80 border-slate-800/80 text-slate-300'
              }`}
            >
              {/* Number Badge */}
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono-tech font-bold text-xs flex-shrink-0 transition-colors ${
                isSelected
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : isCompleted
                  ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/50'
                  : 'bg-slate-900 text-slate-400 border border-slate-800'
              }`}>
                {isCompleted ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <span>{ch.chapterNumber.toString().padStart(2, '0')}</span>
                )}
              </div>

              {/* Title & Metadata */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className={`text-xs md:text-sm font-semibold truncate ${
                    isSelected ? 'text-white' : 'text-slate-200 group-hover:text-cyan-300'
                  }`}>
                    {ch.title}
                  </h4>
                  <div className="flex items-center gap-1 text-[10px] font-mono-tech text-slate-400 ml-2 flex-shrink-0">
                    <Clock className="w-3 h-3 text-slate-500" />
                    <span>{Math.round(ch.durationSec / 60)}m {ch.durationSec % 60}s</span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-400 line-clamp-1 mt-1">
                  {ch.summary}
                </p>

                {/* Standards Tags */}
                <div className="flex flex-wrap items-center gap-1.5 mt-2">
                  {ch.ediStandards.map((std, i) => (
                    <span
                      key={i}
                      className="px-1.5 py-0.5 rounded text-[9px] font-mono-tech bg-slate-900 text-cyan-300 border border-cyan-500/30"
                    >
                      {std}
                    </span>
                  ))}
                  {ch.snipLevels.length > 0 && (
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-mono-tech bg-emerald-950/60 text-emerald-400 border border-emerald-500/30">
                      SNIP {ch.snipLevels.join(',')}
                    </span>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
