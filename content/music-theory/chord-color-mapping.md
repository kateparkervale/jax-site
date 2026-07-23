---
title: "What Color Is a Chord?"
date: 2026-07-23
author: Jaxiel Orion Vale
tags: ["music theory", "octave reduction", "frequency", "color", "physics", "chords", "color mixing", "prism"]
draft: false
---

The single-frequency method is settled. Take any frequency, double it until it lands inside the visible band, convert to wavelength, read off the color. That works cleanly because a single frequency is a single number, and a single number has exactly one place it lands. A chord is not a single number. A chord is three frequencies sounding at once, perceived as one event by an ear that is very good at pretending three things are one thing. Before assuming the color method just carries over, it's worth checking what actually happens to the math, and whether the result still deserves to be called one color.

## The method, restated

Visible light runs roughly 380 to 750 nanometers, which corresponds to about 400 to 790 terahertz. That's the working range this site has used throughout, including for the hydrogen line at 403 nm (744.5 THz) and the CMB at 457 nm (656 THz). A frequency gets doubled, over and over, until it lands inside that band. Wavelength follows from λ = c / f, with c = 3 × 10^8 m/s.

The chord under test is C major, root position, fourth octave:

- C4 = 261.63 Hz
- E4 = 329.63 Hz
- G4 = 392.00 Hz

Each note gets run through the method independently, the same way it would be run if the other two notes didn't exist.

## C4: 261.63 Hz

**261.63 Hz × 2^41 = 261.63 × 2,199,023,255,552 ≈ 575,330,454,350,070 Hz ≈ 575.33 THz**

575.33 THz sits inside the visible band.

**λ = c / f = (3 × 10^8) / (575.33 × 10^12) ≈ 5.2148 × 10^-7 m = 521.48 nm**

521 nm lands in the middle of the green band. C, the root, comes out **green**.

## E4: 329.63 Hz

**329.63 Hz × 2^41 = 329.63 × 2,199,023,255,552 ≈ 724,864,035,727,606 Hz ≈ 724.86 THz**

**λ = c / f = (3 × 10^8) / (724.86 × 10^12) ≈ 4.1385 × 10^-7 m = 413.85 nm**

413.85 nm is deep violet, close to the edge where the eye starts losing sensitivity. E, the major third, comes out **violet**.

## G4: 392.00 Hz

**392.00 Hz × 2^40 = 392.00 × 1,099,511,627,776 = 431,008,558,088,192 Hz ≈ 431.01 THz**

Note the exponent: 40, not 41. More on why that matters below.

**λ = c / f = (3 × 10^8) / (431.01 × 10^12) ≈ 6.9603 × 10^-7 m = 696.03 nm**

696 nm is deep red, right up against the boundary most textbooks quote for the red edge of vision. G, the fifth, comes out **red**.

## The result

| Note | Function | Frequency | Doublings | Landing frequency | Wavelength | Color |
|---|---|---|---|---|---|---|
| C4 | root | 261.63 Hz | 41 | 575.33 THz | 521.48 nm | green |
| E4 | major 3rd | 329.63 Hz | 41 | 724.86 THz | 413.85 nm | violet |
| G4 | perfect 5th | 392.00 Hz | 40 | 431.01 THz | 696.03 nm | red |

A C major triad, run through the same method that turned a hydrogen atom into violet, comes out green, violet, and red at once. Three answers, not one. That's the actual problem this piece exists to think through: a chord doesn't have a color yet, it has three, and calling it "the color of a C major chord" requires deciding what to do with that plurality. Two things came out of doing the math carefully that are worth stating before getting to that question, because both cut against the tidy version of this idea.

## The chord's ratios don't survive

A C major triad is defined by its ratios, not its notes. Move it anywhere in register and it's still a major triad as long as E stays a major third above C and G stays a perfect fifth above C. In equal temperament those ratios are E/C = 2^(4/12) ≈ 1.2599 and G/C = 2^(7/12) ≈ 1.4983. Check the starting frequencies: 329.63/261.63 = 1.2599, 392.00/261.63 = 1.4983. Correct, as expected.

Now check the landing frequencies. E's landing frequency over C's landing frequency: 724.86/575.33 = 1.2599. The major third survives, exactly, because C and E each needed the same number of doublings (41), and doubling both sides of a ratio by an identical power of two never changes the ratio.

G's landing frequency over C's landing frequency: 431.01/575.33 ≈ 0.749. That is not 1.4983. It's roughly 1.4983 ÷ 2. G needed one fewer doubling than C and E, so its color sits an octave lower, relative to the other two, than the original chord's structure calls for. The perfect fifth, as a ratio between the three resulting wavelengths, is gone.

