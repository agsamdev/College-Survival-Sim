let ctx = null;
let masterGain = null;
let bgmNodes = [];
let bgmPlaying = false;

function getCtx() {
  if (!ctx) {
    ctx = new (window.AudioContext || window.webkitAudioContext)();
    masterGain = ctx.createGain();
    masterGain.gain.value = 0.3;
    masterGain.connect(ctx.destination);
  }
  if (ctx.state === "suspended") ctx.resume();
  return ctx;
}

export function setVolume(v) {
  const c = getCtx();
  masterGain.gain.value = Math.max(0, Math.min(1, v));
}

export function playEngineSound(speed) {
  const c = getCtx();
  const osc = c.createOscillator();
  const gain = c.createGain();
  const filter = c.createBiquadFilter();

  const freq = 80 + speed * 8;
  osc.type = "sawtooth";
  osc.frequency.value = freq;
  filter.type = "lowpass";
  filter.frequency.value = 300 + speed * 15;
  gain.gain.value = 0.06;

  osc.connect(filter);
  filter.connect(gain);
  gain.connect(masterGain);
  osc.start();
  osc.stop(c.currentTime + 0.05);

  // Noise layer
  const bufferSize = ctx.sampleRate * 0.05;
  const buffer = c.createBuffer(1, bufferSize, c.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * speed * 0.002;
  }
  const noise = c.createBufferSource();
  noise.buffer = buffer;
  const noiseGain = c.createGain();
  noiseGain.gain.value = 0.04;
  noise.connect(noiseGain);
  noiseGain.connect(masterGain);
  noise.start();
}

export function playCrowdRoar(intensity = 0.5) {
  const c = getCtx();
  const bufferSize = c.sampleRate * 0.3;
  const buffer = c.createBuffer(1, bufferSize, c.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * intensity;
  }
  const noise = c.createBufferSource();
  noise.buffer = buffer;
  const gain = c.createGain();
  gain.gain.value = 0.08;
  const filter = c.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.value = 800;
  filter.Q.value = 0.5;
  noise.connect(filter);
  filter.connect(gain);
  gain.connect(masterGain);
  noise.start();
}

export function playLapComplete() {
  const c = getCtx();
  const notes = [523, 659, 784];
  notes.forEach((freq, i) => {
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.type = "square";
    osc.frequency.value = freq;
    gain.gain.value = 0.08;
    gain.gain.setValueAtTime(0.08, c.currentTime + i * 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + i * 0.1 + 0.2);
    osc.connect(gain);
    gain.connect(masterGain);
    osc.start(c.currentTime + i * 0.1);
    osc.stop(c.currentTime + i * 0.1 + 0.2);
  });
}

export function playRaceFinish() {
  const c = getCtx();
  const notes = [523, 659, 784, 1047];
  notes.forEach((freq, i) => {
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.type = "square";
    osc.frequency.value = freq;
    gain.gain.value = 0.1;
    gain.gain.setValueAtTime(0.1, c.currentTime + i * 0.12);
    gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + i * 0.12 + 0.3);
    osc.connect(gain);
    gain.connect(masterGain);
    osc.start(c.currentTime + i * 0.12);
    osc.stop(c.currentTime + i * 0.12 + 0.3);
  });
  playCrowdRoar(0.8);
}

export function playEngineStart() {
  const c = getCtx();
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.type = "sawtooth";
  osc.frequency.setValueAtTime(40, c.currentTime);
  osc.frequency.linearRampToValueAtTime(120, c.currentTime + 0.5);
  gain.gain.value = 0.1;
  gain.gain.setValueAtTime(0.1, c.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.6);
  osc.connect(gain);
  gain.connect(masterGain);
  osc.start();
  osc.stop(c.currentTime + 0.6);
}

// BGM: procedural lo-fi beat
export function startBGM() {
  if (bgmPlaying) return;
  bgmPlaying = true;
  bgmNodes = [];
  const c = getCtx();

  function playChord(freqs, start, dur) {
    freqs.forEach(f => {
      const osc = c.createOscillator();
      const gain = c.createGain();
      osc.type = "sine";
      osc.frequency.value = f;
      gain.gain.setValueAtTime(0.03, start);
      gain.gain.exponentialRampToValueAtTime(0.001, start + dur);
      osc.connect(gain);
      gain.connect(masterGain);
      osc.start(start);
      osc.stop(start + dur);
      bgmNodes.push(osc);
    });
  }

  function playBeat(start) {
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.type = "sine";
    osc.frequency.value = 60;
    gain.gain.setValueAtTime(0.15, start);
    gain.gain.exponentialRampToValueAtTime(0.001, start + 0.08);
    osc.connect(gain);
    gain.connect(masterGain);
    osc.start(start);
    osc.stop(start + 0.08);
    bgmNodes.push(osc);
  }

  function playHihat(start) {
    const bufferSize = c.sampleRate * 0.05;
    const buffer = c.createBuffer(1, bufferSize, c.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.08;
    }
    const noise = c.createBufferSource();
    noise.buffer = buffer;
    const gain = c.createGain();
    const filter = c.createBiquadFilter();
    filter.type = "highpass";
    filter.frequency.value = 5000;
    gain.gain.value = 0.04;
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(masterGain);
    noise.start(start);
    bgmNodes.push(noise);
  }

  // 4-bar lo-fi loop
  const bpm = 80;
  const beatDuration = 60 / bpm;
  const now = c.currentTime;

  for (let bar = 0; bar < 4; bar++) {
    const barStart = now + bar * beatDuration * 4;
    // Simple chord progression
    if (bar % 2 === 0) playChord([262, 330, 392], barStart, beatDuration * 3.5);
    else playChord([294, 370, 440], barStart, beatDuration * 3.5);

    // Kick on 1 & 3
    playBeat(barStart);
    playBeat(barStart + beatDuration * 2);

    // Hihat on 8ths
    for (let e = 0; e < 8; e++) {
      playHihat(barStart + e * beatDuration * 0.5);
    }
  }

  // Loop
  bgmNodes.push(setTimeout(() => { bgmPlaying = false; startBGM(); }, 4 * beatDuration * 4 * 1000));
}

export function stopBGM() {
  bgmPlaying = false;
  bgmNodes.forEach(n => {
    if (n instanceof AudioScheduledSourceNode) {
      try { n.stop(); } catch {}
    } else if (n instanceof setTimeout) {
      clearTimeout(n);
    }
  });
  bgmNodes = [];
}
