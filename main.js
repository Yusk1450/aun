
let classifier;

let soundModel = 'https://teachablemachine.withgoogle.com/models/-iIY_ZyN4/';

let mic;
// let fft;

let faceImg, topImg, bottomImg, speakImg, quietlyImg;

function preload()
{
	classifier = ml5.soundClassifier(soundModel + 'model.json');

	faceImg = loadImage('images/face.png');
	topImg = loadImage('images/top.png');
	bottomImg = loadImage('images/bottom.png');
	speakImg = loadImage('images/speak.png');
	quietlyImg = loadImage('images/quietly.png');
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
	fill(0, 172, 195);
	noStroke();
	rect(0, 0, windowWidth, windowHeight);

	let volume = mic.getLevel();

	image(topImg, 0, 0, windowWidth, 166*(windowWidth/750));

	const faceImgSize = (windowWidth * 0.7) + ((windowWidth * 0.5) * volume * 1.2);
	image(faceImg, windowWidth/2 - faceImgSize/2, windowHeight/2 - faceImgSize/2, faceImgSize, faceImgSize);

	// if (volume > 0.1)
	// {
	// 	image(speakImg, windowWidth/2 - 114/2, 430, 114, 34);
	// }
	// else
	// {
	// 	image(quietlyImg, windowWidth/2 - 121/2, 448, 121, 127);
	// }
	image(quietlyImg, windowWidth/2 - 121/2, 448, 121, 127);

	image(bottomImg, 0, windowHeight-(414*(windowWidth/750)), windowWidth, 414*(windowWidth/750));

	// let spectrum = fft.analyze();
}

function windowResized()
{
	resizeCanvas(windowWidth, windowHeight);
}

function gotResult(error, results)
{
	// let volume = mic.getLevel();

	$('.result').html(results[0]['label']+'('+results[0]['confidence']+')').css('color', 'black');
	if (results[0]['confidence'] > 0.85)
	{
		console.log(results);
		$('.result').html(results[0]['label']+'('+results[0]['confidence']+')').css('color', 'red');
	}
}

