
let screenWidth = 400;
let screenHeight = 400;

let classifier;

let soundModel = 'https://teachablemachine.withgoogle.com/models/Qzsrq6QQp/';

let mic;
let fft;

function preload()
{
	classifier = ml5.soundClassifier(soundModel + 'model.json');
}

function setup()
{
	createCanvas(screenWidth, screenHeight);

	classifier.classify(gotResult);

	mic = new p5.AudioIn();
	mic.start();

	fft = new p5.FFT();
	fft.setInput(mic);
}

function draw()
{
	background(220);

	let spectrum = fft.analyze();

	console.log(spectrum);
}

function gotResult(error, results)
{
}
