//
// Sonant-X
//
// Copyright (c) 2014 Nicolas Vanhoren
//
// Sonant-X is a fork of js-sonant by Marcus Geelnard and Jake Taylor. It is
// still published using the same license (zlib license, see below).
//
// Copyright (c) 2011 Marcus Geelnard
// Copyright (c) 2008-2009 Jake Taylor
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//    claim that you wrote the original software. If you use this software
//    in a product, an acknowledgment in the product documentation would be
//    appreciated but is not required.
//
// 2. Altered source versions must be plainly marked as such, and must not be
//    misrepresented as being the original software.
//
// 3. This notice may not be removed or altered from any source
//    distribution.


const WAVE_SPS = 44100;                    // Samples per second
const WAVE_CHAN = 2;                       // Channels
const MAX_TIME = 33; // maximum time, in millis, that the generator can use consecutively

let audioCtx;

// Oscillators
function osc_sin(value)
{
    return sin(value * 6.283184);
}

function osc_square(value) {
    return osc_sin(value) < 0 ? -1 : 1;
}

function osc_saw(value)
{
    return (value % 1) - 0.5;
}

function osc_tri(value)
{
    const v2 = (value % 1) * 4;
    return v2 < 2 ? v2 - 1 : 3 - v2;
}

// Array of oscillator functions
const oscillators = [
    osc_sin,
    osc_square,
    osc_saw,
    osc_tri
];

function getnotefreq(n)
{
    return 0.00390625 * pow(1.059463094, n - 128);
}

function genBuffer(waveSize, callBack) {
    setTimeout(() => {
        // Create the channel work buffer
        var buf = new Uint8Array(waveSize * WAVE_CHAN * 2);
        var b = buf.length - 2;
        var iterate = () => {
            var begin = new Date();
            var count = 0;
            while(b >= 0)
            {
                buf[b] = 0;
                buf[b + 1] = 128;
                b -= 2;
                count += 1;
                if (count % 1000 === 0 && (new Date() - begin) > MAX_TIME) {
                    setTimeout(iterate, 0);
                    return;
                }
            }
            setTimeout(() => callBack(buf), 0);
        };
        setTimeout(iterate, 0);
    }, 0);
}

function applyDelay(chnBuf, waveSamples, instr, rowLen, callBack) {
    const p1 = (instr.fx_delay_time * rowLen) >> 1;
    const t1 = instr.fx_delay_amt / 255;

    let n1 = 0;
    const iterate = () => {
        const beginning = new Date();
        let count = 0;
        while (n1 < waveSamples - p1) {
            var b1 = 4 * n1;
            var l = 4 * (n1 + p1);

            // Left channel = left + right[-p1] * t1
            var x1 = chnBuf[l] + (chnBuf[l+1] << 8) +
                (chnBuf[b1+2] + (chnBuf[b1+3] << 8) - 32768) * t1;
            chnBuf[l] = x1 & 255;
            chnBuf[l+1] = (x1 >> 8) & 255;

            // Right channel = right + left[-p1] * t1
            x1 = chnBuf[l+2] + (chnBuf[l+3] << 8) +
                (chnBuf[b1] + (chnBuf[b1+1] << 8) - 32768) * t1;
            chnBuf[l+2] = x1 & 255;
            chnBuf[l+3] = (x1 >> 8) & 255;
            ++n1;
            count += 1;
            if (count % 1000 === 0 && (new Date() - beginning) > MAX_TIME) {
                setTimeout(iterate, 0);
                return;
            }
        }
        setTimeout(callBack, 0);
    };
    setTimeout(iterate, 0);
}

class AudioGenerator {

    constructor(mixBuf) {
        this.mixBuf = mixBuf;
        this.waveSize = mixBuf.length / WAVE_CHAN / 2;
    }

    getWave() {
        const mixBuf = this.mixBuf;
        const waveSize = this.waveSize;
        // Local variables
        let b, k, x, wave, l1, l2, y;

        // Turn critical object properties into local variables (performance)
        const waveBytes = waveSize * WAVE_CHAN * 2;

        // Convert to a WAVE file (in a binary string)
        l1 = waveBytes - 8;
        l2 = l1 - 36;
        wave = String.fromCharCode(82,73,70,70,
                                   l1 & 255,(l1 >> 8) & 255,(l1 >> 16) & 255,(l1 >> 24) & 255,
                                   87,65,86,69,102,109,116,32,16,0,0,0,1,0,2,0,
                                   68,172,0,0,16,177,2,0,4,0,16,0,100,97,116,97,
                                   l2 & 255,(l2 >> 8) & 255,(l2 >> 16) & 255,(l2 >> 24) & 255);
        b = 0;
        while (b < waveBytes) {
            // This is a GC & speed trick: don't add one char at a time - batch up
            // larger partial strings
            x = "";
            for (k = 0; k < 256 && b < waveBytes; ++k, b += 2)
            {
                // Note: We amplify and clamp here
                y = 4 * (mixBuf[b] + (mixBuf[b+1] << 8) - 32768);
                y = y < -32768 ? -32768 : (y > 32767 ? 32767 : y);
                x += String.fromCharCode(y & 255, (y >> 8) & 255);
            }
            wave += x;
        }
        return wave;
    }

