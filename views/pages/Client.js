var service = "/";
var inGame = false;

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
    inGame = true;
    var stones = [];
    var woods = [];
    var coins = [];

    var user = {
        x: 250,
        y: 700,
        rot: false
    };
    var mapData = "ssssssssssaaaaaaasssaaaaaaasssaaaaaassssaaaaasssssaaaaaaasssaaaaaaasssaaaaasssssaaaaaassssaaaaaassssaaaaaassssaaaaaassssaaaaasssssaaaaaaasssaaaaaaasssaaaaasssssaaaaaassssaaaaaassssaaaaaassssaaaaaassssaaaaasssssaaaaaaasssaaaaaaasssaaaaasssssaaaaaassssaaaaaassssaaaaaassssaaaaaassssaaaaasssssaaaaaaasssaaaaaaasssaaaaasssssaaaaaassssaaaaaassssaaaaaassssaaaaaassssaaaaasssssaaaaaaasssaaaaaaasssaaaaasssssaaaaaassssaaaaaassssaaaaaassssaaaaaassssaaaaasssssaaaaaaasssaaaaaaasssaaaaasssssaaaaaassssaaaaaassssaaaaaassssaaaaaassssaaaaasssssaaaaaaasssaaaaaaassssssssssss";
    var map = "Hub";

    document.getElementById("menu").style.visibility = "hidden";
    document.getElementById("nite").style.visibility = "hidden";
    document.getElementById("selected").style.visibility = "hidden";
    document.getElementById("character").style.visibility = "hidden";

    if (isNight) {
        drawGrid(-4000 - user.x + c.width / 2, -3000 - user.y + c.height / 2, "#FFFFFF", "#000000", 13000, 7000);
        
    }
    else {
        drawGrid(-4000 - user.x + c.width / 2, -3000 - user.y + c.height / 2, "#000000", "#FFFFFF", 13000, 7000);       
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

    document.onmousemove = function (event) {
        if (inGame) {
            var cx = c.width / 2;
            var mouseX = event.pageX;
            if (cx > mouseX) {
                rot = true;
            } else {
                rot = false;
            }
        }
        return rot;
    }

    document.onkeypress = function (event) {
        switch (event.keyCode) {
            case 68:
                if (inGame) {
                    var move = {
                        direction: "right",
                        v: 1
                    };
                }
                return move;
                break;
            case 83:
                if (inGame) {
                    switch (map) {
                        case "Hub":
                            if (user.x > 550 && user.x < 650) {
                                map = "level1";
                                mapData = "sssssssssssssssssssssaaasaaasssacasaaaassaaasaaaassaaaaaaaassaaaaaassssaaaascaassaasaasaassaaaaaaaasssssswwsssscaaaaaassaaasaasaasaaaaaaaaasaaasaaaaassaasaascassaasaaaaassaaaassssssasaaasaassaaaaasaassaaascaaassaaasaaasssaasaaaaassaaaaasaassasasaaaassaaaaaassssaaaasawbssaasaaawwssaaawacaassaaasaaaassaaasaaaassacasaaaassaaaaaasassaaaaaasassaaasaaaassaaasaaaassaaasssssssaaaaasaassaaasacaassaaaaasaassaaasacaassaaaaasaassaaasaaaassaaaaaaaassaaaaaasassaaaasaaasswwssssssssaaaaaaaassaaaaaaaasssssssssss";
                                user.x = 250;
                                user.y = 700;
                            }
                            break;
                        case "level1":
                            if (user.x > 4850) {
                                map = "Hub";
                                mapData = "ssssssssssaaaaaaasssaaaaaaasssaaaaaassssaaaaasssssaaaaaaasssaaaaaaasssaaaaasssssaaaaaassssaaaaaassssaaaaaassssaaaaaassssaaaaasssssaaaaaaasssaaaaaaasssaaaaasssssaaaaaassssaaaaaassssaaaaaassssaaaaaassssaaaaasssssaaaaaaasssaaaaaaasssaaaaasssssaaaaaassssaaaaaassssaaaaaassssaaaaaassssaaaaasssssaaaaaaasssaaaaaaasssaaaaasssssaaaaaassssaaaaaassssaaaaaassssaaaaaassssaaaaasssssaaaaaaasssaaaaaaasssaaaaasssssaaaaaassssaaaaaassssaaaaaassssaaaaaassssaaaaasssssaaaaaaasssaaaaaaasssaaaaasssssaaaaaassssaaaaaassssaaaaaassssaaaaaassssaaaaasssssaaaaaaasssaaaaaaassssssssssss";
                                user.x = 250;
                                user.y = 700;
                            }
                            break;
                        default:
                            break;
                    }
                }
                break;
            case 65:
                if (inGame) {
                    var move = {
                        direction: "left",
                        v: 1
                    };
                }
                return move;
                break;
            case 87:
                if (inGame) {
                    var move = {
                        direction: "up",
                        v: 3
                    };
                }
                return move;
                break;
            case 39:
                if (inGame) {
                    var move = {
                        direction: "right",
                        v: 1
                    };
                }
                return move;
                break;
            case 40:
                if (inGame) {
                    switch (map) {
                        case "Hub":
                            if (user.x > 550 && user.x < 650) {
                                map = "level1";
                                mapData = "sssssssssssssssssssssaaasaaasssacasaaaassaaasaaaassaaaaaaaassaaaaaassssaaaascaassaasaasaassaaaaaaaasssssswwsssscaaaaaassaaasaasaasaaaaaaaaasaaasaaaaassaasaascassaasaaaaassaaaassssssasaaasaassaaaaasaassaaascaaassaaasaaasssaasaaaaassaaaaasaassasasaaaassaaaaaassssaaaasawbssaasaaawwssaaawacaassaaasaaaassaaasaaaassacasaaaassaaaaaasassaaaaaasassaaasaaaassaaasaaaassaaasssssssaaaaasaassaaasacaassaaaaasaassaaasacaassaaaaasaassaaasaaaassaaaaaaaassaaaaaasassaaaasaaasswwssssssssaaaaaaaassaaaaaaaasssssssssss";
                                user.x = 250;
                                user.y = 700;
                            }
                            break;
                        case "level1":
                            if (user.x > 4850) {
                                map = "Hub";
                                mapData = "ssssssssssaaaaaaasssaaaaaaasssaaaaaassssaaaaasssssaaaaaaasssaaaaaaasssaaaaasssssaaaaaassssaaaaaassssaaaaaassssaaaaaassssaaaaasssssaaaaaaasssaaaaaaasssaaaaasssssaaaaaassssaaaaaassssaaaaaassssaaaaaassssaaaaasssssaaaaaaasssaaaaaaasssaaaaasssssaaaaaassssaaaaaassssaaaaaassssaaaaaassssaaaaasssssaaaaaaasssaaaaaaasssaaaaasssssaaaaaassssaaaaaassssaaaaaassssaaaaaassssaaaaasssssaaaaaaasssaaaaaaasssaaaaasssssaaaaaassssaaaaaassssaaaaaassssaaaaaassssaaaaasssssaaaaaaasssaaaaaaasssaaaaasssssaaaaaassssaaaaaassssaaaaaassssaaaaaassssaaaaasssssaaaaaaasssaaaaaaassssssssssss";
                                user.x = 250;
                                user.y = 700;
                            }
                            break;
                        default:
                            break;
                    }
                }
                break;
            case 37:
                if (inGame) {
                    var move = {
                        direction: "left",
                        v: 1
                    };
                }
                return move;
                break;
            case 38:
                if (inGame) {
                    var move = {
                        direction: "up",
                        v: 3
                    };
                }
                return move;
                break;
        }
    }

    
}

var game = setInterval(function () {
    c.width = window.width;
    c.height = window.height;
    ctx.clearRect(0, 0, c.width, c.height)
    ctx.save();
    if (!inGame) {
        if (isNight) {
            drawGrid(0, 0, "#FFFFFF", "#000000", c.width, c.height);
        }
        else {
            drawGrid(0, 0, "#000000", "#FFFFFF", c.width, c.height);
        }
    } else {
        if (isNight) {
            drawGrid(-4000 - user.x + c.width / 2, -3000 - user.y + c.height / 2, "#FFFFFF", "#000000", 13000, 7000);

        }
        else {
            drawGrid(-4000 - user.x + c.width / 2, -3000 - user.y + c.height / 2, "#000000", "#FFFFFF", 13000, 7000);

        }
    }
    ctx.globalAlpha = 1;

    for (var i in stones) {
        stones[i].draw();
    }
    for (var i in woods) {
        stones[i].draw();
    }
    for (var i in coins) {
        stones[i].draw();
    }
    ctx.restore();


}, 40)

play.onclick = function () {
    startGame();
}