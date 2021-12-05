
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

	$.ajax({
		type: 'post',
		url: 'http://yusk1450.pythonanywhere.com/',
		data: {'name': '考えてるよ'},
		async: false,
		cache: false,
		dataType: 'text',
		scriptCharaset: 'utf-8'
	})
	.then(
		function(data)
		{
			console.log(data);
			setTimeout(function()
			{
				// var audio = new Audio('http://10.23.16.61:8888/Prototype/aun/output.mp3?cb=' + new Date().getTime());
				// audio.load();
				// audio.play();
			}, 1000);
		},
		function(error)
		{
			console.log('error');
			console.log(error);
		}
	);
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

	// if (volume > 0.1)
	// {
	// 	image(speakImg, windowWidth/2 - 114/2, 430, 114, 34);
	// }
	// else
	// {
	// 	image(quietlyImg, windowWidth/2 - 121/2, 448, 121, 127);
	// }
	image(quietlyImg, windowWidth/2 - 121/2, windowHeight/2 + 120, 121, 124);

	image(bottomImg, 0, windowHeight-(426*(windowWidth/750)), windowWidth, 426*(windowWidth/750));

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
		if (results[0]['label'] == 'バックグラウンド ノイズ')
		{
			return;
		}

		if (results[0]['label'] == 'think')
		{
			$.ajax({
				type: 'post',
				url: 'http://yusk1450.pythonanywhere.com/',
				data: {'name': '考えてるよ'},
				async: false,
				cache: false,
				dataType: 'text',
				scriptCharaset: 'utf-8'
			})
			.then(
				function(data)
				{
					setTimeout(function()
					{
						// var audio = new Audio('http://10.23.16.61:8888/Prototype/aun/output.mp3?cb=' + new Date().getTime());
						// audio.load();
						// audio.play();
					}, 1000);
				},
				function(error)
				{
					console.log('error');
					console.log(error);
				}
			);
		}
		else if (results[0]['label'] == 'question')
		{
			$.ajax({
				type: 'post',
				url: 'http://yusk1450.pythonanywhere.com/',
				data: {'name': 'なに？'},
				async: false,
				cache: false,
				dataType: 'text',
				scriptCharaset: 'utf-8'
			})
			.then(
				function(data)
				{
					setTimeout(function()
					{
						// var audio = new Audio('http://10.23.16.61:8888/Prototype/aun/output.mp3?cb=' + new Date().getTime());
						// audio.load();
						// audio.play();
					}, 1000);
				},
				function()
				{
					console.log('error');
				}
			);
		}
		else if (results[0]['label'] == 'ok')
		{
			$.ajax({
				type: 'post',
				url: 'http://yusk1450.pythonanywhere.com/',
				data: {'name': 'そうだね'},
				async: false,
				cache: false,
				dataType: 'text',
				scriptCharaset: 'utf-8'
			})
			.then(
				function(data)
				{
					setTimeout(function()
					{
						// var audio = new Audio('http://10.23.16.61:8888/Prototype/aun/output.mp3?cb=' + new Date().getTime());
						// audio.load();
						// audio.play();
					}, 1000);
				},
				function()
				{
					console.log('error');
				}
			);
		}
		else if (results[0]['label'] == 'please')
		{
			$.ajax({
				type: 'post',
				url: 'http://yusk1450.pythonanywhere.com/',
				data: {'name': 'これ'},
				async: false,
				cache: false,
				dataType: 'text',
				scriptCharaset: 'utf-8'
			})
			.then(
				function(data)
				{
					setTimeout(function()
					{
						// var audio = new Audio('http://10.23.16.61:8888/Prototype/aun/output.mp3?cb=' + new Date().getTime());
						// audio.load();
						// audio.play();
					}, 1000);
				},
				function()
				{
					console.log('error');
				}
			);
		}

		console.log(results);
		$('.result').html(results[0]['label']+'('+results[0]['confidence']+')').css('color', 'red');
	}
}