    getAudioBuffer(callBack) {
        if (!audioCtx) {
            audioCtx = new AudioContext();
        }

        const mixBuf = this.mixBuf;
        const waveSize = this.waveSize;

        const buffer = audioCtx.createBuffer(WAVE_CHAN, this.waveSize, WAVE_SPS); // Create Mono Source Buffer from Raw Binary
        const lchan = buffer.getChannelData(0);
        const rchan = buffer.getChannelData(1);
        let b = 0;
        const iterate = () => {
            var beginning = new Date();
            var count = 0;
            while (b < waveSize) {
                var y = 4 * (mixBuf[b * 4] + (mixBuf[(b * 4) + 1] << 8) - 32768);
                y = y < -32768 ? -32768 : (y > 32767 ? 32767 : y);
                lchan[b] = y / 32768;
                y = 4 * (mixBuf[(b * 4) + 2] + (mixBuf[(b * 4) + 3] << 8) - 32768);
                y = y < -32768 ? -32768 : (y > 32767 ? 32767 : y);
                rchan[b] = y / 32768;
                b += 1;
                count += 1;
                if (count % 1000 === 0 && new Date() - beginning > MAX_TIME) {
                    setTimeout(iterate, 0);
                    return;
                }
            }
            setTimeout(() => callBack(buffer), 0);
        };
        setTimeout(iterate, 0);
    }
}

class SoundGenerator {

    constructor(instr, rowLen) {
        this.instr = instr;
        this.rowLen = rowLen || 5605;

        this.osc_lfo = oscillators[instr.lfo_waveform];
        this.osc1 = oscillators[instr.osc1_waveform];
        this.osc2 = oscillators[instr.osc2_waveform];
        this.attack = instr.env_attack;
        this.sustain = instr.env_sustain;
        this.release = instr.env_release;
        this.panFreq = pow(2, instr.fx_pan_freq - 8) / this.rowLen;
        this.lfoFreq = pow(2, instr.lfo_freq - 8) / this.rowLen;
    }

    genSound(n, chnBuf, currentpos) {
        var c1 = 0;
        var c2 = 0;

        // Precalculate frequencues
        var o1t = getnotefreq(n + (this.instr.osc1_oct - 8) * 12 + this.instr.osc1_det) * (1 + 0.0008 * this.instr.osc1_detune);
        var o2t = getnotefreq(n + (this.instr.osc2_oct - 8) * 12 + this.instr.osc2_det) * (1 + 0.0008 * this.instr.osc2_detune);

        // State variable init
        var q = this.instr.fx_resonance / 255;
        var low = 0;
        var band = 0;
        for (var j = this.attack + this.sustain + this.release - 1; j >= 0; --j)
        {
            let k = j + currentpos;

            // LFO
            const lfor = this.osc_lfo(k * this.lfoFreq) * this.instr.lfo_amt / 512 + 0.5;

            // Envelope
            let e = 1;
            if (j < this.attack)
                e = j / this.attack;
            else if (j >= this.attack + this.sustain)
                e -= (j - this.attack - this.sustain) / this.release;

            // Oscillator 1
            var t = o1t;
            if (this.instr.lfo_osc1_freq) t += lfor;
            if (this.instr.osc1_xenv) t *= e * e;
            c1 += t;
            var rsample = this.osc1(c1) * this.instr.osc1_vol;

            // Oscillator 2
            t = o2t;
            if (this.instr.osc2_xenv) t *= e * e;
            c2 += t;
            rsample += this.osc2(c2) * this.instr.osc2_vol;

            // Noise oscillator
            if(this.instr.noise_fader) rsample += (2*random()-1) * this.instr.noise_fader * e;

            rsample *= e / 255;

            // State variable filter
            var f = this.instr.fx_freq;
            if(this.instr.lfo_fx_freq) f *= lfor;
            f = 1.5 * sin(f * 3.141592 / WAVE_SPS);
            low += f * band;
            var high = q * (rsample - band) - low;
            band += f * high;
            switch(this.instr.fx_filter)
            {
                case 1: // Hipass
                    rsample = high;
                    break;
                case 2: // Lopass
                    rsample = low;
                    break;
                case 3: // Bandpass
                    rsample = band;
                    break;
                case 4: // Notch
                    rsample = low + high;
                    break;
                default:
            }

            // Panning & master volume
            t = osc_sin(k * this.panFreq) * this.instr.fx_pan_amt / 512 + 0.5;
            rsample *= 39 * this.instr.env_master;

            // Add to 16-bit channel buffer
            k = k * 4;
            if (k + 3 < chnBuf.length) {
                var x = chnBuf[k] + (chnBuf[k+1] << 8) + rsample * (1 - t);
                chnBuf[k] = x & 255;
                chnBuf[k+1] = (x >> 8) & 255;
                x = chnBuf[k+2] + (chnBuf[k+3] << 8) + rsample * t;
                chnBuf[k+2] = x & 255;
                chnBuf[k+3] = (x >> 8) & 255;
            }
        }
    }

