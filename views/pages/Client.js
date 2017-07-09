var service = "/";

var skinOne = new Image();
skinOne.src = service + "skinOne.png";
var skinTwo = new Image();
skinTwo.src = service + "skinTwo.png";
var skinThree = new Image();
skinThree.src = service + "skinThree.png";
var skinFour = new Image();
skinFour.src = service + "skinFour.png";

var skin = skinOne;


var stone = new Image();
stone.src = service + "stone.png";
var wood = new Image();
wood.src = service + "wood.png";
var coin = new Image();
coin.src = coin + "coin.png";

var servers = {};
var c = document.getElementById("canvas");
var ctx = c.getContext("2d");
c.width = window.innerWidth;
c.height = window.innerHeight;

var drawGrid = function (x, y, stroke, fill, w, h) {
    ctx.globalAlpha= 1;
    ctx.lineWidth = 0.3;
    ctx.fillStyle = fill;
    ctx.fillRect(x, y, w, h);
    ctx.beginPath();
    var xi = 0;
    var yi = 0;
    for (var i = 0; i < Math.round(w / 100); i++) {
        xi = x + i * 100;
        yi = y + 0;
        ctx.moveTo(xi, yi);
        ctx.lineTo(xi, yi + h);
    }
    ; for (var j = 0; j < Math.round(h / 100); j++) {
        xi = x + 0;
        yi = y + j * 100;
        ctx.moveTo(xi, yi);
        ctx.lineTo(xi + w, yi);
    }
    ; ctx.strokeStyle = stroke;
    ctx.stroke();
};
drawGrid(0, 0, "#FFFFFF", "#000000", c.width, c.height);

var isNight = true;

sleep.onclick = function () {
    if (!isNight) {
        drawGrid(0, 0, "#FFFFFF", "#000000", c.width, c.height);
        isNight = true;
        document.getElementById("sleep").style.color = "black";
        document.getElementById("sleep").style.backgroundColor = "white";
        document.getElementById("sleep").textContent = "Turn Nightmode OFF";
    }
    else {
        drawGrid(0, 0, "#000000", "#FFFFFF", c.width, c.height);
        isNight = false;
        document.getElementById("sleep").style.color = "white";
        document.getElementById("sleep").style.backgroundColor = "black";
        document.getElementById("sleep").textContent = "Turn Nightmode ON";
    }
    
}

btl.onclick = function () {
    skin = skinOne;
    document.getElementById("selimg").src = "skinOneTop.png";
}
btr.onclick = function () {
    skin = skinTwo;
    document.getElementById("selimg").src = "skinTwoTop.png";   
}
bbl.onclick = function () {
    skin = skinThree;
    document.getElementById("selimg").src = "skinThreeTop.png";   
}
bbr.onclick = function () {
    skin = skinFour;
    document.getElementById("selimg").src = "skinFourTop.png";
}

startGame = function () {
    user = {
        x: 250,
        y: 300,
    };

    document.getElementById("menu").style.visibility = "hidden";
    document.getElementById("login").style.visibility = "hidden";
    document.getElementById("nite").style.visibility = "hidden";
    document.getElementById("selected").style.visibility = "hidden";
    document.getElementById("character").style.visibility = "hidden";

    if (!isNight) {
        drawGrid(-4000 - user.x + c.width / 2, -3000 - user.y + c.height / 2, "#FFFFFF", "#000000", 13000, 7000);
        drawGrid(0 - user.x + c.width / 2, 0 - user.y + c.height / 2, "#FFFFFF", "#000000", 5000, 1000);
        
    }
    else {
        drawGrid(-4000 - user.x + c.width / 2, -3000 - user.y + c.height / 2, "#000000", "#FFFFFF", 13000, 7000);
        drawGrid(0 - user.x + c.width / 2, 0 - user.y + c.height / 2, "#000000", "#FFFFFF", 5000, 1000);
        
    }

    
}
play.onclick = function () {
    startGame();
}