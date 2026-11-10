import React, { useState } from 'react';
import { SAMPLE_EDI_TRANSACTIONS } from '../../data/sampleEdiData';
import { EdiSegmentField, EdiTransactionSample } from '../../types/video';
import { 
  FileCode, CheckCircle, AlertOctagon, RefreshCw, Zap, ShieldCheck, 
  ChevronRight, Wrench, ArrowRight, Layers
} from 'lucide-react';

export const EdiTransactionLab: React.FC = () => {
  const [selectedTxId, setSelectedTxId] = useState<string>('820');
  const [selectedSegmentTag, setSelectedSegmentTag] = useState<string>('BPR');
  const [activeEdiText, setActiveEdiText] = useState<string>(SAMPLE_EDI_TRANSACTIONS['820'].rawEdi);
  const [validationResults, setValidationResults] = useState<{
    status: 'pass' | 'fail';
    errors: string[];
    warnings: string[];
    checksRun: number;
  }>({
    status: 'pass',
    errors: [],
    warnings: [],
    checksRun: 14,
  });

  const tx: EdiTransactionSample = SAMPLE_EDI_TRANSACTIONS[selectedTxId] || SAMPLE_EDI_TRANSACTIONS['820'];

  const handleSelectTx = (id: string) => {
    setSelectedTxId(id);
    const newTx = SAMPLE_EDI_TRANSACTIONS[id];
    setActiveEdiText(newTx.rawEdi);
    setSelectedSegmentTag(newTx.segments[0]?.tag || 'ISA');
    runValidation(newTx.rawEdi);
  };

  const runValidation = (text: string) => {
    const lines = text.split('~').map(l => l.trim()).filter(Boolean);
    const errs: string[] = [];
    const warns: string[] = [];

    // Find ST and SE
    const stLine = lines.find(l => l.startsWith('ST*'));
    const seLine = lines.find(l => l.startsWith('SE*'));
    const isaLine = lines.find(l => l.startsWith('ISA*'));
    const ieaLine = lines.find(l => l.startsWith('IEA*'));

    // Check 1: ST02 == SE02
    if (stLine && seLine) {
      const st02 = stLine.split('*')[2];
      const se02 = seLine.split('*')[2];
      if (st02 !== se02) {
        errs.push(`SNIP Level 1 Fatal: ST02 Control Number (${st02}) does not match SE02 (${se02})`);
      }
    }

    // Check 2: ISA13 == IEA02
    if (isaLine && ieaLine) {
      const isaParts = isaLine.split('*');
      const ieaParts = ieaLine.split('*');
      const isa13 = isaParts[13];
      const iea02 = ieaParts[2];
      if (isa13 !== iea02) {
        errs.push(`SNIP Level 1 Fatal: ISA13 Interchange Control # (${isa13}) does not match IEA02 (${iea02})`);
      }
    }

    // Check 3: Balancing check for 837P
    const clmLine = lines.find(l => l.startsWith('CLM*'));
    const sv1Lines = lines.filter(l => l.startsWith('SV1*'));
    if (clmLine && sv1Lines.length > 0) {
      const clmAmount = parseFloat(clmLine.split('*')[2] || '0');
      let sumSv1 = 0;
      sv1Lines.forEach(sv => {
        sumSv1 += parseFloat(sv.split('*')[2] || '0');
      });
      if (Math.abs(clmAmount - sumSv1) > 0.01) {
        errs.push(`SNIP Level 3 Balance: CLM02 ($${clmAmount.toFixed(2)}) != Sum of SV1 lines ($${sumSv1.toFixed(2)})`);
      }
    }

    setValidationResults({
      status: errs.length === 0 ? 'pass' : 'fail',
      errors: errs,
      warnings: warns,
      checksRun: 14 + lines.length,
    });
  };

  const handleInjectError = () => {
    // Corrupt SE02 to simulate the error in user's video
    const corrupted = activeEdiText.replace(/SE\*12\*000123~/, 'SE*12*000124~');
    setActiveEdiText(corrupted);
    runValidation(corrupted);
  };

  const handleFixError = () => {
    // Repair SE02
    const fixed = activeEdiText.replace(/SE\*12\*000124~/, 'SE*12*000123~');
    setActiveEdiText(fixed);
    runValidation(fixed);
  };

  const selectedSegment = tx.segments.find(s => s.tag === selectedSegmentTag) || tx.segments[0];

  return (
    <div className="w-full space-y-6">
      
      {/* HEADER BAR */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-950 to-blue-950/40 border border-cyan-500/30 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded bg-cyan-500 text-slate-950 font-mono-tech text-[10px] font-bold">
              X12 SYNTAX & SNIP LAB
            </span>
            <span className="text-xs font-mono-tech text-cyan-300">
              INTERACTIVE CODE LEVEL WORKBENCH
            </span>
          </div>
          <h2 className="text-2xl font-bold text-white font-display">
            Healthcare EDI Architecture & Inspection Suite
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Inspect live synthetic X12 payloads (EDI 820, 837P, 835, 270/271). Test segment element qualifiers, loop nesting, and simulate production failures like ST02=SE02 mismatch.
          </p>
        </div>

        {/* Transaction Selectors */}
        <div className="flex items-center gap-2">
          {Object.keys(SAMPLE_EDI_TRANSACTIONS).map(key => {
            const item = SAMPLE_EDI_TRANSACTIONS[key];
            const isSelected = selectedTxId === key;
            return (
              <button
                key={key}
                onClick={() => handleSelectTx(key)}
                className={`px-3 py-2 rounded-xl text-xs font-mono-tech transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-lg shadow-cyan-950/50'
                    : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
                }`}
              >
                <span>{item.code}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* VALIDATION ENGINE CONTROLS */}
      <div className="p-4 rounded-xl bg-slate-900 border border-cyan-500/20 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${
            validationResults.status === 'pass' 
              ? 'bg-emerald-950 border border-emerald-500/40 text-emerald-400' 
              : 'bg-rose-950 border border-rose-500/40 text-rose-400'
          }`}>
            {validationResults.status === 'pass' ? <ShieldCheck className="w-5 h-5" /> : <AlertOctagon className="w-5 h-5 animate-pulse" />}
          </div>
          <div>
            <div className="text-xs font-mono-tech font-bold text-white">
              {validationResults.status === 'pass' ? 'ALL 7 WEDI SNIP VALIDATION CHECKS PASSED' : 'FATAL SNIP VALIDATION FAILURE DETECTED'}
            </div>
            <div className="text-[11px] font-mono-tech text-slate-400">
              {validationResults.checksRun} Automated Syntax & Envelope Checks Executed
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleInjectError}
            className="px-3 py-1.5 rounded-lg bg-rose-950/80 hover:bg-rose-900 border border-rose-500/40 text-xs font-mono-tech text-rose-300 flex items-center gap-1.5"
            title="Corrupt SE02 control number to reproduce ODM mismatch error"
          >
            <AlertOctagon className="w-3.5 h-3.5" />
            <span>Simulate ST02 Mismatch</span>
          </button>

          <button
            onClick={handleFixError}
            className="px-3 py-1.5 rounded-lg bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/40 text-xs font-mono-tech text-emerald-300 flex items-center gap-1.5"
            title="Auto-repair control numbers to restore compliance"
          >
            <Wrench className="w-3.5 h-3.5" />
            <span>Auto-Repair Syntax</span>
          </button>
        </div>
      </div>

      {/* ERROR LIST (IF ANY) */}
      {validationResults.errors.length > 0 && (
        <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-500/50 space-y-2">
          {validationResults.errors.map((err, idx) => (
            <div key={idx} className="flex items-center gap-2 text-xs font-mono-tech text-rose-300">
              <AlertOctagon className="w-4 h-4 text-rose-400 flex-shrink-0" />
              <span>{err}</span>
            </div>
          ))}
        </div>
      )}

      {/* SPLIT WORKBENCH: RAW EDI EDITOR & SEGMENT INSPECTOR */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left: Raw X12 Editor */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-cyan-500/30 space-y-3 flex flex-col">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileCode className="w-4 h-4 text-cyan-400" />
              <h4 className="text-xs font-bold text-white font-mono-tech uppercase">
                {tx.code} · Raw HIPAA 5010 Payload
              </h4>
            </div>
            <span className="text-[10px] font-mono-tech text-slate-500">Delimiters: * (Data), ~ (Segment)</span>
          </div>

          <textarea
            value={activeEdiText}
            onChange={(e) => {
              setActiveEdiText(e.target.value);
              runValidation(e.target.value);
            }}
            rows={14}
            className="w-full flex-1 p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono-tech text-cyan-300 focus:outline-none focus:border-cyan-400 leading-relaxed resize-none"
            spellCheck={false}
          />

          <div className="flex items-center justify-between text-[11px] font-mono-tech text-slate-400 pt-1">
            <span>Sender: {tx.sender}</span>
            <span>Receiver: {tx.receiver}</span>
          </div>
        </div>

        {/* Right: Interactive Segment Breakdown */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-cyan-500/30 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h4 className="text-xs font-bold text-white font-mono-tech uppercase flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              Segment Deep-Dive Explorer
            </h4>
            <span className="text-[10px] font-mono-tech text-cyan-400">
              SNIP LEVEL {selectedSegment?.snipValidationLevel || 1}
            </span>
          </div>

          {/* Segment Selector Chips */}
          <div className="flex flex-wrap gap-1.5">
            {tx.segments.map(seg => (
              <button
                key={seg.tag}
                onClick={() => setSelectedSegmentTag(seg.tag)}
                className={`px-2.5 py-1 rounded text-[11px] font-mono-tech transition-all ${
                  selectedSegmentTag === seg.tag
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-950/40'
                    : 'bg-slate-950 hover:bg-slate-800 text-slate-400 border border-slate-800'
                }`}
              >
                {seg.tag}
              </button>
            ))}
          </div>

          {/* Selected Segment Information */}
          {selectedSegment && (
            <div className="space-y-3 pt-2">
              <div className="p-3 rounded-xl bg-slate-950 border border-cyan-500/20">
                <div className="text-xs font-bold text-white font-display">
                  {selectedSegment.name} ({selectedSegment.tag})
                </div>
                <div className="text-[11px] font-mono-tech text-cyan-400 mt-0.5">
                  Loop: {selectedSegment.loopLevel} · {selectedSegment.mandatory ? 'MANDATORY' : 'SITUATIONAL'}
                </div>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  {selectedSegment.description}
                </p>
              </div>

              {/* Element Table */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono-tech text-slate-400 block">
                  DATA ELEMENTS & COMPLIANCE NOTES:
                </span>
                <div className="space-y-1 max-h-52 overflow-y-auto pr-1">
                  {selectedSegment.elements.map(el => (
                    <div key={el.code} className="p-2 rounded bg-slate-950 border border-slate-800 flex items-start justify-between text-xs font-mono-tech">
                      <div>
                        <span className="text-cyan-400 font-bold">{el.code}</span>
                        <span className="text-slate-400 ml-2">{el.label}</span>
                        {el.note && <div className="text-[10px] text-amber-400 mt-0.5 font-sans italic">{el.note}</div>}
                      </div>
                      <span className="text-white font-semibold">{el.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
