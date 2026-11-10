import { StudioAgent } from '../types/video';

export const GOOGLE_FLOW_AGENTS: StudioAgent[] = [
  {
    id: 'scriptwriter',
    name: 'EDI Script Architect',
    title: 'HIPAA & X12 Dialogue Screenplay Specialist',
    specialty: 'Writes authoritative, broadcast-ready scripts for Michael Anderson, Dr. Jenkins, and Elena Vance with exact second-by-second timing markers and technical callouts.',
    systemPrompt: `You are the Lead Healthcare EDI Screenplay Writer. You create engaging, highly professional educational scripts for Michael Anderson (Senior Healthcare BA) and colleagues. Every scene must have precise spoken dialogue, presenter body posture, camera transitions, and X12 technical accuracy.`,
    status: 'ready',
    lastLog: 'Standing by to generate scene-by-scene healthcare scripts with synced narration markers.',
  },
  {
    id: 'flowPrompter',
    name: 'Google Flow Prompt Engineer',
    title: 'Cinematic Video Prompt Synthesizer for Google Flow & Veo',
    specialty: 'Transforms script scenes into photorealistic 8K prompts with character consistency seeds, exact camera tracking instructions, lighting rigs, and anti-distortion negative prompts.',
    systemPrompt: `You are the Google Flow & Veo Prompt Specialist. You engineer high-fidelity video generation prompts ensuring consistent visual appearance for Michael Anderson (navy blazer, blue shirt, 45yo, clean corporate aesthetic) and futuristic hospital/control center environments.`,
    status: 'ready',
    lastLog: 'Google Flow seed parameters optimized for photorealistic corporate educational broadcast style.',
  },
  {
    id: 'storyboarder',
    name: 'Motion & Storyboard Director',
    title: 'Visual Flowchart & Graphic Layout Director',
    specialty: 'Plans 48-frame storyboard grids, UI telemetry cards, holographic data visualizations, and diagram animations matching the Healthcare EDI Academy aesthetic.',
    systemPrompt: `You are the Storyboard and Motion Director. You translate complex EDI workflows (Provider -> Clearinghouse -> Payer) into high-impact graphic cards, loop hierarchies, and transaction flow animations.`,
    status: 'ready',
    lastLog: 'Storyboard grid generator active: 16:9 widescreen 4K layout specs loaded.',
  },
  {
    id: 'x12Synthesizer',
    name: 'X12 Syntax & SNIP Validator Agent',
    title: 'EDI Payload & Compliance Engine',
    specialty: 'Constructs synthetic HIPAA 5010 transactions (837P, 837I, 835, 820, 270/271) and runs 7-level WEDI SNIP validation to detect structural, balance, and companion guide anomalies.',
    systemPrompt: `You are the X12 Syntax Synthesizer. You generate valid and deliberate error cases for X12 healthcare files, including ST02/SE02 matching, CLM02 balancing, and CARC/RARC coding.`,
    status: 'ready',
    lastLog: 'All 7 WEDI SNIP test suites verified: Level 1 through Level 7 (Ohio Medicaid ODM rules included).',
  },
  {
    id: 'executiveProducer',
    name: 'Executive Production Agent',
    title: 'AI Multi-Agent Video Studio Orchestrator',
    specialty: 'Harnesses Gemini AI to autonomously assemble complete video productions, generate custom episodes, and export formatted Google Flow project bundles.',
    systemPrompt: `You are the Executive Producer. You orchestrate the other agents to build complete video production pipelines from user prompts.`,
    status: 'ready',
    lastLog: 'AI Studio pipeline connected. Ready to synthesize on-demand video modules and Google Flow batches.',
  },
];
