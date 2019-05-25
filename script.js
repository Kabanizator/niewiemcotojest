var imgs = [];
var gameImgs = [];
var selectedImgs = [];
var score = 0;
var moves = 0;
var maxMoves = 5;

generateImgs();
generateTable();
updateScore();

setTimeout(HideImgs, 2000);

function HideImgs() {
	var imgsToHide = document.getElementsByClassName('scored');
	if (imgsToHide.length > 0) {
		var len = imgsToHide.length;
		for (var i = 0; i < len; i++) {
			imgsToHide[0].className = "hidden";
		}
	}
}

function updateScore() {
    document.getElementById('score').innerHTML = "Wynik: " + score;
    document.getElementById('moves').innerHTML = "Pozostałe ruchy: " + (maxMoves-moves);

    if (maxMoves - moves == 0) {
        document.getElementById('score').innerHTML = "Wynik: " + score + " PRZEGRAŁEŚ";
    }
	else if(score==8)
	{
        document.getElementById('score').innerHTML = "Wynik: " + score + " WYGRAŁEŚ";
	}
}

function generateImgs() {
	imgs = [
	'https://denarium.com/wp-content/uploads/2018/08/Denarium-1-2-BTC-Gold-2018-front.jpg',
	'https://cdn.images.express.co.uk/img/dynamic/22/590x/Litecoin-price-news-What-is-the-price-of-Litecoin-today-Is-LTC-crashing-946990.jpg',
	'https://i1.memy.pl/obrazki/8f17870_siema.jpg',
	'https://st2.depositphotos.com/3489481/6802/i/950/depositphotos_68025403-stock-photo-man-shrugging-shoulders-who-cares.jpg',
	'http://cdn7.beszamel.smcloud.net/t/thumbs/640/480/1/user_photos/shutterstock_691297591.jpg',
	'https://fd204d43461da5218393-0b3ca8ff9ad90f3780bc876f4d2d02ae.ssl.cf1.rackcdn.com/uploads/2018/07/AV_Landscape-Hero-Contour-2993-1276x800.jpg',
	'https://amp.businessinsider.com/images/592f4169b74af41b008b5977-750-563.jpg',
	'http://dracul.kill.pl/~bielu/astronomia/slonce/000251.jpg',
	];
	
	imgs = shuffle(imgs);
	
	for (var i = 0; i < 8; i++){
	gameImgs.push(imgs[i]);
	gameImgs.push(imgs[i]);
	}
	
	gameImgs = shuffle(gameImgs);
}

function generateTable() {
	var table = document.getElementById('game_table');
	var k = 0;
	
	for (var i = 0; i < 4; i++)
	{
		var row = table.insertRow(i);
		for (var j = 0; j < 4; j++)
		{
			var cell = row.insertCell(j);
			var img = document.createElement('img');
			img.id = i.toString() + j.toString();
			img.src = gameImgs[k];
			img.className = "scored";
			img.addEventListener('click',
			function (obj) {selectImg(obj.currentTarget)}, false);
			cell.appendChild(img);
			k++;
		}
	}
}

function selectImg(img) {
	if (img.className == "hidden") 
	{
		img.className = "selected";
		selectedImgs.push(img);
		if (selectedImgs.length == 2) 
		{
			if (areTheSame(selectedImgs[0], selectedImgs[1])) 
			{
				setScored(selectedImgs[0],selectedImgs[1]);
			}
			else 
            {
                moves++;
                updateScore();
                if (maxMoves - moves < 1) {

                } else {
                    setTimeout(function () {
                        selectedImgs[0].className = "hidden";
                        selectedImgs[1].className = "hidden";
                        selectedImgs = []
                    }, 500);
                }
			}
		}
	}
}

function setScored(img1, img2) {
	img1.className = "scored";
	img2.className = "scored";
	score++;
	updateScore();
	selectedImgs = [];
}

function areTheSame(img1, img2) {
	return img1.src == img2.src;
}

function shuffle(array) {
	return array.sort(() => Math.random() - 0.5);
}