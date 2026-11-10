import React from 'react';
import { Film, Bot, Layers, FileCode, Activity, Sparkles, Volume2 } from 'lucide-react';

export type AppTab = 'player' | 'studio' | 'edi_lab' | 'storyboard';

interface HeaderProps {
  activeTab: AppTab;
  onTabChange: (tab: AppTab) => void;
  activePresenter: string;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onTabChange,
  activePresenter,
}) => {
  return (
    <header className="w-full bg-slate-950/90 border-b border-cyan-500/20 backdrop-blur-md sticky top-0 z-50 px-4 md:px-8 py-3.5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Brand Logo & Title */}
        <div className="flex items-center gap-3">
          {/* Logo matching user's uploaded US Healthcare EDI badge */}
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 via-blue-600 to-teal-400 p-0.5 shadow-lg shadow-cyan-950/60 flex items-center justify-center">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Activity className="w-5 h-5 text-cyan-400 animate-pulse" />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-base md:text-lg font-bold tracking-tight text-white font-display">
                HEALTHCARE EDI ACADEMY
              </span>
              <span className="text-[10px] font-mono-tech font-bold px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/40">
                PROD v2.4
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono-tech">
              USA Healthcare Complete Provider Business Flow & Video Production Studio
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center bg-slate-900/90 p-1 rounded-xl border border-cyan-500/30 overflow-x-auto max-w-full">
          {[
            { id: 'player', label: 'Cinematic Video Player', icon: Film },
            { id: 'studio', label: 'Google Flow Studio & Agents', icon: Bot },
            { id: 'edi_lab', label: 'EDI 837/835/820 Lab', icon: FileCode },
            { id: 'storyboard', label: 'Storyboard Grid', icon: Layers },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id as AppTab)}
                className={`px-3.5 py-2 rounded-lg text-xs font-mono-tech flex items-center gap-2 transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold shadow-md shadow-cyan-950/50'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Audio Engine & Presenter Status */}
        <div className="hidden xl:flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono-tech text-slate-300">
            <Volume2 className="w-4 h-4 text-emerald-400" />
            <span>VOICE: SYNTHESIZED</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono-tech text-cyan-300">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="uppercase">{activePresenter} ACTIVE</span>
          </div>
        </div>

      </div>
    </header>
  );
};
