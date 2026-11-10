import { GoogleGenAI } from '@google/genai';

// Initialize SDK safely
const apiKey = typeof process !== 'undefined' && process.env?.GEMINI_API_KEY
  ? process.env.GEMINI_API_KEY
  : (import.meta as any).env?.VITE_GEMINI_API_KEY || '';

let aiInstance: GoogleGenAI | null = null;
if (apiKey) {
  aiInstance = new GoogleGenAI({ apiKey });
}

export interface GeneratedScenePayload {
  sceneTitle: string;
  speaker: 'michael' | 'elena' | 'sarah' | 'david';
  narrationScript: string;
  flowPrompt: string;
  cameraDirection: string;
  keyEdiSegments: string[];
}

export async function generateCustomVideoChapter(topic: string, specificFocus: string): Promise<GeneratedScenePayload[]> {
  if (!aiInstance) {
    // High-quality deterministic fallback if API key is not configured in environment
    return [
      {
        sceneTitle: `${topic}: Business Rationale & Technical Foundation`,
        speaker: 'michael',
        narrationScript: `In this dedicated module on ${topic}, we analyze how healthcare providers must address ${specificFocus}. Without strict envelope validation and loop hierarchy control, claim lifecycles experience severe rejection rates. Let us trace the electronic data interchange step by step.`,
        flowPrompt: `Cinematic 8k photorealistic video of Michael Anderson, 45-year-old healthcare business analyst in a navy blazer and light blue shirt, presenting in the futuristic Healthcare Operations Center. Glowing data screens behind him display interactive diagrams for ${topic}. Slow steady dolly-in camera motion, broadcast quality lighting.`,
        cameraDirection: 'Slow steady push-in from wide establishing to medium close-up',
        keyEdiSegments: ['ISA', 'GS', 'ST', 'BHT', 'SE'],
      },
      {
        sceneTitle: `${topic}: Segment Deep-Dive & Clearinghouse Validation`,
        speaker: 'elena',
        narrationScript: `Inspecting the transaction syntax for ${topic}, we verify SNIP Level 1 through 7 requirements. Notice how the functional group control number in GS06 must match GE02, while situational elements comply with WEDI standards.`,
        flowPrompt: `Medium shot of Elena Vance, female EDI systems engineer with headset and diagnostic tablet in a glowing futuristic server room. Cyan and emerald illuminated server racks in background. Sharp 4k corporate documentary style.`,
        cameraDirection: 'Smooth arc shot around engineer inspecting server racks GS02 to GS06',
        keyEdiSegments: ['GS06', 'GE02', 'BPR', 'TRN', 'CAS'],
      },
    ];
  }

  try {
    const prompt = `You are the Lead Producer for the Healthcare EDI Academy video platform.
The user wants to generate a 2-scene educational video module about: "${topic}", with specific focus on: "${specificFocus}".

Return a valid JSON array of 2 scene objects conforming to this schema:
[
  {
    "sceneTitle": "string",
    "speaker": "michael" | "elena" | "sarah" | "david",
    "narrationScript": "Spoken narrative for the presenter (approx 40-60 words), authoritative and instructional.",
    "flowPrompt": "Hyper-realistic Google Flow / Veo video generation prompt specifying character, lighting, camera move, and 8k photoreal visual style.",
    "cameraDirection": "Camera movement description (e.g. Slow push-in, Pan right)",
    "keyEdiSegments": ["array of segment codes e.g. ST, BPR, TRN, CLM"]
  }
]
Output ONLY valid JSON. No markdown ticks, no preamble.`;

    const response = await aiInstance.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
    });

    const text = response.text || '';
    const cleanJson = text.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleanJson);
  } catch (error) {
    console.error('Failed to generate with Gemini, using fallback:', error);
    return [
      {
        sceneTitle: `${topic}: Architecture & Clinical Impact`,
        speaker: 'michael',
        narrationScript: `Analyzing ${topic}: every transaction set requires strict conformance to the ANSI ASC X12 standard. When providers properly calibrate their practice management rules, first-pass acceptance rates surge above 98 percent.`,
        flowPrompt: `Medium shot of Michael Anderson in navy blazer presenting in modern executive boardroom with glowing holographic healthcare flowcharts. 8k resolution, photorealistic.`,
        cameraDirection: 'Medium presenter shot with slow lateral slider track',
        keyEdiSegments: ['ISA', 'GS', 'ST', 'SE'],
      },
    ];
  }
}
