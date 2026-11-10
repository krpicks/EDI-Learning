import React from 'react';
import { CHARACTERS } from '../data/characters';
import { PresenterId } from '../types/video';
import { X, User, ShieldCheck, Sparkles, Volume2 } from 'lucide-react';

interface CharacterRosterModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCharacterId: PresenterId;
  onSelectCharacter: (id: PresenterId) => void;
}

export const CharacterRosterModal: React.FC<CharacterRosterModalProps> = ({
  isOpen,
  onClose,
  selectedCharacterId,
  onSelectCharacter,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="w-full max-w-4xl bg-slate-900 border border-cyan-500/30 rounded-2xl p-6 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <h3 className="text-lg font-bold text-white font-display flex items-center gap-2">
              <User className="w-5 h-5 text-cyan-400" />
              Healthcare EDI Academy · Cast & Character Dossiers
            </h3>
            <p className="text-xs text-slate-400 font-mono-tech mt-0.5">
              Characters engineered with consistent visual seeds for Google Flow and Veo
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Character Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.values(CHARACTERS).map((char) => {
            const isSelected = char.id === selectedCharacterId;
            return (
              <div
                key={char.id}
                className={`p-5 rounded-xl border transition-all space-y-3 ${
                  isSelected
                    ? 'bg-cyan-950/40 border-cyan-400 shadow-xl shadow-cyan-950/40'
                    : 'bg-slate-950/70 border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-base font-bold text-white font-display">{char.name}</h4>
                    <span className="text-xs text-cyan-400 font-mono-tech">{char.title}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800 text-[10px] font-mono-tech">
                    {char.age}
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  {char.bio}
                </p>

                <div className="p-3 rounded bg-slate-900 border border-slate-800 space-y-1 text-xs font-mono-tech">
                  <div className="text-slate-400">
                    <span className="text-cyan-300 font-semibold">Attire: </span>{char.clothing}
                  </div>
                  <div className="text-slate-400">
                    <span className="text-emerald-300 font-semibold">Visual Style: </span>{char.visualStyle}
                  </div>
                </div>

                <div className="p-2.5 rounded bg-slate-950 border border-cyan-500/20 text-[10px] font-mono-tech text-cyan-300 flex items-center justify-between">
                  <span>SEED: {char.googleFlowSeed}</span>
                  <button
                    onClick={() => onSelectCharacter(char.id)}
                    className={`px-3 py-1 rounded text-xs font-bold transition-all ${
                      isSelected
                        ? 'bg-cyan-500 text-slate-950'
                        : 'bg-slate-800 hover:bg-slate-700 text-white'
                    }`}
                  >
                    {isSelected ? 'Active Presenter' : 'Select'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