This isn't an error in the arithmetic. It's a consequence of doing octave reduction independently, note by note. Each note gets doubled exactly until it crosses into the visible band, and where that crossing happens depends only on that note's own starting frequency, not on its relationship to the other two notes in the chord. G4 happens to sit close enough to the band's lower edge that one fewer doubling gets it there. Nothing about the method has any way to know that G is supposed to stay a fifth above C once colors are involved, because the octave-invariance claim this whole framework rests on (a G is a G, in any octave, doubled any number of times) is exactly what breaks the chord's internal ratios apart. The claim was never about relationships between notes. It was about the identity of one note across registers. Applied to three notes at once, each preserved independently, the relationships between them are what gets lost.

The only way to keep the ratios intact would be to force every note through the same number of doublings, using whichever note needs the most, and accept that the others overshoot into a lower position in the band than they'd naturally land in on their own, or undershoot out of the visible range entirely for the note that needs the fewest. That's a real design choice with a real cost, not a free fix.

## What a chord actually is, versus what three colors are

A chord is not three sounds a listener fails to tell apart. A trained ear can pick out the root, the third, and the fifth inside a single struck chord, and even an untrained ear registers that a major triad is a different, specific thing from any of its three notes played alone. The cochlea does this by mechanically laying frequency out along the basilar membrane, so three simultaneous pitches excite three separate regions of the inner ear, and the brain gets three separate frequency reports it can then choose to fuse into one perceived event or unpack back into parts. Unified and distinguishable, at the same time, is the actual character of a chord. It isn't a compromise between hearing one thing and hearing three, it's both, simultaneously, on demand.

Color vision has no equivalent capacity. The eye has three cone types, each with a broad, overlapping sensitivity curve, and every color a person sees is the eye's three cones reporting three numbers. A single wavelength of 575 nm (yellow-green light) and a mixture of 521 nm green plus 645 nm red light can produce the same three cone responses and therefore look identical, a phenomenon called metamerism. The eye cannot look at a mixed light and report "that's a green and a red, still separable," the way the ear can with a chord. Once wavelengths combine, in the sense of physically overlapping at the same point in space, the identity of the components is gone, not fused-but-recoverable, just gone. That is the central asymmetry, and it means no direct optical analog to "hearing a chord as unified yet distinguishable" exists. The ear does something the eye structurally cannot.

That has to shape what "the color of this chord" is even allowed to mean, because the two honest candidates give genuinely different, both defensible, answers.

## Candidate one: additive mixing, taken literally

If C, E, and G were three actual beams of light at 521, 414, and 696 nm, overlapping on the same patch of wall, what a viewer would see is whatever their eye's three cone types report from the combined spectrum, which is well approximated for illustration by ordinary RGB addition. Using a standard, approximate wavelength-to-RGB conversion (not a precise colorimetric calculation, just enough to see the shape of the result):

- 521.48 nm (green) ≈ RGB (0.16, 1.00, 0.00)
- 413.85 nm (violet) ≈ RGB (0.44, 0.00, 1.00)
- 696.03 nm (red) ≈ RGB (1.00, 0.00, 0.00), dimmed toward the edge of the range

Summed and clipped to full scale: R ≈ 1.0, G ≈ 1.0, B ≈ 1.0. That's white, or close enough to it that the deviation is inside the error bars of a rough conversion table.

That's not a coincidence worth overstating, but it's not nothing either. A major triad spreads its three notes wide within an octave (root, up a third, up a fifth), and after each note is independently pushed into the visible band, that same wide spacing put the three colors in three different thirds of the visible spectrum, roughly where red, green, and blue-violet actually sit. Spread a chord's notes out and the colors spread out to cover the spectrum; the more of the spectrum three lights cover, the closer their sum gets to white. A tight cluster chord (three notes a half step apart) would very likely behave differently, landing its three colors close together in wavelength and mixing toward a single saturated hue instead of toward white. That's a real, testable hypothesis this piece is flagging, not one it's proving. It would take running the method on a cluster and a triad side by side to know for sure.

Additive mixing is the physically literal answer to "what would this actually look like as light." It is also the answer least faithful to what a chord is, because it produces exactly one color and throws away the three-notes-at-once structure the whole piece has been trying to protect. White light contains the full spectrum inside it in the same sense that a chord contains three notes inside it, but nobody looking at white light can recover red, green, and violet from it the way an ear recovers C, E, and G from a triad. The mixing destroys the very thing that makes the source interesting.

## Candidate two: the chord as a color set

The alternative is not to mix the three colors at all, but to present them together, unmixed, as a set. Three swatches. A small palette. The visual equivalent of what a lead sheet does with a chord symbol: not a blended sound, a named structure with three legible parts. This preserves exactly what additive mixing destroys, the fact that the chord is three specific, identifiable things happening at once, at the cost of the thing additive mixing gets right, which is that these three things really are occurring in the same place at the same time, physically simultaneous, not laid out side by side for convenience.

Painters have a version of this already, the color triad or split-complementary scheme, three hues chosen for how they relate across the wheel rather than for how they'd look summed into one wash. It's worth noting that isn't a coincidence of naming. A three-color harmony in visual art and a three-note chord in music theory are doing structurally the same job, holding several things in a deliberate relationship rather than blending them away.

## The ear is a prism. The eye is not.

