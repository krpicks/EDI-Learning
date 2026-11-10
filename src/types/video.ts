export type PresenterId = 'michael' | 'elena' | 'sarah' | 'david';

export type StudioEnvironment = 
  | 'command_center' 
  | 'smart_board' 
  | 'server_vault' 
  | 'hospital_corridor' 
  | 'clearinghouse_matrix';

export type SlideLayoutType =
  | 'diagram_flow'
  | 'matrix_comparison'
  | 'edi_envelope_stack'
  | 'control_number_validator'
  | 'snip_validation_engine'
  | 'edi_820_835_comparison'
  | 'server_rack_diagnostics'
  | 'hospital_encounter_journey'
  | 'top_mistakes_checklist';

export interface PresenterPose {
  gesture: 'presenting_board' | 'direct_camera' | 'holding_tablet' | 'pointing_alert' | 'hands_open' | 'explaining_diagram';
  facing: 'front' | 'right' | 'left';
  expression: 'professional' | 'smiling' | 'serious_alert' | 'focused';
}

export interface GoogleFlowPromptSpec {
  sceneTitle: string;
  shotType: 'Wide establishing' | 'Medium presenter' | 'Close-up screen' | 'Over-the-shoulder' | 'Isometric diagram';
  cameraMotion: string;
  lightingSetup: string;
  environmentDescription: string;
  characterVisuals: string;
  fullPromptText: string;
  negativePrompt: string;
  durationSec: number;
  aspectRatio: '16:9' | '9:16';
}

export interface VideoScene {
  id: string;
  sceneNumber: number;
  title: string;
  durationSec: number;
  narrationScript: string;
  presenter: PresenterId;
  pose: PresenterPose;
  environment: StudioEnvironment;
  slideType: SlideLayoutType;
  slideTitle: string;
  slideSubtitle?: string;
  slideData: Record<string, any>;
  googleFlowPrompt: GoogleFlowPromptSpec;
  technicalNotes?: string[];
}

export interface VideoChapter {
  id: string;
  chapterNumber: number;
  title: string;
  shortTitle: string;
  category: 'Fundamentals' | 'Patient Journey' | 'Claim Life Cycle' | 'Validation' | 'Payment & Reconciliation';
  durationSec: number;
  ediStandards: string[];
  snipLevels: number[];
  summary: string;
  scenes: VideoScene[];
  keyTakeaways: string[];
}

export interface CharacterProfile {
  id: PresenterId;
  name: string;
  age: string;
  title: string;
  organization: string;
  bio: string;
  clothing: string;
  visualStyle: string;
  googleFlowSeed: string;
  speechPitch: number;
  speechRate: number;
  accent: string;
}

export interface EdiSegmentField {
  tag: string;
  name: string;
  elements: { code: string; label: string; value: string; note?: string }[];
  description: string;
  loopLevel: string;
  mandatory: boolean;
  snipValidationLevel: number;
}

export interface EdiTransactionSample {
  id: string;
  code: string;
  title: string;
  purpose: string;
  sender: string;
  receiver: string;
  rawEdi: string;
  segments: EdiSegmentField[];
  commonErrors: string[];
}

export interface StudioAgent {
  id: string;
  name: string;
  title: string;
  specialty: string;
  systemPrompt: string;
  status: 'idle' | 'processing' | 'ready';
  lastLog?: string;
}

export interface GeneratedVideoScript {
  id: string;
  topic: string;
  totalDurationMin: number;
  targetAudience: string;
  scenes: {
    sceneNumber: number;
    title: string;
    narration: string;
    flowPrompt: string;
    visualDirectives: string;
    ediSegments: string[];
  }[];
  createdAt: string;
}
