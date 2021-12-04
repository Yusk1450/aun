
let classifier;

let soundModel = 'https://teachablemachine.withgoogle.com/models/-iIY_ZyN4/';

let mic;
// let fft;

function preload()
{
	classifier = ml5.soundClassifier(soundModel + 'model.json');
}

function setup()
{
	createCanvas(windowWidth, windowHeight);

	classifier.classify(gotResult);

	mic = new p5.AudioIn();
	mic.start();

	// fft = new p5.FFT();
	// fft.setInput(mic);
}

function draw()
{
	background(220);

	// let spectrum = fft.analyze();
}

function windowResized()
{
	resizeCanvas(windowWidth, windowHeight);
}

function gotResult(error, results)
{
	if (results[0]['confidence'] > 0.90)
	{
		console.log(results);
		$('.result').html(results[0]['label']+'('+results[0]['confidence']+')');
	}
}

