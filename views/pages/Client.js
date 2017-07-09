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
coin.src = service + "coin.png";

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

    var stones = [];
    var woods = [];
    var coins = [];

    var user = {
        x: 250,
        y: 700,
    };
    mapData = "ssssssssssaaaaaaasssaaaaaaasssaaaaaassssaaaaasssssaaaaaaasssaaaaaaasssaaaaasssssaaaaaassssaaaaaassssaaaaaassssaaaaaassssaaaaasssssaaaaaaasssaaaaaaasssaaaaasssssaaaaaassssaaaaaassssaaaaaassssaaaaaassssaaaaasssssaaaaaaasssaaaaaaasssaaaaasssssaaaaaassssaaaaaassssaaaaaassssaaaaaassssaaaaasssssaaaaaaasssaaaaaaasssaaaaasssssaaaaaassssaaaaaassssaaaaaassssaaaaaassssaaaaasssssaaaaaaasssaaaaaaasssaaaaasssssaaaaaassssaaaaaassssaaaaaassssaaaaaassssaaaaasssssaaaaaaasssaaaaaaasssaaaaasssssaaaaaassssaaaaaassssaaaaaassssaaaaaassssaaaaasssssaaaaaaasssaaaaaaassssssssssss";

    document.getElementById("menu").style.visibility = "hidden";
    document.getElementById("nite").style.visibility = "hidden";
    document.getElementById("selected").style.visibility = "hidden";
    document.getElementById("character").style.visibility = "hidden";

    if (isNight) {
        drawGrid(-4000 - user.x + c.width / 2, -3000 - user.y + c.height / 2, "#FFFFFF", "#000000", 13000, 7000);
        drawGrid(0 - user.x + c.width / 2, 0 - user.y + c.height / 2, "#FFFFFF", "#000000", 5000, 1000);
        
    }
    else {
        drawGrid(-4000 - user.x + c.width / 2, -3000 - user.y + c.height / 2, "#000000", "#FFFFFF", 13000, 7000);
        drawGrid(0 - user.x + c.width / 2, 0 - user.y + c.height / 2, "#000000", "#FFFFFF", 5000, 1000);
        
    }

    var map = new Array(50);
    for (var i = 0; i < 50; i++) {
        map[i] = new Array(10);
    }

    createObject = function(type, x, y) {
        switch (type) {
            case 0:
                var obj = {
                    x: x,
                    y: y,
                    type: stone
                };
                obj.draw = function () {
                    if (stone.complete) {
                        ctx.drawImage(stone, obj.x - 50 - user.x + c.width / 2, obj.y - 50 - user.y + c.height / 2, 100, 100);
                    }
                }
                return obj;
                break;
            case 1:
                var obj = {
                    x: x,
                    y: y,
                    type: wood
                };
                obj.draw = function () {
                    if (wood.complete) {
                        ctx.drawImage(wood, obj.x - 50 - user.x + c.width / 2, obj.y - 50 - user.y + c.height / 2, 100, 100);
                    }
                }
                return obj;
                break;
            case 2:
                var obj = {
                    x: x,
                    y: y,
                    type: coin
                };
                obj.draw = function () {
                    if (coin.complete) {
                        ctx.drawImage(coin, obj.x - 50 - user.x + c.width / 2, obj.y - 50 - user.y + c.height / 2, 100, 100);
                    }
                }
                return obj;
                break;
            default:
                break;
        }
    }
    var initialize = 0;
    for (var i = 0; i < 50; i++) {
        for (var j = 0; j < 10; j++) {
            switch (mapData.charAt(initialize)) {
                case "s":
                    stones.push(createObject(0, 50 + 100 * i, 50 + 100 * j));
                    break;
                case "w":
                    woods.push(createObject(1, 50 + 100 * i, 50 + 100 * j));
                    break;
                case "c":
                    coins.push(createObject(2, 50 + 100 * i, 50 + 100 * j));
                    break;
                default:
                    break;
            }
            initialize++
        }
    }
}
play.onclick = function () {
    startGame();
}