    createAudioBuffer(n, callBack) {
        this.getAudioGenerator(n, ag => {
            ag.getAudioBuffer(callBack);
        });
    }

    getAudioGenerator(n, callBack) {
        var bufferSize = (this.attack + this.sustain + this.release - 1) + (32 * this.rowLen);
        var self = this;
        genBuffer(bufferSize, buffer => {
            self.genSound(n, buffer, 0);
            applyDelay(buffer, bufferSize, self.instr, self.rowLen, function() {
                callBack(new AudioGenerator(buffer));
            });
        });
    }
}

class MusicGenerator {

    constructor(song) {
        this.song = song;
        // Wave data configuration
        this.waveSize = WAVE_SPS * song.songLen; // Total song size (in samples)
    }

    generateTrack(instr, mixBuf, callBack) {
        genBuffer(this.waveSize, chnBuf => {
            // Preload/precalc some properties/expressions (for improved performance)
            var waveSamples = this.waveSize,
                waveBytes = this.waveSize * WAVE_CHAN * 2,
                rowLen = this.song.rowLen,
                endPattern = this.song.endPattern,
                soundGen = new SoundGenerator(instr, rowLen);

            let currentpos = 0;
            let p = 0;
            let row = 0;
            const recordSounds = () => {
                var beginning = new Date();
                while (true) {
                    if (row === 32) {
                        row = 0;
                        p += 1;
                        continue;
                    }
                    if (p === endPattern - 1) {
                        setTimeout(delay, 0);
                        return;
                    }
                    var cp = instr.p[p];
                    if (cp) {
                        var n = instr.c[cp - 1].n[row];
                        if (n) {
                            soundGen.genSound(n, chnBuf, currentpos);
                        }
                    }
                    currentpos += rowLen;
                    row += 1;
                    if (new Date() - beginning > MAX_TIME) {
                        setTimeout(recordSounds, 0);
                        return;
                    }
                }
            };

            const delay = () => applyDelay(chnBuf, waveSamples, instr, rowLen, finalize);

            var b2 = 0;
            const finalize = () => {
                const beginning = new Date();
                let count = 0;

                // Add to mix buffer
                while(b2 < waveBytes) {
                    var x2 = mixBuf[b2] + (mixBuf[b2+1] << 8) + chnBuf[b2] + (chnBuf[b2+1] << 8) - 32768;
                    mixBuf[b2] = x2 & 255;
                    mixBuf[b2+1] = (x2 >> 8) & 255;
                    b2 += 2;
                    count += 1;
                    if (count % 1000 === 0 && (new Date() - beginning) > MAX_TIME) {
                        setTimeout(finalize, 0);
                        return;
                    }
                }
                setTimeout(callBack, 0);
            };
            setTimeout(recordSounds, 0);
        });
    }

    getAudioGenerator(callBack) {
        genBuffer(this.waveSize, mixBuf => {
            let t = 0;
            const recu = () => {
                if (t < this.song.songData.length) {
                    t += 1;
                    this.generateTrack(this.song.songData[t - 1], mixBuf, recu);
                } else {
                    callBack(new AudioGenerator(mixBuf));
                }
            };
            recu();
        });
    }

    createAudioBuffer(callBack) {
        this.getAudioGenerator(ag => ag.getAudioBuffer(callBack));
    }
}
