// source code: https://github.com/DarthVanger/js-sine-wave-synthesizer/blob/master/index.js

export default class SineWavePlayer {
  constructor({ sampleRate = 44100, hz = 440, loop = false }) {
    let sineWaveArray = new Float32Array(sampleRate);
    // fill all 44100 elements of array with Math.sin() values
    for (let i = 0; i < sineWaveArray.length; i++) {
      sineWaveArray[i] = Math.sin((i * Math.PI * 8) / hz);
    }

    this.source = this.#makeSource({ array: sineWaveArray, sampleRate });
    this.source.loop = loop;
  }

  #makeSource({ array, sampleRate }) {
    // We have to start with creating AudioContext
    const audioContext = new AudioContext({ sampleRate });

    // create audio buffer of the same length as our array
    const audioBuffer = audioContext.createBuffer(1, array.length, sampleRate);
    // this copies our sine wave to the audio buffer
    audioBuffer.copyToChannel(array, 0);
    // some JavaScript magic to actually play the sound
    const source = audioContext.createBufferSource();
    source.connect(audioContext.destination);

    source.buffer = audioBuffer;
    return source;
  }

  play() {
    console.log("play sound called");
    return this.source.start();
  }

  stop() {
    return this.source.stop();
  }
}
