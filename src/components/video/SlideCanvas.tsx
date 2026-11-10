import React, { useState } from 'react';
import { VideoScene, SlideLayoutType } from '../../types/video';
import { 
  CheckCircle, AlertTriangle, XCircle, ArrowRight, Server, ShieldCheck, 
  Building2, Activity, Database, FileText, DollarSign, Layers, Cpu, Radio
} from 'lucide-react';

interface SlideCanvasProps {
  scene: VideoScene;
  activeWordIndex?: number;
}

export const SlideCanvas: React.FC<SlideCanvasProps> = ({ scene }) => {
  const { slideType, slideTitle, slideSubtitle, slideData } = scene;
  const [interactiveErrorFix, setInteractiveErrorFix] = useState(false);

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 flex flex-col justify-between overflow-hidden select-none border border-cyan-500/20 rounded-2xl">
      
      {/* Background Grid & Cybernetic Accents */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#06b6d4_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* HEADER BAR (TV ACADEMY BROADCAST STYLE) */}
      <div className="relative z-10 flex items-start justify-between border-b border-cyan-500/20 pb-3 mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-[10px] tracking-widest font-mono-tech uppercase text-cyan-400 font-bold">
              HEALTHCARE EDI ACADEMY · SCENE {scene.sceneNumber}
            </span>
            <span className="text-slate-600">/</span>
            <span className="text-[10px] font-mono-tech text-slate-400">
              {scene.environment.replace('_', ' ').toUpperCase()}
            </span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white font-display">
            {slideTitle}
          </h2>
          {slideSubtitle && (
            <p className="text-xs text-slate-400 font-mono-tech mt-0.5">
              {slideSubtitle}
            </p>
          )}
        </div>

        {/* Tech Logo / Watermark Badge (matching user's uploaded logo) */}
        <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-cyan-500/30 backdrop-blur shadow-sm">
          <div className="relative w-7 h-7 flex items-center justify-center rounded bg-gradient-to-tr from-cyan-600 to-blue-500 text-white font-bold text-xs shadow-inner">
            <Activity className="w-4 h-4 text-white" />
          </div>
          <div className="text-left">
            <div className="text-[10px] font-bold text-cyan-300 leading-tight">US HEALTHCARE</div>
            <div className="text-[8px] font-mono-tech text-slate-400">EDI X12 ENGINE</div>
          </div>
        </div>
      </div>

      {/* SLIDE CONTENT AREA (BY LAYOUT TYPE) */}
      <div className="relative z-10 flex-1 flex flex-col justify-center my-2">
        
        {/* LAYOUT: DIAGRAM FLOW (Healthcare Provider -> Clearinghouse -> Payer) */}
        {slideType === 'diagram_flow' && (
          <div className="w-full flex flex-col items-center justify-center space-y-6">
            {/* The 3 Core Entities from user video */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
              
              {/* Provider Node */}
              <div className="group relative p-4 rounded-xl bg-slate-900/80 border-2 border-cyan-500/40 hover:border-cyan-400 shadow-xl transition-all">
                <div className="absolute -top-3 left-4 px-2 py-0.5 rounded bg-cyan-950 border border-cyan-500/40 text-[10px] font-mono-tech text-cyan-300">
                  ORIGINATOR
                </div>
                <div className="flex items-center gap-3 mt-1">
                  <div className="w-12 h-12 rounded-lg bg-cyan-950/80 border border-cyan-500/50 flex items-center justify-center text-cyan-400">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white font-display">Healthcare Provider</h4>
                    <p className="text-[11px] text-slate-400">Hospitals, Clinics, Physicians</p>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-slate-800 text-[11px] font-mono-tech text-cyan-200/80 space-y-1">
                  <div className="flex items-center justify-between">
                    <span>EHR / Practice Mgmt</span>
                    <span className="text-cyan-400">NPI 1982736450</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-400">
                    <span>Transmits:</span>
                    <span className="text-emerald-400 font-semibold">EDI 837P / 837I</span>
                  </div>
                </div>
              </div>

              {/* Clearinghouse Gateway Node */}
              <div className="group relative p-4 rounded-xl bg-slate-900/80 border-2 border-cyan-400 shadow-xl shadow-cyan-950/50 transition-all">
                <div className="absolute -top-3 left-4 px-2 py-0.5 rounded bg-cyan-500 text-slate-950 text-[10px] font-mono-tech font-bold">
                  VALIDATION & ROUTING
                </div>
                <div className="flex items-center gap-3 mt-1">
                  <div className="w-12 h-12 rounded-lg bg-cyan-900/60 border border-cyan-400 flex items-center justify-center text-cyan-300">
                    <Server className="w-6 h-6 animate-pulse" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white font-display">Clearinghouse Hub</h4>
                    <p className="text-[11px] text-cyan-300">National EDI Gateway</p>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-slate-800 text-[11px] font-mono-tech space-y-1">
                  <div className="flex items-center justify-between text-slate-300">
                    <span>HIPAA SNIP 1–7</span>
                    <span className="text-emerald-400 font-bold">ACTIVE SCRUB</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-400">
                    <span>Returns Ack:</span>
                    <span className="text-cyan-400">999 / 277CA</span>
                  </div>
                </div>
              </div>

              {/* Insurance Payer Node */}
              <div className="group relative p-4 rounded-xl bg-slate-900/80 border-2 border-cyan-500/40 hover:border-cyan-400 shadow-xl transition-all">
                <div className="absolute -top-3 left-4 px-2 py-0.5 rounded bg-blue-950 border border-blue-500/40 text-[10px] font-mono-tech text-blue-300">
                  SETTLEMENT & ADJUDICATION
                </div>
                <div className="flex items-center gap-3 mt-1">
                  <div className="w-12 h-12 rounded-lg bg-blue-950/80 border border-blue-500/50 flex items-center justify-center text-blue-400">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white font-display">Insurance Payer</h4>
                    <p className="text-[11px] text-slate-400">Commercial, Medicare & Medicaid</p>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-slate-800 text-[11px] font-mono-tech text-cyan-200/80 space-y-1">
                  <div className="flex items-center justify-between">
                    <span>Rules Engine</span>
                    <span className="text-blue-400">CARC / RARC</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-400">
                    <span>Dispatches:</span>
                    <span className="text-emerald-400 font-semibold">EDI 835 / ACH EFT</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Live Animated Flow Connectors */}
            <div className="w-full max-w-4xl p-3 rounded-xl bg-slate-950/80 border border-cyan-500/30 flex items-center justify-around text-xs font-mono-tech">
              <div className="flex items-center gap-2 text-cyan-400">
                <span className="px-2 py-0.5 rounded bg-cyan-950 border border-cyan-500/40 font-bold">EDI 837 Claims</span>
                <ArrowRight className="w-4 h-4 animate-bounce" />
              </div>
              <div className="h-4 w-px bg-slate-700" />
              <div className="flex items-center gap-2 text-emerald-400">
                <span className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-500/40 font-bold">SNIP Scrubbing</span>
                <CheckCircle className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="h-4 w-px bg-slate-700" />
              <div className="flex items-center gap-2 text-blue-400">
                <ArrowRight className="w-4 h-4 animate-bounce" />
                <span className="px-2 py-0.5 rounded bg-blue-950 border border-blue-500/40 font-bold">EDI 835 & 820 Remittance</span>
              </div>
            </div>
          </div>
        )}

        {/* LAYOUT: MATRIX COMPARISON (Paper vs Electronic EDI) */}
        {slideType === 'matrix_comparison' && (
          <div className="w-full max-w-4xl mx-auto space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Traditional Paper Card */}
              <div className="p-5 rounded-xl bg-slate-900/80 border border-rose-500/30 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-rose-500/20">
                  <h4 className="text-sm font-bold text-rose-300 font-display">
                    {slideData.leftTitle || 'Legacy Paper Workflow'}
                  </h4>
                  <span className="text-[10px] font-mono-tech px-2 py-0.5 rounded bg-rose-950 text-rose-400 border border-rose-500/40">
                    INEFFICIENT
                  </span>
                </div>
                <div className="space-y-2">
                  {(slideData.leftItems || []).map((item: string, i: number) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-300 font-mono-tech">
                      <XCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modern Electronic EDI Card */}
              <div className="p-5 rounded-xl bg-cyan-950/40 border-2 border-cyan-400 space-y-3 shadow-xl shadow-cyan-950/50">
                <div className="flex items-center justify-between pb-2 border-b border-cyan-500/30">
                  <h4 className="text-sm font-bold text-cyan-200 font-display">
                    {slideData.rightTitle || 'Modern EDI X12 Pipeline'}
                  </h4>
                  <span className="text-[10px] font-mono-tech px-2 py-0.5 rounded bg-cyan-500 text-slate-950 font-bold">
                    AUTOMATED
                  </span>
                </div>
                <div className="space-y-2">
                  {(slideData.rightItems || []).map((item: string, i: number) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-200 font-mono-tech">
                      <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-950 border border-cyan-500/30 flex items-center justify-between text-xs font-mono-tech">
              <span className="text-slate-400">FINANCIAL BENEFIT:</span>
              <span className="text-cyan-300 font-semibold">Average Savings: $8.12 per Transaction Saved</span>
              <span className="text-emerald-400 font-bold">CAQH INDEX VERIFIED</span>
            </div>
          </div>
        )}

        {/* LAYOUT: CONTROL NUMBER VALIDATOR (ST02 = SE02 & Ohio Medicaid / ODM) */}
        {slideType === 'control_number_validator' && (
          <div className="w-full max-w-4xl mx-auto space-y-4">
            
            {/* Simulation Control Switcher */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-900 border border-cyan-500/30">
              <div className="flex items-center gap-3">
                <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
                <span className="text-xs font-mono-tech text-slate-200">
                  Interactive Simulation: Toggle ODM Control Number Mismatch
                </span>
              </div>
              <button
                onClick={() => setInteractiveErrorFix(!interactiveErrorFix)}
                className={`px-3 py-1 rounded text-xs font-mono-tech font-bold transition-all ${
                  interactiveErrorFix 
                    ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-900/40' 
                    : 'bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-900/40'
                }`}
              >
                {interactiveErrorFix ? 'STATUS: RESOLVED (PASS)' : 'SIMULATE: ERROR (MISMATCH)'}
              </button>
            </div>

            {/* Error or Pass Alert Banner (matching user video) */}
            {!interactiveErrorFix ? (
              <div className="p-4 rounded-xl bg-gradient-to-r from-rose-950/90 via-red-900/80 to-rose-950/90 border-2 border-rose-500 text-white shadow-2xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <XCircle className="w-8 h-8 text-rose-400 flex-shrink-0 animate-pulse" />
                  <div>
                    <h3 className="text-sm font-bold tracking-wide text-rose-100 font-mono-tech">
                      ERROR: ODM-STRUCTURE - TRANSACTION CONTROL NUMBER MISMATCH
                    </h3>
                    <p className="text-xs text-rose-200 mt-0.5">
                      Functional ST02 (000123) does not match Functional SE02 (000124). Transaction rejected.
                    </p>
                  </div>
                </div>
                <span className="text-xs font-mono-tech px-2 py-1 bg-rose-900/80 rounded border border-rose-400 font-bold">
                  FAIL
                </span>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/90 via-emerald-900/80 to-emerald-950/90 border-2 border-emerald-400 text-white shadow-2xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-8 h-8 text-emerald-400 flex-shrink-0" />
                  <div>
                    <h3 className="text-sm font-bold tracking-wide text-emerald-100 font-mono-tech">
                      ST02 = SE02 VALIDATED: TRANSACTION CONTROL NUMBER MATCH
                    </h3>
                    <p className="text-xs text-emerald-200 mt-0.5">
                      Both headers equal 000123. Structural rule passed with 100% envelope compliance.
                    </p>
                  </div>
                </div>
                <span className="text-xs font-mono-tech px-2 py-1 bg-emerald-900/80 rounded border border-emerald-400 font-bold">
                  PASS
                </span>
              </div>
            )}

            {/* Segment Comparison Visualizer */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* ST Segment */}
              <div className="p-4 rounded-xl bg-slate-900/90 border border-cyan-500/40">
                <div className="flex items-center justify-between text-xs font-mono-tech text-cyan-400 mb-2">
                  <span className="font-bold">ST SEGMENT (TRANSACTION SET HEADER)</span>
                  <span className="text-slate-400">Position: Beginning</span>
                </div>
                <div className="p-3 rounded bg-slate-950 font-mono-tech text-sm text-cyan-300 border border-slate-800 flex items-center justify-between">
                  <span>ST*820*000123~</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-500/40">
                    ST02 = 000123
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-2">
                  Identifies unique transaction control identifier assigned by sender application.
                </p>
              </div>

              {/* SE Segment */}
              <div className="p-4 rounded-xl bg-slate-900/90 border border-cyan-500/40">
                <div className="flex items-center justify-between text-xs font-mono-tech text-cyan-400 mb-2">
                  <span className="font-bold">SE SEGMENT (TRANSACTION SET TRAILER)</span>
                  <span className="text-slate-400">Position: Concluding</span>
                </div>
                <div className={`p-3 rounded bg-slate-950 font-mono-tech text-sm border flex items-center justify-between ${
                  !interactiveErrorFix 
                    ? 'text-rose-400 border-rose-500/50 bg-rose-950/20' 
                    : 'text-emerald-400 border-emerald-500/50 bg-emerald-950/20'
                }`}>
                  <span>SE*12*{interactiveErrorFix ? '000123' : '000124'}~</span>
                  <span className={`text-xs px-2 py-0.5 rounded border ${
                    !interactiveErrorFix 
                      ? 'bg-rose-950 text-rose-300 border-rose-500/40' 
                      : 'bg-emerald-950 text-emerald-300 border-emerald-500/40'
                  }`}>
                    SE02 = {interactiveErrorFix ? '000123' : '000124'}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-2">
                  {interactiveErrorFix 
                    ? 'Correct: SE02 perfectly matches ST02 (000123).' 
                    : 'Fatal Error: SE02 (000124) contradicts ST02 (000123).'}
                </p>
              </div>
            </div>

            {/* Governance Callout (Ohio Medicaid ODM) */}
            <div className="p-3 rounded-lg bg-slate-950/90 border border-slate-800 flex items-center justify-between text-xs font-mono-tech">
              <span className="text-slate-400">GOVERNANCE RULE:</span>
              <span className="text-cyan-300">ODM Companion Guide 820 Section 6 Structural Integrity</span>
              <span className="text-emerald-400 font-semibold">AUTOMATED PARSER ACTIVE</span>
            </div>
          </div>
        )}

        {/* LAYOUT: EDI ENVELOPE STACK (Nested Loops: ISA -> GS -> ST -> BPR/CLM -> SE -> GE -> IEA) */}
        {slideType === 'edi_envelope_stack' && (
          <div className="w-full max-w-4xl mx-auto space-y-3">
            <div className="text-xs text-cyan-300 font-mono-tech flex items-center justify-between mb-1">
              <span>X12 HIERARCHICAL ENVELOPE NESTING</span>
              <span>STANDARDS: ANSI ASC X12 / HIPAA 5010</span>
            </div>

            <div className="space-y-1.5 font-mono-tech text-xs">
              {/* ISA Layer */}
              <div className="p-2 rounded bg-slate-900 border border-cyan-500/30 flex items-center justify-between text-slate-300">
                <span className="text-cyan-400 font-bold">ISA · Interchange Control Header</span>
                <span className="text-slate-400">ISA13 Interchange Control # (000000123)</span>
              </div>

              {/* GS Layer (Indented) */}
              <div className="ml-4 p-2 rounded bg-slate-900/90 border border-cyan-500/40 flex items-center justify-between text-slate-300">
                <span className="text-cyan-300 font-bold">↳ GS · Functional Group Header</span>
                <span className="text-slate-400">GS06 Group Control # (123)</span>
              </div>

              {/* ST Layer (Further Indented) */}
              <div className="ml-8 p-2.5 rounded bg-cyan-950/40 border border-cyan-400 flex items-center justify-between text-white shadow-md">
                <span className="text-cyan-200 font-bold">↳ ↳ ST · Transaction Set Header</span>
                <span className="text-emerald-400 font-semibold">ST02 Control # (000123)</span>
              </div>

              {/* Business Data Core (Deepest Indent) */}
              <div className="ml-12 p-3 rounded-lg bg-gradient-to-r from-slate-900 to-slate-950 border border-emerald-500/40 space-y-2">
                <div className="text-[11px] text-emerald-400 font-bold flex items-center justify-between">
                  <span>↳ ↳ ↳ BUSINESS TRANSACTION LOOPS</span>
                  <span>MANDATORY HIPAA LOOPS</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px]">
                  <div className="p-2 bg-slate-950 rounded border border-slate-800">
                    <span className="text-cyan-300 font-semibold">Header Segments:</span>
                    <div className="text-slate-300 mt-1">BPR (Payment Order) / BHT (Hierarchical)</div>
                    <div className="text-slate-400">N1 Names (Payer, Payee, Provider)</div>
                  </div>
                  <div className="p-2 bg-slate-950 rounded border border-slate-800">
                    <span className="text-emerald-300 font-semibold">Detail Segments:</span>
                    <div className="text-slate-300 mt-1">CLM (Claim) / RMR (Remittance Line)</div>
                    <div className="text-slate-400">SV1 (CPT Procedure) / CAS (CARC Adjustments)</div>
                  </div>
                </div>
              </div>

              {/* SE Trailer */}
              <div className="ml-8 p-2.5 rounded bg-cyan-950/40 border border-cyan-400 flex items-center justify-between text-white">
                <span className="text-cyan-200 font-bold">↳ ↳ SE · Transaction Set Trailer</span>
                <span className="text-emerald-400 font-semibold">SE02 Must Match ST02</span>
              </div>

              {/* GE Trailer */}
              <div className="ml-4 p-2 rounded bg-slate-900/90 border border-cyan-500/40 flex items-center justify-between text-slate-300">
                <span className="text-cyan-300 font-bold">↳ GE · Functional Group Trailer</span>
                <span className="text-slate-400">GE02 Must Match GS06</span>
              </div>

              {/* IEA Trailer */}
              <div className="p-2 rounded bg-slate-900 border border-cyan-500/30 flex items-center justify-between text-slate-300">
                <span className="text-cyan-400 font-bold">IEA · Interchange Control Trailer</span>
                <span className="text-slate-400">IEA02 Must Match ISA13</span>
              </div>
            </div>
          </div>
        )}

        {/* LAYOUT: SNIP VALIDATION ENGINE (7 Tiers of WEDI SNIP) */}
        {slideType === 'snip_validation_engine' && (
          <div className="w-full max-w-4xl mx-auto space-y-2">
            <div className="grid grid-cols-1 md:grid-cols-7 gap-2">
              {[
                { lvl: '1', title: 'Syntax & Integrity', color: 'border-cyan-500 text-cyan-400', desc: 'Valid delimiters & envelopes' },
                { lvl: '2', title: 'HIPAA IG Rules', color: 'border-cyan-400 text-cyan-300', desc: 'Field lengths & mandatory data' },
                { lvl: '3', title: 'Balancing Math', color: 'border-teal-400 text-teal-300', desc: 'Line items sum to claim total' },
                { lvl: '4', title: 'Inter-Segment', color: 'border-emerald-400 text-emerald-300', desc: 'Situational dependencies' },
                { lvl: '5', title: 'External Codes', color: 'border-green-400 text-green-300', desc: 'Active ICD-10 & CPT-4' },
                { lvl: '6', title: 'Specialty Rules', color: 'border-amber-400 text-amber-300', desc: 'Chiropractic, Ambulance, etc.' },
                { lvl: '7', title: 'Trading Partner', color: 'border-blue-400 text-blue-300', desc: 'State Medicaid (ODM) rules' },
              ].map(snip => (
                <div key={snip.lvl} className={`p-3 rounded-xl bg-slate-900/90 border-2 ${snip.color} flex flex-col justify-between shadow-lg`}>
                  <div>
                    <span className="text-xs font-mono-tech font-bold px-1.5 py-0.5 rounded bg-slate-950 border border-slate-800">
                      SNIP {snip.lvl}
                    </span>
                    <h5 className="text-xs font-bold font-display mt-2 leading-tight">
                      {snip.title}
                    </h5>
                  </div>
                  <p className="text-[10px] text-slate-400 font-mono-tech mt-2 leading-normal">
                    {snip.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-4 p-3 rounded-xl bg-slate-900 border border-cyan-500/30 flex items-center justify-between text-xs font-mono-tech text-slate-300">
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                Zero-Tolerance Scrubbing: Any failure at Levels 1–7 blocks payer submission
              </span>
              <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-500/40 font-bold">
                WEDI COMPLIANT
              </span>
            </div>
          </div>
        )}

        {/* LAYOUT: EDI 820 VS 835 VS 834 COMPARISON */}
        {slideType === 'edi_820_835_comparison' && (
          <div className="w-full max-w-4xl mx-auto space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* Card 1: 834 Enrollment */}
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-700">
                <div className="text-xs font-mono-tech text-cyan-400 font-bold">EDI 834</div>
                <h4 className="text-base font-bold text-white font-display mt-1">Benefit Enrollment</h4>
                <p className="text-xs text-slate-400 mt-1 mb-3">Employer / Exchange ➔ Payer</p>
                <ul className="text-xs text-slate-300 space-y-1.5 font-mono-tech">
                  <li>• Member adds, changes, terms</li>
                  <li>• Dependent eligibility</li>
                  <li>• Zero monetary exchange</li>
                </ul>
              </div>

              {/* Card 2: 820 Premium Payment */}
              <div className="p-4 rounded-xl bg-cyan-950/40 border-2 border-cyan-400 shadow-xl shadow-cyan-950/40">
                <div className="flex items-center justify-between text-xs font-mono-tech text-cyan-300 font-bold">
                  <span>EDI 820</span>
                  <span className="px-2 py-0.5 rounded bg-cyan-500 text-slate-950 font-bold text-[10px]">PAYMENT ORDER</span>
                </div>
                <h4 className="text-base font-bold text-white font-display mt-1">Premium Remittance</h4>
                <p className="text-xs text-cyan-200 mt-1 mb-3">Employer / State Medicaid ➔ Plan / IPA</p>
                <ul className="text-xs text-slate-200 space-y-1.5 font-mono-tech">
                  <li>• BPR Payment Header (ACH EFT)</li>
                  <li>• RMR Invoiced Premium Lines</li>
                  <li>• ST02 must match SE02 control #</li>
                </ul>
              </div>

              {/* Card 3: 835 Claim Remittance */}
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-700">
                <div className="text-xs font-mono-tech text-blue-400 font-bold">EDI 835</div>
                <h4 className="text-base font-bold text-white font-display mt-1">Claim ERA & Advice</h4>
                <p className="text-xs text-slate-400 mt-1 mb-3">Payer ➔ Healthcare Provider</p>
                <ul className="text-xs text-slate-300 space-y-1.5 font-mono-tech">
                  <li>• CLP Claim Adjudication Status</li>
                  <li>• CAS Adjustment (CO-45, PR-1)</li>
                  <li>• TRN Reassociation with Bank EFT</li>
                </ul>
              </div>
            </div>

            {/* Reconciliation Callout */}
            <div className="p-3 rounded-lg bg-slate-950 border border-cyan-500/30 flex items-center justify-between text-xs font-mono-tech">
              <span className="text-slate-400">FINANCIAL MOVEMENT:</span>
              <span className="text-emerald-400 font-bold">ACH / EFT Transfers Money · EDI Conveys Business Reason</span>
              <span className="text-cyan-400">NACHA CTX / CCD+</span>
            </div>
          </div>
        )}

        {/* LAYOUT: SERVER RACK DIAGNOSTICS (Elena Vance's Data Center) */}
        {slideType === 'server_rack_diagnostics' && (
          <div className="w-full max-w-4xl mx-auto space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {['GS02', 'GS03', 'GS04', 'GS05', 'GS06'].map((rack, i) => (
                <div key={rack} className="p-3 rounded-xl bg-slate-900 border border-cyan-500/40 text-center space-y-2">
                  <div className="text-xs font-mono-tech text-cyan-400 font-bold">{rack}</div>
                  <div className="h-20 bg-slate-950 rounded flex flex-col justify-around p-1.5 border border-slate-800">
                    {[1, 2, 3, 4].map(slot => (
                      <div key={slot} className="flex items-center justify-between px-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                        <span className="text-[9px] font-mono-tech text-slate-500">BLADE {slot}</span>
                      </div>
                    ))}
                  </div>
                  <div className="text-[10px] font-mono-tech text-emerald-400 font-semibold">100% ONLINE</div>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-slate-900/90 border border-cyan-500/30 flex items-center justify-between font-mono-tech text-xs">
              <div>
                <span className="text-slate-400">VALIDATION ENGINE:</span>
                <span className="text-cyan-300 ml-2 font-bold">GE02 FUNCTIONAL GROUP VERIFIED</span>
              </div>
              <div className="text-emerald-400 font-bold flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                TRANSLATION LATENCY: 0.8 MS
              </div>
            </div>
          </div>
        )}

        {/* LAYOUT: HOSPITAL ENCOUNTER JOURNEY (Dr. Sarah Jenkins' Clinical Pod) */}
        {slideType === 'hospital_encounter_journey' && (
          <div className="w-full max-w-4xl mx-auto space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-900 border border-cyan-500/30 space-y-2">
                <div className="text-xs font-mono-tech text-cyan-400 font-bold">STAGE 1: CLINICAL EXAM</div>
                <h5 className="text-sm font-bold text-white font-display">Bedside Chart Note</h5>
                <p className="text-xs text-slate-400">
                  Comprehensive history, physical exam, and documented medical decision making.
                </p>
                <div className="text-[11px] font-mono-tech text-emerald-400">EHR Signature: VERIFIED</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-cyan-500/30 space-y-2">
                <div className="text-xs font-mono-tech text-cyan-400 font-bold">STAGE 2: CODING CROSSWALK</div>
                <h5 className="text-sm font-bold text-white font-display">ICD-10 & CPT Crosswalk</h5>
                <div className="text-xs font-mono-tech space-y-1 text-slate-300">
                  <div>• I10 (Hypertension)</div>
                  <div>• 99214 (Established Level 4)</div>
                  <div>• Modifier 25 Appended</div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-cyan-500/30 space-y-2">
                <div className="text-xs font-mono-tech text-cyan-400 font-bold">STAGE 3: CLAIM INGESTION</div>
                <h5 className="text-sm font-bold text-white font-display">837 Charge Generation</h5>
                <p className="text-xs text-slate-400">
                  Claim charges compiled into loop 2300 CLM and 2400 SV1 lines.
                </p>
                <div className="text-[11px] font-mono-tech text-cyan-300">Total Billed: $245.00</div>
              </div>
            </div>
          </div>
        )}

        {/* LAYOUT: TOP MISTAKES CHECKLIST */}
        {slideType === 'top_mistakes_checklist' && (
          <div className="w-full max-w-4xl mx-auto space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                { err: 'Control Number Mismatch', detail: 'ST02 != SE02 or ISA13 != IEA02 triggers fatal drop' },
                { err: 'Out of Balance Line Items', detail: 'CLM02 total does not equal sum of SV1 line charges' },
                { err: 'Missing Prior Auth Number', detail: 'REF*G1 missing when 278 pre-certification was required' },
                { err: 'Unchecked Eligibility on Date', detail: 'Member coverage terminated prior to date of service' },
                { err: 'NPI Check-Digit / Taxonomy', detail: 'Invalid 10-digit algorithm or taxonomy misclassification' },
                { err: 'Ignored 277CA Rejections', detail: 'Failing to correct and resubmit front-end clearinghouse rejections' },
              ].map((item, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-slate-900/90 border border-rose-500/30 flex items-start gap-3">
                  <AlertTriangle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs font-bold text-rose-200 font-mono-tech">
                      {idx + 1}. {item.err}
                    </h5>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      {item.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* FOOTER TICKER (REAL-TIME EDI TELEMETRY) */}
      <div className="relative z-10 pt-2 border-t border-cyan-500/20 flex items-center justify-between text-[11px] font-mono-tech text-slate-400">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-cyan-300">
            <Cpu className="w-3.5 h-3.5" />
            STANDARD: ASC X12N 005010
          </span>
          <span className="hidden sm:inline text-slate-600">|</span>
          <span className="hidden sm:flex items-center gap-1.5 text-slate-300">
            <Database className="w-3.5 h-3.5 text-emerald-400" />
            SYNTAX: HIPAA COMPLIANT
          </span>
        </div>
        <div className="text-slate-500 italic">
          Healthcare EDI Academy · Executive Educational Training
        </div>
      </div>
    </div>
  );
};
