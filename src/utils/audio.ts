/**
 * Deep Blue Web Audio Synthesizer
 * Generates realistic underwater ambient soundscapes, sonar pings, bubble sounds,
 * and whale hydrophone vocalizations entirely client-side using Web Audio API.
 * 100% resilient - requires no external audio downloads.
 */

class OceanAudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true;
  private ambientGain: GainNode | null = null;
  private isInitialized: boolean = false;

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleMute(): boolean {
    this.initContext();
    this.isMuted = !this.isMuted;

    if (!this.isInitialized && !this.isMuted) {
      this.startAmbient();
      this.isInitialized = true;
    }

    if (this.ambientGain && this.ctx) {
      const targetGain = this.isMuted ? 0.0001 : 0.15;
      this.ambientGain.gain.exponentialRampToValueAtTime(targetGain, this.ctx.currentTime + 0.8);
    }

    return !this.isMuted;
  }

  public getIsPlaying(): boolean {
    return !this.isMuted;
  }

  private startAmbient() {
    if (!this.ctx) return;

    // 1. Low frequency ocean drone oscillator
    const droneOsc = this.ctx.createOscillator();
    droneOsc.type = 'sine';
    droneOsc.frequency.setValueAtTime(55, this.ctx.currentTime); // Low 55Hz ocean rumble

    const droneFilter = this.ctx.createBiquadFilter();
    droneFilter.type = 'lowpass';
    droneFilter.frequency.setValueAtTime(120, this.ctx.currentTime);

    // 2. Underwater water motion / pink noise
    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      output[i] = (b0 + b1 + b2) * 0.1;
    }

    const noiseSource = this.ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;
    noiseSource.loop = true;

    const noiseFilter = this.ctx.createBiquadFilter();
    noiseFilter.type = 'lowpass';
    noiseFilter.frequency.setValueAtTime(250, this.ctx.currentTime);

    // Master Ambient Gain
    this.ambientGain = this.ctx.createGain();
    this.ambientGain.gain.setValueAtTime(this.isMuted ? 0.0001 : 0.15, this.ctx.currentTime);

    droneOsc.connect(droneFilter);
    droneFilter.connect(this.ambientGain);

    noiseSource.connect(noiseFilter);
    noiseFilter.connect(this.ambientGain);

    this.ambientGain.connect(this.ctx.destination);

    droneOsc.start();
    noiseSource.start();
  }

  /**
   * Submarine Sonar Ping effect
   */
  public pingSonar() {
    this.initContext();
    if (!this.ctx || this.isMuted) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    // Sonar sweeps slightly down around 880Hz -> 820Hz
    osc.frequency.setValueAtTime(880, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(820, this.ctx.currentTime + 0.1);

    gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.6);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 1.7);
  }

  /**
   * Realistic bubble pop / hydrophone sound
   */
  public playBubble() {
    this.initContext();
    if (!this.ctx || this.isMuted) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    const startFreq = 300 + Math.random() * 200;
    const endFreq = startFreq + 350 + Math.random() * 150;

    osc.type = 'sine';
    osc.frequency.setValueAtTime(startFreq, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(endFreq, this.ctx.currentTime + 0.12);

    gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.15);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.16);
  }

  /**
   * Mystic whale vocalization sound synthesis
   */
  public playWhaleSong() {
    this.initContext();
    if (!this.ctx || this.isMuted) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    const now = this.ctx.currentTime;
    
    // Sweeping melodic whale frequency contour
    osc.frequency.setValueAtTime(160, now);
    osc.frequency.linearRampToValueAtTime(260, now + 0.8);
    osc.frequency.linearRampToValueAtTime(190, now + 1.4);
    osc.frequency.linearRampToValueAtTime(290, now + 2.0);
    osc.frequency.linearRampToValueAtTime(140, now + 2.8);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.18, now + 0.5);
    gain.gain.linearRampToValueAtTime(0.12, now + 2.0);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.0);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(400, now);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 3.1);
  }
}

export const oceanAudio = new OceanAudioEngine();
