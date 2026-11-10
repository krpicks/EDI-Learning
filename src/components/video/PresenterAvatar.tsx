import React, { useEffect, useState } from 'react';
import { PresenterId, PresenterPose } from '../../types/video';
import { CHARACTERS } from '../../data/characters';

interface PresenterAvatarProps {
  presenterId: PresenterId;
  pose: PresenterPose;
  isSpeaking: boolean;
  currentWord?: string;
  size?: 'normal' | 'compact' | 'pip';
}

export const PresenterAvatar: React.FC<PresenterAvatarProps> = ({
  presenterId,
  pose,
  isSpeaking,
  currentWord,
  size = 'normal',
}) => {
  const character = CHARACTERS[presenterId] || CHARACTERS.michael;
  const [mouthOpen, setMouthOpen] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);

  // Sync mouth animation with speaking state
  useEffect(() => {
    if (!isSpeaking) {
      setMouthOpen(false);
      return;
    }
    const interval = setInterval(() => {
      setMouthOpen(prev => !prev);
    }, 140);
    return () => clearInterval(interval);
  }, [isSpeaking, currentWord]);

  // Natural blinking effect
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 160);
    }, 3800);
    return () => clearInterval(blinkInterval);
  }, []);

  const isMichael = presenterId === 'michael';
  const isElena = presenterId === 'elena';
  const isSarah = presenterId === 'sarah';
  const isDavid = presenterId === 'david';

  return (
    <div className={`relative flex flex-col items-center select-none ${size === 'pip' ? 'w-44' : size === 'compact' ? 'w-56' : 'w-72'}`}>
      {/* Ambient glow behind avatar */}
      <div className={`absolute -inset-2 rounded-2xl opacity-40 blur-xl ${
        isMichael ? 'bg-cyan-500/30' : isElena ? 'bg-emerald-500/30' : isSarah ? 'bg-teal-500/30' : 'bg-blue-600/30'
      }`} />

      {/* Main Avatar Graphic Container */}
      <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden border border-cyan-500/30 bg-gradient-to-b from-slate-900/90 to-slate-950/95 shadow-2xl backdrop-blur-md">
        
        {/* Subtle camera scanline overlay */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent" />
        <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(rgba(14,165,233,0.1)_1px,transparent_1px)] bg-[size:100%_4px]" />

        {/* Presenter Vector Canvas */}
        <svg viewBox="0 0 300 375" className="w-full h-full object-cover">
          <defs>
            <linearGradient id="skinGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f7d0b3" />
              <stop offset="100%" stopColor="#e3af8b" />
            </linearGradient>
            <linearGradient id="blazerNavy" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="50%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#090d16" />
            </linearGradient>
            <linearGradient id="shirtBlue" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#e0f2fe" />
              <stop offset="100%" stopColor="#bae6fd" />
            </linearGradient>
            <linearGradient id="techJumpsuit" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#475569" />
              <stop offset="100%" stopColor="#334155" />
            </linearGradient>
            <linearGradient id="labCoat" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f8fafc" />
              <stop offset="100%" stopColor="#e2e8f0" />
            </linearGradient>
            <linearGradient id="charcoalSuit" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#334155" />
              <stop offset="100%" stopColor="#1e293b" />
            </linearGradient>
            <filter id="shadowFilter">
              <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000" floodOpacity="0.4" />
            </filter>
          </defs>

          {/* BACKGROUND AMBIENT ILLUMINATION IN FRAME */}
          <rect width="300" height="375" fill="#030712" />
          <circle cx="150" cy="120" r="130" fill={isMichael ? '#0284c7' : isElena ? '#059669' : isSarah ? '#0d9488' : '#2563eb'} opacity="0.15" />
          
          {/* BODY / TORSO / CLOTHING */}
          {isMichael && (
            <g id="michaelBody">
              {/* Shoulders & Navy Tailored Blazer */}
              <path d="M 50 375 L 70 230 Q 150 200 230 230 L 250 375 Z" fill="url(#blazerNavy)" filter="url(#shadowFilter)" />
              {/* Crisp Sky Blue Shirt */}
              <path d="M 115 220 L 150 310 L 185 220 Q 150 240 115 220 Z" fill="url(#shirtBlue)" />
              {/* Open Collar Lapels */}
              <path d="M 110 215 L 142 270 L 125 285 L 85 235 Z" fill="#0f172a" />
              <path d="M 190 215 L 158 270 L 175 285 L 215 235 Z" fill="#0f172a" />
              {/* Lapel Edge Accents */}
              <path d="M 85 235 L 128 375" stroke="#334155" strokeWidth="2" fill="none" />
              <path d="M 215 235 L 172 375" stroke="#334155" strokeWidth="2" fill="none" />
              {/* Shirt Placket */}
              <line x1="150" y1="260" x2="150" y2="340" stroke="#93c5fd" strokeWidth="2" />
              <circle cx="150" cy="285" r="2" fill="#64748b" />
              <circle cx="150" cy="315" r="2" fill="#64748b" />
            </g>
          )}

          {isElena && (
            <g id="elenaBody">
              {/* Gray Tech Uniform */}
              <path d="M 55 375 L 75 235 Q 150 210 225 235 L 245 375 Z" fill="url(#techJumpsuit)" filter="url(#shadowFilter)" />
              {/* High Collar & Zipper */}
              <path d="M 125 210 L 150 260 L 175 210 Z" fill="#1e293b" />
              <line x1="150" y1="230" x2="150" y2="375" stroke="#06b6d4" strokeWidth="3" />
              {/* Security ID Badge & Diagnostic Lanyard */}
              <rect x="90" y="270" width="34" height="48" rx="3" fill="#0f172a" stroke="#06b6d4" strokeWidth="1.5" />
              <rect x="94" y="275" width="26" height="14" fill="#0ea5e9" />
              <line x1="94" y1="295" x2="118" y2="295" stroke="#94a3b8" strokeWidth="2" />
              <line x1="94" y1="302" x2="112" y2="302" stroke="#64748b" strokeWidth="1.5" />
              {/* Telecommunications Headset Wire */}
              <path d="M 185 140 Q 200 210 170 250" stroke="#0284c7" strokeWidth="2" fill="none" />
            </g>
          )}

          {isSarah && (
            <g id="sarahBody">
              {/* Dark Teal Scrubs */}
              <path d="M 95 215 L 150 290 L 205 215 Z" fill="#0f766e" />
              {/* White Minimalist Clinical Lab Coat */}
              <path d="M 45 375 L 75 230 Q 150 210 225 230 L 255 375 Z" fill="url(#labCoat)" filter="url(#shadowFilter)" />
              {/* Stethoscope */}
              <path d="M 110 220 Q 95 270 120 320 Q 150 350 175 320 Q 195 270 185 220" stroke="#334155" strokeWidth="4" fill="none" />
              <circle cx="150" cy="335" r="9" fill="#94a3b8" stroke="#cbd5e1" strokeWidth="2" />
            </g>
          )}

          {isDavid && (
            <g id="davidBody">
              {/* Charcoal Executive Suit */}
              <path d="M 50 375 L 70 230 Q 150 200 230 230 L 250 375 Z" fill="url(#charcoalSuit)" filter="url(#shadowFilter)" />
              {/* White Shirt & Silk Slate Tie */}
              <path d="M 115 215 L 150 290 L 185 215 Z" fill="#f8fafc" />
              {/* Tie */}
              <path d="M 143 235 L 157 235 L 155 350 L 150 365 L 145 350 Z" fill="#475569" stroke="#334155" />
            </g>
          )}

          {/* NECK */}
          <path d="M 130 180 L 130 235 Q 150 245 170 235 L 170 180 Z" fill="url(#skinGrad)" />
          {/* Subtle Neck Shadow */}
          <path d="M 130 190 Q 150 210 170 190 Z" fill="#d29672" opacity="0.6" />

          {/* HEAD & JAW */}
          <g id="headGroup">
            {/* Jaw / Face Shape */}
            <path d="M 105 130 Q 105 190 150 205 Q 195 190 195 130 Q 195 80 150 78 Q 105 80 105 130 Z" fill="url(#skinGrad)" filter="url(#shadowFilter)" />

            {/* Michael's Hair (Well-groomed modern executive haircut with slight salt-and-pepper) */}
            {isMichael && (
              <g id="michaelHair">
                <path d="M 100 120 Q 105 70 150 65 Q 195 70 200 120 Q 202 105 195 90 Q 185 62 150 60 Q 115 62 105 90 Q 98 105 100 120 Z" fill="#332b26" />
                {/* Hair Texture & Highlight */}
                <path d="M 115 85 Q 150 68 185 85" stroke="#4a3e36" strokeWidth="8" fill="none" strokeLinecap="round" />
                <path d="M 125 76 Q 150 70 175 76" stroke="#6b5b50" strokeWidth="4" fill="none" strokeLinecap="round" />
                {/* Sideburns */}
                <path d="M 103 115 L 105 142 L 110 142 L 108 115 Z" fill="#332b26" />
                <path d="M 197 115 L 195 142 L 190 142 L 192 115 Z" fill="#332b26" />
                {/* Subtle Executive 5 o'clock shadow stubble */}
                <path d="M 115 155 Q 150 198 185 155 Q 150 202 115 155 Z" fill="#9e7358" opacity="0.25" />
              </g>
            )}

            {/* Elena's Hair & Headset */}
            {isElena && (
              <g id="elenaHair">
                {/* Dark brown tied back hair */}
                <path d="M 100 130 Q 102 70 150 68 Q 198 70 200 130 Q 205 100 195 80 Q 180 62 150 62 Q 120 62 105 80 Q 95 100 100 130 Z" fill="#292019" />
                {/* Boom Headset */}
                <path d="M 102 110 Q 100 70 150 70 Q 200 70 198 110" stroke="#0284c7" strokeWidth="3" fill="none" />
                <rect x="94" y="125" width="10" height="24" rx="4" fill="#0f172a" stroke="#0284c7" strokeWidth="1.5" />
                <path d="M 98 140 Q 115 165 140 162" stroke="#0284c7" strokeWidth="2.5" fill="none" />
                <circle cx="142" cy="162" r="3.5" fill="#06b6d4" />
                {/* Safety Eye Protection */}
                <path d="M 112 120 Q 150 115 188 120 Q 192 138 185 142 Q 150 138 115 142 Q 108 138 112 120 Z" fill="rgba(6, 182, 212, 0.25)" stroke="#06b6d4" strokeWidth="1.5" />
              </g>
            )}

            {/* Sarah's Hair */}
            {isSarah && (
              <g id="sarahHair">
                <path d="M 98 135 Q 102 65 150 65 Q 198 65 202 135 Q 208 180 205 210 L 195 210 Q 194 150 195 120 Q 185 75 150 75 Q 115 75 105 120 Q 106 150 105 210 L 95 210 Q 92 180 98 135 Z" fill="#451a03" />
              </g>
            )}

            {/* David's Hair */}
            {isDavid && (
              <g id="davidHair">
                <path d="M 102 120 Q 106 68 150 68 Q 194 68 198 120 Q 198 90 185 74 Q 150 70 115 74 Q 102 90 102 120 Z" fill="#1e1b18" />
              </g>
            )}

            {/* EYEBROWS */}
            <path d="M 120 120 Q 132 114 142 118" stroke="#372c24" strokeWidth="3.2" strokeLinecap="round" fill="none" />
            <path d="M 158 118 Q 168 114 180 120" stroke="#372c24" strokeWidth="3.2" strokeLinecap="round" fill="none" />

            {/* EYES (WITH BLINKING STATE) */}
            {isBlinking ? (
              <g id="eyesClosed">
                <path d="M 122 132 Q 131 136 140 132" stroke="#372c24" strokeWidth="2.5" fill="none" />
                <path d="M 160 132 Q 169 136 178 132" stroke="#372c24" strokeWidth="2.5" fill="none" />
              </g>
            ) : (
              <g id="eyesOpen">
                {/* Left Eye */}
                <ellipse cx="131" cy="130" rx="9" ry="6" fill="#ffffff" />
                <ellipse cx="131" cy="130" rx="5" ry="5" fill="#3b2d20" />
                <circle cx="131" cy="130" r="2.5" fill="#050505" />
                <circle cx="133" cy="128" r="1.5" fill="#ffffff" />

                {/* Right Eye */}
                <ellipse cx="169" cy="130" rx="9" ry="6" fill="#ffffff" />
                <ellipse cx="169" cy="130" rx="5" ry="5" fill="#3b2d20" />
                <circle cx="169" cy="130" r="2.5" fill="#050505" />
                <circle cx="171" cy="128" r="1.5" fill="#ffffff" />

                {/* Eyelids */}
                <path d="M 122 128 Q 131 123 140 128" stroke="#452f1e" strokeWidth="1.5" fill="none" />
                <path d="M 160 128 Q 169 123 178 128" stroke="#452f1e" strokeWidth="1.5" fill="none" />
              </g>
            )}

            {/* NOSE */}
            <path d="M 150 128 L 148 152 Q 150 156 155 152" stroke="#c0825c" strokeWidth="2" fill="none" strokeLinecap="round" />
            <path d="M 143 152 Q 150 156 157 152" stroke="#b0734e" strokeWidth="1.5" fill="none" />

            {/* MOUTH & LIPSYNC */}
            {mouthOpen ? (
              <g id="mouthOpenState">
                {/* Open Mouth shape */}
                <path d="M 136 168 Q 150 165 164 168 Q 166 182 150 183 Q 134 182 136 168 Z" fill="#7f1d1d" />
                {/* Teeth */}
                <path d="M 140 169 Q 150 167 160 169 Q 158 173 142 173 Z" fill="#ffffff" />
                {/* Tongue */}
                <path d="M 144 181 Q 150 176 156 181 Z" fill="#b91c1c" />
                {/* Lips */}
                <path d="M 134 168 Q 150 164 166 168" stroke="#b45309" strokeWidth="1.8" fill="none" />
              </g>
            ) : (
              <g id="mouthClosedState">
                {/* Gentle smiling or focused closed mouth */}
                <path d="M 136 171 Q 150 175 164 171" stroke="#a16207" strokeWidth="2.2" strokeLinecap="round" fill="none" />
                <path d="M 138 172 Q 150 177 162 172" stroke="#92400e" strokeWidth="1" strokeLinecap="round" fill="none" />
              </g>
            )}
          </g>

          {/* ARMS & GESTURES ACCORDING TO POSE */}
          {pose.gesture === 'presenting_board' && (
            <g id="gesturePresenting">
              {/* Right arm extended pointing to the screen */}
              <path d="M 230 250 Q 275 220 295 190" stroke="#0f172a" strokeWidth="36" strokeLinecap="round" fill="none" />
              {/* Hand pointing */}
              <circle cx="295" cy="190" r="12" fill="url(#skinGrad)" />
              {/* Laser Pointer or Glow Emitter */}
              <circle cx="298" cy="186" r="3" fill="#38bdf8" />
              <line x1="298" y1="186" x2="330" y2="150" stroke="#0ea5e9" strokeWidth="2" strokeDasharray="3,3" opacity="0.8" />
            </g>
          )}

          {pose.gesture === 'pointing_alert' && (
            <g id="gestureAlert">
              {/* Hand raised with cautionary index finger */}
              <path d="M 225 260 Q 255 210 255 170" stroke="#0f172a" strokeWidth="32" strokeLinecap="round" fill="none" />
              <circle cx="255" cy="165" r="10" fill="url(#skinGrad)" />
              {/* Index finger pointing upward */}
              <line x1="255" y1="165" x2="255" y2="145" stroke="url(#skinGrad)" strokeWidth="6" strokeLinecap="round" />
            </g>
          )}

          {pose.gesture === 'holding_tablet' && (
            <g id="gestureTablet">
              {/* Holding High-Tech Diagnostic Console */}
              <rect x="70" y="290" width="160" height="90" rx="8" fill="#090d16" stroke="#06b6d4" strokeWidth="2.5" />
              <rect x="76" y="296" width="148" height="78" rx="4" fill="#020617" />
              {/* Glowing Mini Telemetry on Tablet */}
              <line x1="86" y1="310" x2="150" y2="310" stroke="#0ea5e9" strokeWidth="3" />
              <line x1="86" y1="322" x2="130" y2="322" stroke="#10b981" strokeWidth="2" />
              <line x1="86" y1="334" x2="180" y2="334" stroke="#64748b" strokeWidth="2" />
              <rect x="175" y="306" width="40" height="18" rx="2" fill="#065f46" />
              <text x="180" y="319" fill="#34d399" fontSize="9" fontWeight="bold" fontFamily="monospace">VALID</text>
              {/* Fingers holding tablet edge */}
              <ellipse cx="68" cy="335" rx="6" ry="14" fill="url(#skinGrad)" />
              <ellipse cx="232" cy="335" rx="6" ry="14" fill="url(#skinGrad)" />
            </g>
          )}

          {pose.gesture === 'hands_open' && (
            <g id="gestureHandsOpen">
              {/* Welcoming hands gestures */}
              <path d="M 70 255 Q 45 270 30 250" stroke="#0f172a" strokeWidth="30" strokeLinecap="round" fill="none" />
              <circle cx="30" cy="250" r="12" fill="url(#skinGrad)" />
              <path d="M 230 255 Q 255 270 270 250" stroke="#0f172a" strokeWidth="30" strokeLinecap="round" fill="none" />
              <circle cx="270" cy="250" r="12" fill="url(#skinGrad)" />
            </g>
          )}

          {/* LOWER BADGE GRAPHIC ON AVATAR (TV NEWS BROADCAST STYLE) */}
          <rect x="12" y="335" width="276" height="28" rx="6" fill="#020617" fillOpacity="0.85" stroke="#0284c7" strokeWidth="1" />
          <circle cx="26" cy="349" r="4" fill={isSpeaking ? '#10b981' : '#64748b'} className={isSpeaking ? 'animate-ping' : ''} />
          <circle cx="26" cy="349" r="4" fill={isSpeaking ? '#10b981' : '#64748b'} />
          <text x="36" y="353" fill="#f8fafc" fontSize="11" fontWeight="bold" fontFamily="sans-serif">
            {character.name.toUpperCase()}
          </text>
          <text x="280" y="353" textAnchor="end" fill="#38bdf8" fontSize="9" fontFamily="monospace">
            {isSpeaking ? 'LIVE AUDIO' : 'READY'}
          </text>
        </svg>

        {/* Live Audio Reactive Waveform Banner */}
        {isSpeaking && (
          <div className="absolute bottom-1.5 inset-x-4 flex items-center justify-center gap-1 py-0.5 bg-cyan-950/80 border border-cyan-500/40 rounded backdrop-blur-sm">
            {[4, 12, 18, 8, 22, 14, 20, 6, 16, 10, 24, 8].map((h, i) => (
              <span
                key={i}
                className="w-1 bg-cyan-400 rounded-full transition-all duration-100"
                style={{
                  height: `${Math.max(4, (h * (Math.sin(Date.now() / 150 + i) + 1.2)) / 2)}px`,
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Presenter Profile Badge */}
      <div className="w-full mt-2 text-center">
        <div className="text-xs font-semibold text-slate-200 tracking-wide font-display">
          {character.name}
        </div>
        <div className="text-[10px] text-cyan-400 font-mono-tech truncate px-2">
          {character.title}
        </div>
      </div>
    </div>
  );
};
