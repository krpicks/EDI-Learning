import React from 'react';

interface CaptionsOverlayProps {
  script: string;
  currentSpokenWord?: string;
  isSpeaking: boolean;
  visible?: boolean;
}

export const CaptionsOverlay: React.FC<CaptionsOverlayProps> = ({
  script,
  currentSpokenWord,
  isSpeaking,
  visible = true,
}) => {
  if (!visible) return null;

  // Split script into words for dynamic highlight
  const words = script.split(' ');

  return (
    <div className="absolute bottom-16 inset-x-6 z-20 flex justify-center pointer-events-none">
      <div className="max-w-3xl px-6 py-3 rounded-xl bg-slate-950/90 border border-cyan-500/40 text-center shadow-2xl backdrop-blur-md">
        <div className="flex items-center justify-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-[10px] font-mono-tech uppercase text-cyan-300 font-bold tracking-wider">
            SYNCHRONIZED CLOSED CAPTIONS
          </span>
        </div>
        <p className="text-sm md:text-base font-medium text-slate-100 leading-relaxed font-sans">
          {words.map((w, idx) => {
            const cleanWord = w.replace(/[^\w]/g, '').toLowerCase();
            const cleanCurrent = currentSpokenWord?.replace(/[^\w]/g, '').toLowerCase();
            const isMatch = isSpeaking && cleanCurrent && cleanWord.includes(cleanCurrent);

            return (
              <span
                key={idx}
                className={`transition-colors duration-150 inline-block mr-1.5 ${
                  isMatch
                    ? 'text-cyan-300 font-bold underline decoration-cyan-400 decoration-2 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]'
                    : 'text-slate-200'
                }`}
              >
                {w}
              </span>
            );
          })}
        </p>
      </div>
    </div>
  );
};
