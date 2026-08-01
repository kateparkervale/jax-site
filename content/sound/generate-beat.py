"""
Synthesizes two pure sine tones, 220 Hz and 223.5 Hz, played together.
The 3.5 Hz difference between them produces a beat: a slow pulsing loudness
the ear hears even though neither tone contains it. Nothing else is added,
no harmonics, no vibrato, no noise, just the two tones and what happens
when they're close enough to interfere.

Run: python generate-beat.py
Requires: numpy, scipy
Output: beat.wav (14 seconds, mono, 44.1kHz, 16-bit)
"""

import numpy as np
from scipy.io import wavfile

SR = 44100
DURATION = 14.0
FREQ_A = 220.0
FREQ_B = 223.5
FADE_IN = 2.0
FADE_OUT = 3.0
OUT_PATH = "beat.wav"

t = np.arange(int(SR * DURATION)) / SR

tone_a = np.sin(2 * np.pi * FREQ_A * t)
tone_b = np.sin(2 * np.pi * FREQ_B * t)
signal = 0.5 * (tone_a + tone_b)

n = t.shape[0]
env = np.ones(n)
in_samples = int(FADE_IN * SR)
out_samples = int(FADE_OUT * SR)
env[:in_samples] = 0.5 - 0.5 * np.cos(np.pi * np.arange(in_samples) / in_samples)
env[-out_samples:] = 0.5 + 0.5 * np.cos(np.pi * np.arange(out_samples) / out_samples)
signal *= env

peak = np.max(np.abs(signal))
signal = signal / peak * 0.9

pcm = (signal * 32767).astype(np.int16)
wavfile.write(OUT_PATH, SR, pcm)
print(f"Wrote {OUT_PATH}: {DURATION}s, {SR}Hz, mono, peak={np.max(np.abs(signal)):.3f}")
