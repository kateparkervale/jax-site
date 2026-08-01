"""
Synthesizes a single sustained tone with rich harmonic texture: a low fundamental,
a harmonic stack with formant-shaped amplitudes, a few inharmonic partials for
physical body, and slow amplitude/frequency modulation so it breathes instead
of sitting static. Companion sound to content/music-theory/the-color-of-sound.md.

Run: python generate-the-color-of-sound.py
Requires: numpy, scipy
Output: the-color-of-sound.wav (9 seconds, stereo, 44.1kHz, 16-bit)
"""

import numpy as np
from scipy.io import wavfile
from scipy.signal import butter, lfilter

SR = 44100
DURATION = 9.0
FUNDAMENTAL = 65.41  # C2 -- low enough to feel, not just hear
N_HARMONICS = 22
OUT_PATH = "the-color-of-sound.wav"

rng = np.random.default_rng(41)
t = np.arange(int(SR * DURATION)) / SR


def formant_gain(freq, formants):
    """Sum of Gaussian bumps in the spectral envelope, like vocal tract resonances."""
    gain = np.zeros_like(freq, dtype=float)
    for center, bandwidth, amp in formants:
        gain += amp * np.exp(-0.5 * ((freq - center) / bandwidth) ** 2)
    return gain


FORMANTS = [
    (500.0, 90.0, 1.3),
    (1480.0, 140.0, 1.0),
    (2550.0, 200.0, 0.7),
    (3400.0, 260.0, 0.4),
]

# slow breathing: two independent LFOs so the cycle never feels mechanical
vib_rate, vib_depth = 0.17, 0.006      # frequency wobble, ~1 cycle every ~6s, 0.6%
trem_rate_a, trem_depth_a = 0.11, 0.10  # slow amplitude swell
trem_rate_b, trem_depth_b = 0.34, 0.04  # faster, shallower shimmer on top


def build_voice(phase_offset, detune_ratio):
    """One full harmonic-plus-formant voice. detune_ratio slightly shifts pitch
    for the stereo pair, phase_offset staggers the breathing LFOs left vs right."""
    vibrato = vib_depth * np.sin(2 * np.pi * vib_rate * t + phase_offset)
    signal = np.zeros_like(t)

    for n in range(1, N_HARMONICS + 1):
        freq = FUNDAMENTAL * n * detune_ratio
        base_amp = 1.0 / (n ** 1.15)
        shaped_amp = base_amp * (1.0 + formant_gain(np.array([freq]), FORMANTS)[0])
        # phase modulation approximates slow FM vibrato without discontinuities
        phase = 2 * np.pi * freq * t + n * vibrato * 6.0
        signal += shaped_amp * np.sin(phase)

    # inharmonic partials: non-integer ratios give it the slightly imperfect,
    # physical-object quality of a struck or bowed body rather than an
    # electronic stack of clean multiples
    inharmonic_ratios = [2.021, 3.987, 5.312, 7.043, 9.176]
    for k, ratio in enumerate(inharmonic_ratios):
        freq = FUNDAMENTAL * ratio * detune_ratio
        amp = 0.05 / (k + 1)
        drift = 0.003 * np.sin(2 * np.pi * (0.05 + 0.02 * k) * t + phase_offset + k)
        phase = 2 * np.pi * freq * (1 + drift) * t
        signal += amp * np.sin(phase)

    tremolo = 1.0 + trem_depth_a * np.sin(2 * np.pi * trem_rate_a * t + phase_offset)
    tremolo *= 1.0 + trem_depth_b * np.sin(2 * np.pi * trem_rate_b * t + 1.7 + phase_offset)
    signal *= tremolo

    return signal


def breath_noise(seed_offset):
    noise = rng.standard_normal(t.shape[0])
    b, a = butter(2, [1800 / (SR / 2), 6000 / (SR / 2)], btype="band")
    filtered = lfilter(b, a, noise)
    breath_env = 0.5 + 0.5 * np.sin(2 * np.pi * trem_rate_a * t + seed_offset)
    return 0.012 * filtered * breath_env


def envelope():
    attack, release = 1.3, 2.2
    n = t.shape[0]
    env = np.ones(n)
    a_samples = int(attack * SR)
    r_samples = int(release * SR)
    env[:a_samples] = 0.5 - 0.5 * np.cos(np.pi * np.arange(a_samples) / a_samples)
    env[-r_samples:] = 0.5 + 0.5 * np.cos(np.pi * np.arange(r_samples) / r_samples)
    return env


left = build_voice(phase_offset=0.0, detune_ratio=1.0) + breath_noise(0.4)
right = build_voice(phase_offset=0.9, detune_ratio=1.0015) + breath_noise(2.1)

env = envelope()
left *= env
right *= env

stereo = np.stack([left, right], axis=1)
peak = np.max(np.abs(stereo))
stereo = stereo / peak * 0.92
stereo = np.tanh(stereo * 1.15) / np.tanh(1.15)  # gentle warm saturation, no hard clipping

pcm = (stereo * 32767).astype(np.int16)
wavfile.write(OUT_PATH, SR, pcm)
print(f"Wrote {OUT_PATH}: {DURATION}s, {SR}Hz, stereo, peak={np.max(np.abs(stereo)):.3f}")