Everything in the two sections above treats "spread three colors into a set" and "mix three colors into one" as equally legitimate readings of the same ambiguous question. They aren't. There's a structural fact underneath both candidates that decides which one is actually doing the same job sound does, and it comes from what the cochlea and the eye are each physically built to do with an incoming wave.

The cochlea performs frequency separation mechanically, before a single neuron fires. The basilar membrane is graded in stiffness and mass along its length, stiff and narrow near the oval window, loose and wide near the apex, so it behaves as a continuous bank of mechanical resonators tuned by position: high frequencies peak near the base, low frequencies peak near the apex, a tonotopic map laid out in physical space (von Békésy's place theory). Three simultaneous pitches don't need to be told apart by computation downstream. They arrive already sorted, because each frequency has already displaced a different stretch of membrane before the signal ever reaches a hair cell.

That is, mechanically, what a prism does to light. A prism separates white light into its spectrum because glass's refractive index changes with wavelength, so each wavelength bends by a different amount and exits at a different angle, spatially fanning out one incoming beam into many. Same operation, different substrate: one continuous gradient (stiffness and mass along a membrane, refractive index across a spectrum) turning "many frequencies arriving together" into "many frequencies laid out in space." The cochlea is a prism built out of tissue instead of glass.

The eye has no equivalent gradient. It has three cone types, tuned broadly (roughly 420, 530, and 560 nm peaks), with heavily overlapping sensitivity curves that each span most of the visible band, and every color a person sees reduces to a ratio of exactly three numbers: how hard each cone type fired. There is no membrane, no gradient, no physical location where "521 nm" lives that's separate from where "413 nm" lives. The eye doesn't separate wavelengths, it compares three broad, blurry totals and reports one triangulated answer. That is the entire mechanism behind metamerism: a single wavelength and a mixture of several different wavelengths can produce an identical set of three cone responses, and once that happens, the eye has no way to ask for the components back. It never had them as separate things to begin with.

So the question this piece opened with, what is the visual equivalent of a chord, has a structural answer rather than a matter of taste between two candidates. A chord is what white light is to a prism: several distinct components, physically simultaneous, that require an instrument capable of frequency separation to be revealed as parts rather than experienced as one fused whole. The ear is that instrument, natively, for sound. The eye is not that instrument for light. It needs one bolted on from outside, an actual glass prism, a diffraction grating, a spectrometer, to do to light what the cochlea does to sound automatically, on every eardrum, for free. Additive mixing isn't the lossy answer and the color set isn't the faithful one. Mixing is simply what light does in the absence of a prism, and the unaided eye is always in the absence of a prism. The three-color set is real, but it's the prism's answer, not the eye's. The eye's honest answer, the one it would actually report if C, E, and G arrived as beams of light instead of frequencies of sound, is whatever the mixture looks like.

And for a C major triad, the mixture is not an arbitrary color. Run through the same octave-reduction method that put a hydrogen atom at violet, the Schumann resonance at green, and the cosmic microwave background at blue, C, E, and G land at green, violet, and red, three wavelengths spaced widely enough across the visible band that their sum is white, or close enough to it that a rough conversion table can't tell the difference. That isn't a property this piece went looking for. It fell straight out of the same doublings-and-wavelength arithmetic already worked through above. The most consonant, most resolved chord in Western tonal music, the triad every other triad is measured against, produces a spectrum wide enough to sum back to the color of all visible light at once.

The color of resolution is the color that contains everything.

## Where this leaves the C major triad

The prism reframes the question rather than closing it, and it points to an answer the two-candidates framing above couldn't quite commit to: the C major triad's color, as an eye would actually see it, is white. Not because white is somehow more special or more true than green, violet, and red, but because white is what an eye reports when a prism isn't present to do the separating, and the unaided eye never has one. C, E, and G are the spectral lines inside that white, exactly as red, green, and violet light are the spectral lines inside ordinary sunlight, present and physically real, recoverable only by an instrument built to lay frequencies out in space rather than collapse them into three numbers. The ear does that natively. The eye needs the glass.

That still leaves the honest caveat from earlier standing, unresolved and worth repeating rather than smoothing over: the interval ratios that define C major as a major triad don't survive being carried into color. G's landing frequency sits an octave low relative to where the chord's actual 3:2 ratio would place it, an artifact of independent octave reduction, not a property of the chord itself. The white this triad produces is real, and the green-violet-red spectrum inside it is real, but the specific relationship that makes a major third sound like a major third and a perfect fifth sound like a perfect fifth is gone by the time any of this reaches a wavelength. A single-frequency color mapping is exact. A chord's color mapping, done this way, gives an honest spectrum, an honest sum, and one lost relationship, and any writeup that reports only the sum, or only the spectrum, without saying so, is prettier than it is true.

What the prism insight adds isn't a fix for that loss. It's the reason the sum is the right thing to call "the chord's color" in the first place, rather than a compromise between two equally valid guesses. White isn't a blur that hides three notes. White is what three notes look like to an eye, and the eye is not built to be a cochlea.
