export interface SpeechOptions {
  pitch?: number;
  rate?: number;
  volume?: number;
  voiceGender?: 'male' | 'female';
  onStart?: () => void;
  onEnd?: () => void;
  onWord?: (charIndex: number, word: string) => void;
  onError?: (err: any) => void;
}

class SpeechService {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private isSpeaking = false;
  private isPaused = false;
  private voices: SpeechSynthesisVoice[] = [];
  private fallbackTimer: any = null;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.loadVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.loadVoices();
      }
    }
  }

  private loadVoices() {
    if (!this.synth) return;
    this.voices = this.synth.getVoices();
  }

  public getVoices(): SpeechSynthesisVoice[] {
    if (this.voices.length === 0 && this.synth) {
      this.voices = this.synth.getVoices();
    }
    return this.voices;
  }

  public speak(text: string, options: SpeechOptions = {}) {
    this.stop();

    if (!this.synth) {
      this.simulateSpeech(text, options);
      return;
    }

    try {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.pitch = options.pitch ?? 0.95;
      utterance.rate = options.rate ?? 1.0;
      utterance.volume = options.volume ?? 1.0;

      const voices = this.getVoices();
      const englishVoices = voices.filter(v => v.lang.startsWith('en'));
      
      let chosenVoice: SpeechSynthesisVoice | undefined;
      if (options.voiceGender === 'female') {
        chosenVoice = englishVoices.find(v => 
          v.name.toLowerCase().includes('female') || 
          v.name.toLowerCase().includes('samantha') || 
          v.name.toLowerCase().includes('victoria') || 
          v.name.toLowerCase().includes('karen') ||
          v.name.toLowerCase().includes('zira')
        ) || englishVoices[1] || englishVoices[0];
      } else {
        // Michael Anderson / Male
        chosenVoice = englishVoices.find(v => 
          v.name.toLowerCase().includes('natural') ||
          v.name.toLowerCase().includes('guy') || 
          v.name.toLowerCase().includes('david') || 
          v.name.toLowerCase().includes('alex') ||
          v.name.toLowerCase().includes('george')
        ) || englishVoices[0];
      }

      if (chosenVoice) {
        utterance.voice = chosenVoice;
      }

      utterance.onstart = () => {
        this.isSpeaking = true;
        this.isPaused = false;
        options.onStart?.();
      };

      utterance.onend = () => {
        this.isSpeaking = false;
        this.isPaused = false;
        this.currentUtterance = null;
        options.onEnd?.();
      };

      utterance.onerror = (e) => {
        this.isSpeaking = false;
        this.isPaused = false;
        this.currentUtterance = null;
        // If synthesis error occurs (e.g. autoplay restriction), fallback to simulation
        if (e.error !== 'canceled' && e.error !== 'interrupted') {
          options.onError?.(e);
          this.simulateSpeech(text, options);
        }
      };

      utterance.onboundary = (e) => {
        if (e.name === 'word') {
          const word = text.substring(e.charIndex, e.charIndex + (e.charLength || 6));
          options.onWord?.(e.charIndex, word);
        }
      };

      this.currentUtterance = utterance;
      this.synth.speak(utterance);
    } catch (err) {
      console.warn('SpeechSynthesis failed, using timed simulation', err);
      this.simulateSpeech(text, options);
    }
  }

  private simulateSpeech(text: string, options: SpeechOptions) {
    this.isSpeaking = true;
    options.onStart?.();
    const words = text.split(/\s+/);
    const totalDurationMs = Math.max(3000, (words.length / (2.5 * (options.rate || 1))) * 1000);
    const intervalMs = totalDurationMs / words.length;

    let index = 0;
    let charIndex = 0;
    this.fallbackTimer = setInterval(() => {
      if (index >= words.length || !this.isSpeaking) {
        clearInterval(this.fallbackTimer);
        this.isSpeaking = false;
        options.onEnd?.();
        return;
      }
      const word = words[index];
      options.onWord?.(charIndex, word);
      charIndex += word.length + 1;
      index++;
    }, intervalMs);
  }

  public pause() {
    if (this.synth && this.isSpeaking) {
      this.synth.pause();
      this.isPaused = true;
    }
  }

  public resume() {
    if (this.synth && this.isPaused) {
      this.synth.resume();
      this.isPaused = false;
    }
  }

  public stop() {
    if (this.fallbackTimer) {
      clearInterval(this.fallbackTimer);
      this.fallbackTimer = null;
    }
    if (this.synth) {
      try {
        this.synth.cancel();
      } catch (e) {
        // ignore
      }
    }
    this.isSpeaking = false;
    this.isPaused = false;
    this.currentUtterance = null;
  }

  public getStatus() {
    return {
      isSpeaking: this.isSpeaking,
      isPaused: this.isPaused,
    };
  }
}

export const speechService = new SpeechService();
