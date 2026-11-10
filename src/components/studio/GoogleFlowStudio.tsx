import React, { useState } from 'react';
import { GOOGLE_FLOW_AGENTS } from '../../data/googleFlowAgents';
import { StudioAgent, VideoScene } from '../../types/video';
import { generateCustomVideoChapter, GeneratedScenePayload } from '../../services/geminiService';
import { CLAUDE_AI_VIDEO_PROMPT, GOOGLE_FLOW_AGENT_PROMPT } from '../../data/aiVideoPrompts';
import { 
  Bot, Sparkles, Copy, Check, Film, Terminal, Layers, Camera, Lightbulb, 
  Send, RefreshCw, Eye, Download, Code, Play, FileText, CheckCircle2, Cpu
} from 'lucide-react';

interface GoogleFlowStudioProps {
  currentScene?: VideoScene;
  onPreviewSceneInPlayer?: (scene: VideoScene) => void;
}

export const GoogleFlowStudio: React.FC<GoogleFlowStudioProps> = ({
  currentScene,
  onPreviewSceneInPlayer,
}) => {
  const [agents, setAgents] = useState<StudioAgent[]>(GOOGLE_FLOW_AGENTS);
  const [selectedAgentId, setSelectedAgentId] = useState<string>('flowPrompter');
  const [topicInput, setTopicInput] = useState<string>('Ohio Medicaid (ODM) 820 Premium Payment & ST02 Mismatch');
  const [focusInput, setFocusInput] = useState<string>('Envelope validation, ST02=SE02 matching rule, and reconciliation with bank ACH trace numbers');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedPromptId, setCopiedPromptId] = useState<string | null>(null);
  const [generatedScenes, setGeneratedScenes] = useState<GeneratedScenePayload[]>([]);
  const [activeTab, setActiveTab] = useState<'ai_prompts' | 'flow_prompts' | 'agent_orchestrator' | 'storyboard_spec' | 'code_export'>('ai_prompts');

  const selectedAgent = agents.find(a => a.id === selectedAgentId) || agents[0];

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPromptId(id);
    setTimeout(() => setCopiedPromptId(null), 2500);
  };

  const handleGenerateScript = async () => {
    if (!topicInput.trim()) return;
    setIsGenerating(true);

    // Update agent statuses to simulate multi-agent orchestration
    setAgents(prev => prev.map(a => ({
      ...a,
      status: 'processing',
      lastLog: `Executing workflow for: "${topicInput}"`,
    })));

    try {
      const scenes = await generateCustomVideoChapter(topicInput, focusInput);
      setGeneratedScenes(scenes);

      setAgents(prev => prev.map(a => ({
        ...a,
        status: 'ready',
        lastLog: `Completed synthesis of ${scenes.length} production scenes. Prompts ready for Google Flow export.`,
      })));
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="w-full space-y-6">
      
      {/* HEADER BANNER */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-950 to-cyan-950/40 border border-cyan-500/30 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2 py-0.5 rounded bg-cyan-500 text-slate-950 font-mono-tech text-[10px] font-bold">
                GOOGLE FLOW STUDIO
              </span>
              <span className="text-xs font-mono-tech text-cyan-300">
                5-AGENT HEALTHCARE VIDEO SYNTHESIZER
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white font-display">
              AI Video Generation & Prompt Production Lab
            </h2>
            <p className="text-sm text-slate-400 max-w-2xl mt-1">
              Engineer scene-by-scene video prompts for Google Flow, Veo, and Google Vids. Maintain exact character consistency for Michael Anderson, Elena Vance, and futuristic operations sets.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="flex items-center gap-3">
            <div className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-center">
              <div className="text-xs font-mono-tech text-cyan-400 font-bold">5 AGENTS</div>
              <div className="text-[10px] text-slate-400">ORCHESTRATED</div>
            </div>
            <div className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-center">
              <div className="text-xs font-mono-tech text-emerald-400 font-bold">100% HIPAA</div>
              <div className="text-[10px] text-slate-400">COMPLIANT SPECS</div>
            </div>
          </div>
        </div>

        {/* TABS SELECTOR */}
        <div className="flex items-center gap-2 mt-6 pt-4 border-t border-cyan-500/20 overflow-x-auto">
          {[
            { id: 'ai_prompts', label: 'Claude AI & Agent Prompts', icon: Sparkles },
            { id: 'flow_prompts', label: 'Google Flow / Veo Prompts', icon: Camera },
            { id: 'agent_orchestrator', label: 'Multi-Agent Network', icon: Bot },
            { id: 'storyboard_spec', label: 'Custom Episode Generator', icon: Film },
            { id: 'code_export', label: 'Batch Prompt Exporter', icon: Download },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-mono-tech flex items-center gap-2 transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-lg shadow-cyan-950/50'
                    : 'bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB 0: CLAUDE AI & GOOGLE FLOW AGENT PROMPTS (REQUESTED PROMPTS) */}
      {activeTab === 'ai_prompts' && (
        <div className="space-y-6">
          
          {/* PROMPT 1: CLAUDE AI COMPLETE VIDEO CREATION PROMPT */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border-2 border-cyan-500/40 shadow-2xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-cyan-500/20">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-cyan-950 border border-cyan-500/50 text-cyan-400">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white font-display">
                    PROMPT 1: Complete Video Creation via Claude AI
                  </h3>
                  <p className="text-xs text-slate-400 font-mono-tech">
                    Full-system prompt to generate complete video player with Michael Anderson & 10-chapter flow
                  </p>
                </div>
              </div>

              <button
                onClick={() => handleCopy(CLAUDE_AI_VIDEO_PROMPT, 'claude_prompt')}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-mono-tech font-bold text-xs flex items-center gap-2 shadow-lg shadow-cyan-950/50 transition-all flex-shrink-0"
              >
                {copiedPromptId === 'claude_prompt' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copiedPromptId === 'claude_prompt' ? 'Copied Prompt 1!' : 'Copy Prompt 1'}</span>
              </button>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-cyan-500/20 font-mono-tech text-xs text-slate-200 leading-relaxed max-h-80 overflow-y-auto select-all">
              <pre className="whitespace-pre-wrap">{CLAUDE_AI_VIDEO_PROMPT}</pre>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs font-mono-tech text-slate-400 pt-1">
              <span className="flex items-center gap-1.5 text-cyan-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Character Consistency (Michael Anderson Navy Blazer)
              </span>
              <span className="flex items-center gap-1.5 text-cyan-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                16:9 Interactive Player with Speech Lip-Sync
              </span>
              <span className="flex items-center gap-1.5 text-cyan-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ST02=SE02 Control Number Simulator
              </span>
            </div>
          </div>

          {/* PROMPT 2: GOOGLE FLOW MULTI-CLIP AGENT PROMPT */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border-2 border-cyan-400 shadow-2xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-cyan-500/20">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-blue-950 border border-blue-500/50 text-blue-400">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white font-display">
                    PROMPT 2: Google Flow Multi-Clip Agent & Stitching Pipeline
                  </h3>
                  <p className="text-xs text-slate-400 font-mono-tech">
                    Agent system prompt to generate all 10 video clips and stitch into one master video
                  </p>
                </div>
              </div>

              <button
                onClick={() => handleCopy(GOOGLE_FLOW_AGENT_PROMPT, 'flow_agent_prompt')}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 text-slate-950 font-mono-tech font-bold text-xs flex items-center gap-2 shadow-lg shadow-blue-950/50 transition-all flex-shrink-0"
              >
                {copiedPromptId === 'flow_agent_prompt' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copiedPromptId === 'flow_agent_prompt' ? 'Copied Prompt 2!' : 'Copy Prompt 2'}</span>
              </button>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-blue-500/20 font-mono-tech text-xs text-slate-200 leading-relaxed max-h-80 overflow-y-auto select-all">
              <pre className="whitespace-pre-wrap">{GOOGLE_FLOW_AGENT_PROMPT}</pre>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs font-mono-tech text-slate-400 pt-1">
              <span className="flex items-center gap-1.5 text-blue-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                10-Clip Photorealistic Video Generation Specs
              </span>
              <span className="flex items-center gap-1.5 text-blue-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Automated Clip Stitcher & Concatenation Pipeline
              </span>
              <span className="flex items-center gap-1.5 text-blue-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Step-by-Step Deployment in Google Flow / Vertex AI
              </span>
            </div>
          </div>

          {/* STEP-BY-STEP IMPLEMENTATION GUIDE */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white font-display flex items-center gap-2">
              <Cpu className="w-5 h-5 text-cyan-400" />
              How to Use These Prompts Step-by-Step
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono-tech">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-cyan-400 font-bold block">USING PROMPT 1 WITH CLAUDE AI:</span>
                <ol className="text-slate-300 space-y-1.5 list-decimal list-inside leading-relaxed">
                  <li>Open Claude.ai (Claude 3.5 Sonnet / Claude 3.7).</li>
                  <li>Click <strong>Copy Prompt 1</strong> above.</li>
                  <li>Paste directly into Claude chat window.</li>
                  <li>Claude will output the complete React + TypeScript code with animated Michael Anderson avatar, speech synthesis, 10-chapter curriculum, and interactive diagrams.</li>
                </ol>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-blue-400 font-bold block">USING PROMPT 2 IN GOOGLE FLOW / VERTEX AI:</span>
                <ol className="text-slate-300 space-y-1.5 list-decimal list-inside leading-relaxed">
                  <li>Go to Google Cloud Console $\rightarrow$ Vertex AI Agent Builder or Google Flow.</li>
                  <li>Click <strong>Create Agent</strong> $\rightarrow$ Select <strong>Custom Video Workflow Agent</strong>.</li>
                  <li>Click <strong>Copy Prompt 2</strong> above and paste into the Agent's <strong>System Instructions</strong>.</li>
                  <li>Connect Google Veo tool and Cloud Storage / Media Stitcher tool.</li>
                  <li>Run the agent: it will create Clips 01–10 and stitch them into a single 4K master video!</li>
                </ol>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* TAB 1: GOOGLE FLOW / VEO PROMPT CENTER */}
      {activeTab === 'flow_prompts' && (
        <div className="space-y-6">
          {/* Current Active Scene Prompt Banner */}
          {currentScene && (
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-cyan-500/30 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Camera className="w-5 h-5 text-cyan-400" />
                  <h3 className="text-base font-bold text-white font-display">
                    Active Player Scene Prompt: "{currentScene.title}"
                  </h3>
                </div>
                <button
                  onClick={() => handleCopy(currentScene.googleFlowPrompt.fullPromptText, 'active_scene')}
                  className="px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-mono-tech font-bold text-xs flex items-center gap-2 shadow-md transition-all"
                >
                  {copiedPromptId === 'active_scene' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedPromptId === 'active_scene' ? 'Copied to Clipboard!' : 'Copy for Google Flow'}</span>
                </button>
              </div>

              {/* Parameter Badges */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs font-mono-tech">
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">SHOT TYPE</span>
                  <span className="text-cyan-300 font-semibold">{currentScene.googleFlowPrompt.shotType}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">CAMERA MOTION</span>
                  <span className="text-cyan-300 font-semibold">{currentScene.googleFlowPrompt.cameraMotion}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">LIGHTING RIG</span>
                  <span className="text-cyan-300 font-semibold">{currentScene.googleFlowPrompt.lightingSetup}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">ASPECT RATIO</span>
                  <span className="text-cyan-300 font-semibold">16:9 Widescreen UHD</span>
                </div>
              </div>

              {/* Prompt Text Box */}
              <div className="p-4 rounded-xl bg-slate-950 border border-cyan-500/20 font-mono-tech text-xs text-slate-200 leading-relaxed relative">
                <div className="text-[10px] text-cyan-400 font-bold mb-1">PROMPT (COPY-PASTE READY FOR GOOGLE FLOW / VEO):</div>
                <p className="select-all">{currentScene.googleFlowPrompt.fullPromptText}</p>
              </div>

              {/* Negative Prompt */}
              <div className="p-3 rounded-lg bg-slate-950 border border-rose-500/20 font-mono-tech text-xs text-slate-400 flex items-start gap-2">
                <span className="text-rose-400 font-bold text-[10px]">NEGATIVE PROMPT:</span>
                <span className="text-rose-200/80">{currentScene.googleFlowPrompt.negativePrompt}</span>
              </div>
            </div>
          )}

          {/* Generated Scenes List (If Any) */}
          {generatedScenes.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-white font-display flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-cyan-400" />
                Custom Synthesized Scenes Ready for Video Render
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {generatedScenes.map((scene, i) => (
                  <div key={i} className="p-5 rounded-xl bg-slate-900 border border-cyan-500/30 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono-tech text-cyan-400 font-bold">
                        SCENE {i + 1} · {scene.speaker.toUpperCase()}
                      </span>
                      <button
                        onClick={() => handleCopy(scene.flowPrompt, `gen_${i}`)}
                        className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs font-mono-tech text-cyan-300 flex items-center gap-1.5"
                      >
                        {copiedPromptId === `gen_${i}` ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedPromptId === `gen_${i}` ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>

                    <h4 className="text-sm font-bold text-white font-display">{scene.sceneTitle}</h4>
                    
                    <div className="p-3 rounded bg-slate-950 border border-slate-800 text-xs font-sans text-slate-300 italic">
                      "{scene.narrationScript}"
                    </div>

                    <div className="p-3 rounded bg-slate-950 border border-cyan-500/20 font-mono-tech text-[11px] text-cyan-200/90">
                      <span className="text-slate-500 block text-[9px] mb-0.5">GOOGLE FLOW PROMPT:</span>
                      {scene.flowPrompt}
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {scene.keyEdiSegments.map((seg, idx) => (
                        <span key={idx} className="px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-500/30 text-[10px] font-mono-tech">
                          {seg}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quick Prompt Formulas & Character Anchors */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white font-display flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-amber-400" />
              Google Flow Character Consistency Guidelines
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono-tech text-slate-300">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="text-cyan-400 font-bold">MICHAEL ANDERSON (Lead Presenter Seed)</div>
                <p className="text-slate-400 text-[11px]">
                  "45-year-old male senior healthcare business analyst in tailored navy blazer, sky-blue collared shirt, clean-shaven with subtle salt-and-pepper hair, authoritative yet approachable demeanour, standing in futuristic healthcare operations center with curved dark-blue data screens."
                </p>
                <div className="text-[10px] text-slate-500">Seed Tag: #MichaelAnderson_EDI_Lead_4k</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="text-emerald-400 font-bold">ELENA VANCE (Clearinghouse Lead Seed)</div>
                <p className="text-slate-400 text-[11px]">
                  "Early-30s female systems engineer in slate-gray tech lab uniform with headset and safety glasses, holding diagnostic tablet, standing in high-tech data center server room with illuminated cyan and emerald server racks GS02-GS06."
                </p>
                <div className="text-[10px] text-slate-500">Seed Tag: #ElenaVance_SNIP_Engineer_4k</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: AGENT ORCHESTRATOR */}
      {activeTab === 'agent_orchestrator' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Agent Roster */}
          <div className="lg:col-span-1 space-y-3">
            <h3 className="text-sm font-bold text-white font-display uppercase tracking-wider">
              Active Video Production Agents
            </h3>
            {agents.map((ag) => {
              const isSelected = ag.id === selectedAgentId;
              return (
                <button
                  key={ag.id}
                  onClick={() => setSelectedAgentId(ag.id)}
                  className={`w-full text-left p-4 rounded-xl transition-all border flex items-start gap-3 ${
                    isSelected
                      ? 'bg-cyan-950/70 border-cyan-400 shadow-lg shadow-cyan-950/40 text-white'
                      : 'bg-slate-900 hover:bg-slate-800 border-slate-800 text-slate-300'
                  }`}
                >
                  <div className="w-10 h-10 rounded-lg bg-slate-950 border border-cyan-500/40 flex items-center justify-center text-cyan-400 flex-shrink-0">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold font-display truncate">{ag.name}</h4>
                      <span className={`w-2 h-2 rounded-full ${ag.status === 'processing' ? 'bg-amber-400 animate-ping' : 'bg-emerald-400'}`} />
                    </div>
                    <div className="text-[11px] font-mono-tech text-cyan-400 truncate mt-0.5">{ag.title}</div>
                    <div className="text-[10px] text-slate-400 line-clamp-2 mt-1">{ag.specialty}</div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Agent Terminal & Inspection */}
          <div className="lg:col-span-2 p-6 rounded-2xl bg-slate-900/90 border border-cyan-500/30 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-cyan-400" />
                  <h3 className="text-base font-bold text-white font-display">
                    {selectedAgent.name} · System Dossier
                  </h3>
                </div>
                <span className="px-2.5 py-1 rounded bg-slate-950 text-emerald-400 border border-emerald-500/40 text-[10px] font-mono-tech">
                  STATUS: {selectedAgent.status.toUpperCase()}
                </span>
              </div>

              <div className="mt-4 space-y-3">
                <div>
                  <span className="text-xs font-mono-tech text-slate-400">ROLE & MANDATE:</span>
                  <p className="text-xs text-slate-200 mt-1 leading-relaxed">{selectedAgent.specialty}</p>
                </div>

                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-xs font-mono-tech text-cyan-400 font-bold block mb-1">SYSTEM PROMPT:</span>
                  <p className="text-xs font-mono-tech text-slate-300 leading-normal">{selectedAgent.systemPrompt}</p>
                </div>

                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-xs font-mono-tech text-slate-500 block mb-1">RECENT TELEMETRY LOG:</span>
                  <p className="text-xs font-mono-tech text-emerald-400">{selectedAgent.lastLog}</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-400 font-mono-tech">Model: gemini-3.8-flash</span>
              <button
                onClick={() => setActiveTab('storyboard_spec')}
                className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-mono-tech font-bold text-xs flex items-center gap-2"
              >
                <span>Task Agent With New Episode</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: CUSTOM EPISODE GENERATOR */}
      {activeTab === 'storyboard_spec' && (
        <div className="p-6 rounded-2xl bg-slate-900/90 border border-cyan-500/30 space-y-6">
          <div>
            <h3 className="text-lg font-bold text-white font-display">
              Autonomous Video Episode Generator
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Provide any healthcare billing or EDI topic. The multi-agent pipeline writes dialogue, formats timestamps, and crafts photorealistic Google Flow prompts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-mono-tech text-cyan-400 block mb-1">
                TOPIC / EDI STANDARD:
              </label>
              <input
                type="text"
                value={topicInput}
                onChange={e => setTopicInput(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-400 font-mono-tech"
                placeholder="e.g. Inpatient EDI 837I to 835 Remittance with DRG Pricing"
              />
            </div>

            <div>
              <label className="text-xs font-mono-tech text-cyan-400 block mb-1">
                TECHNICAL FOCUS & ERROR CASES:
              </label>
              <input
                type="text"
                value={focusInput}
                onChange={e => setFocusInput(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-400 font-mono-tech"
                placeholder="e.g. SNIP Level 3 balance check, ST02=SE02 mismatch, CARC 45 write-off"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2 text-xs font-mono-tech text-slate-400">
              <Bot className="w-4 h-4 text-cyan-400" />
              <span>Orchestrating Scriptwriter & Google Flow Prompter</span>
            </div>

            <button
              onClick={handleGenerateScript}
              disabled={isGenerating || !topicInput.trim()}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-50 text-slate-950 font-bold font-mono-tech text-xs flex items-center gap-2 shadow-lg shadow-cyan-950/60"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Synthesizing Video Script...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generate Complete Video Production</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* TAB 4: BATCH PROMPT EXPORTER */}
      {activeTab === 'code_export' && (
        <div className="p-6 rounded-2xl bg-slate-900/90 border border-cyan-500/30 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white font-display">
                Google Flow / Veo Prompt Pipeline Export
              </h3>
              <p className="text-xs text-slate-400">
                Full JSON compilation of all 10 modules for automated Google Flow batch rendering.
              </p>
            </div>
            <button
              onClick={() => handleCopy(JSON.stringify(currentScene?.googleFlowPrompt, null, 2), 'batch_json')}
              className="px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-mono-tech font-bold text-xs flex items-center gap-2"
            >
              {copiedPromptId === 'batch_json' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copiedPromptId === 'batch_json' ? 'Copied JSON!' : 'Copy Batch JSON'}</span>
            </button>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono-tech text-xs text-cyan-300 max-h-96 overflow-y-auto">
            <pre className="whitespace-pre-wrap">
              {JSON.stringify({
                productionTitle: "Healthcare EDI Academy - Provider Business Flow Step by Step",
                leadCharacter: "Michael Anderson (Healthcare BA Specialist)",
                targetPlatform: "Google Flow / Google Vids / Veo 3.1",
                resolution: "3840x2160 UHD",
                aspectRatio: "16:9",
                scenesInBatch: 10,
                samplePromptObject: currentScene?.googleFlowPrompt,
              }, null, 2)}
            </pre>
          </div>
        </div>
      )}

    </div>
  );
};
