
document.addEventListener('click', function() {
	// var audio = new Audio('./sounds/think.mp3?cb=' + new Date().getTime());
	// audio.load();
	// audio.play();
	let song = loadSound('sounds/ok.mp3');
	song.play();
});


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

	image(topImg, 0, 0, windowWidth, 366*(windowWidth/750));

	const faceImgSize = (windowWidth * 0.7) + ((windowWidth * 0.5) * volume * 1.2);
	image(faceImg, windowWidth/2 - faceImgSize/2, windowHeight/2 - faceImgSize/2, faceImgSize, faceImgSize);

	image(quietlyImg, windowWidth/2 - 121/2, windowHeight/2 + 45, 121, 124);

	image(bottomImg, 0, windowHeight-(426*(windowWidth/750)), windowWidth, 426*(windowWidth/750));

	// let spectrum = fft.analyze();
}

function windowResized()
{
	resizeCanvas(windowWidth, windowHeight);
}

function gotResult(error, results)
{
	$('.result').html(results[0]['label']+'('+results[0]['confidence']+')').css('color', 'black');
	if (results[0]['confidence'] > 0.85)
	{
		if (results[0]['label'] == 'バックグラウンド ノイズ')
		{
			return;
		}

		if (results[0]['label'] == 'think')
		{
			var audio = new Audio('./sounds/think.mp3?cb=' + new Date().getTime());
			// audio.load();
			audio.play();
		}
		else if (results[0]['label'] == 'question')
		{
			var audio = new Audio('./sounds/question.mp3?cb=' + new Date().getTime());
			// audio.load();
			audio.play();
		}
		else if (results[0]['label'] == 'ok')
		{
			var audio = new Audio('./sounds/ok.mp3?cb=' + new Date().getTime());
			// audio.load();
			audio.play();
		}
		else if (results[0]['label'] == 'please')
		{
			var audio = new Audio('./sounds/please.mp3?cb=' + new Date().getTime());
			// audio.load();
			audio.play();
		}

		console.log(results);
		$('.result').html(results[0]['label']+'('+results[0]['confidence']+')').css('color', 'red');
	}
}

