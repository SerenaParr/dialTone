var xspacing = 8; // Distance between each horizontal location
var w; // Width of entire wave
var theta = 0.0; // Start angle at 0
var amplitude = 75.0; // Height of wave
var period = 500.0; // How many pixels before the wave repeats
var dx; // Value for incrementing x
var yvalues; // Using an array to store height values for the wave

function setup() {
  createCanvas(710, 400);
  w = width + 10;
  dx = (TWO_PI / period) * xspacing;
  yvalues = new Array(floor(w / xspacing));
}

function draw() {
  background(255);
  calcWave();
  renderWave();
}

function calcWave() {
  // Increment theta (try different values for 
  // 'angular velocity' here
  theta += 0.02;

  // For every x value, calculate a y value with sine function
  var x = theta;
  for (var i = 0; i < yvalues.length; i++) {
    yvalues[i] = sin(x) * amplitude;
    x += dx;
  }
}

function renderWave() {
  noStroke();
  fill(15, 140, 30);
  // A simple way to draw the wave with an ellipse at each location
  for (var x = 0; x < yvalues.length; x++) {
    ellipse(x * xspacing, height / 2 + yvalues[x], 10, 10);
  }
}

  var contextClass = (window.AudioContext ||
    window.webkitAudioContext ||
    window.mozAudioContext ||
    window.oAudioContext ||
    window.msAudioContext);

if (contextClass) {
  // Web Audio API is available.
  var context = new contextClass();
}

var oscillator1, oscillator2;

var dialTone = function(freq1, freq2) {

  // merger = context.createChannelMerger(2);

  oscillator1 = context.createOscillator();
  oscillator1.type = 0;
  oscillator1.frequency.value = freq1;
  gainNode = context.createGain ? context.createGain() : context.createGainNode();
  oscillator1.connect(gainNode, 0, 0);
  gainNode.connect(context.destination);
  gainNode.gain.value = .1;
  oscillator1.start ? oscillator1.start(0) : oscillator1.noteOn(0)

  // gainNode.connect(merger,0,1);

  oscillator2 = context.createOscillator();
  oscillator2.type = 0;
  oscillator2.frequency.value = freq2;
  gainNode = context.createGain ? context.createGain() : context.createGainNode();
  oscillator2.connect(gainNode);
  gainNode.connect(context.destination);
  // gainNode.connect(merger,0,0);


  gainNode.gain.value = .1;
  oscillator2.start ? oscillator2.start(0) : oscillator2.noteOn(0)

  // merger.connect(context.destination);


};

function start() {
  if (typeof oscillator1 != 'undefined') oscillator1.disconnect();
  if (typeof oscillator2 != 'undefined') oscillator2.disconnect();
  oscOn(parseFloat(document.getElementById("freq").value), parseFloat(document.getElementById("freq2").value));
}


function stop() {
  oscillator1.disconnect();
  oscillator2.disconnect();
}