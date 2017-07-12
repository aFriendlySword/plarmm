var service = "/";
var inGame = false;
var version = "1.1.0";

if (typeof (Storage) !== "undefined") {
    if (localStorage.userdata == null) {
        if ((localStorage.version == undefined) || (atob(JSON.parse(localStorage.version)) !== version)) {
            localStorage.setItem("userdata", "test");
            localStorage.setItem("playedbefore", "test");
        } 

    } 
    
}

var display = "times";


var instr = new Image();
instr.src = service + "instructions.png";
var instr2 = new Image();
instr2.src = service + "instructions2.png";
var instr3 = new Image();
instr3.src = service + "instructions3.png";
var instr4 = new Image();
instr4.src = service + "instructions4.png";
var instr5 = new Image();
instr5.src = service + "instructions5.png";

var skinOne = new Image();
skinOne.src = service + "skinOne.png";
var skinTwo = new Image();
skinTwo.src = service + "skinTwo.png";
var skinThree = new Image();
skinThree.src = service + "skinThree.png";
var skinFour = new Image();
skinFour.src = service + "skinFour.png";

var skin = skinOne;

var mapDataHub = "sssssssssssaaaaaaasssaaaaaaasssaaaaaaasssaaaaaassssaaaaasssssaaaaaaasssaaaaaaasssaaaaasssssaaaaaassssaaaaaassssaaaaaassssaaaaaassssaaaaasssssaaaaaaasssaaaaaaasssaaaaasssssaaaaaassssaaaaaassssaaaaaassssaaaaaassssaaaaasssssaaaaaaasssaaaaaaasssaaaaasssssaaaaaassssaaaaaassssaaaaaassssaaaaaassssaaaaasssssaaaaaaasssaaaaaaasssaaaaasssssaaaaaassssaaaaaassssaaaaaassssaaaaaassssaaaaasssssaaaaaaasssaaaaaaasssaaaaasssssaaaaaassssaaaaaassssaaaaaassssaaaaaassssaaaaasssssaaaaaaasssaaaaaaasssaaaaassssssssssssss";
var mapDataLevel1 = "sssssssssssssssssssssaaasaaasssacasaaaassaaasaaaassaaaaaaaassaaaaaassssaaaascaassaasaasaassaaaaaaaasssssswwsssscaasaaasssaaaaaasasaaasaaaaasaaaaaasaasaaaaasacasaaasaaaaassaaaassssssasaaasaassaaaaasaassaaascaaassaaasaaasssaasaaaaassaaaaasaassasasaaaassaaaaaassssaaaasawjssaasaaawwssaaawacaassaaasaaaassaaasaaaassacasaaaassaaaaaasassaaaaaasassaaasaaaassaaasaaaassaaasssssssaaaaasaassaaasacaassaaaaasaassaaasacaassaaaaasaassaaasaaaassaaaaaaaassaaaaaasassaaaasaaasswwssssssssaaaaaaaassaaaaaaaasssssssssss";
var mapDataLevel2 = "sssssssssssaaaacawjssaaaaaaawssaaaaaaaassaaaaaaaassaaaaasssssaaaaaaaalsaaaaaassssaaaaaaaalsaaaaaaasssaaaaaaaassaaaaaaaassaaacaaasssaaaaaassssaaaaaaasssaaaaaaaassaaaaaasassaaaaasaassaacasaaassaaaaaaaassaaaaaaaalsaassaaaalsaaaaaaaassaaaaaassssaaaaaaacsssssswwssssacsaaassssaaaaaaasssaaasaaaassaaaaaasassaaaaaaaalsaaaasaaalsaaaaaaaalsaaaaaasalsaaaaaaaalsaaaasaaalaaasaaaaalaaaaaaaaalaaaaaaaaalaaaaaaaaalsaaaaaaasssaaaaasaassaaaaaaaalsaaaaaasassaaaaaaaassaaaaasssssaaaassssssaaaaaaaassaacaaaaasssssssssss";

var stone = new Image();
stone.src = service + "stone.png";
var wood = new Image();
wood.src = service + "wood.png";
var coin = new Image();
coin.src = service + "coin.png";
var jumpboost = new Image();
jumpboost.src = service + "jumpboost.png";
var lava = new Image();
lava.src = service + "lava.png";

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

btnswitch.onclick = function() {
    if (display == "times") {
        display = "coins";
        document.getElementById("switch").style.right = "155px";
    } else {
        display = "times";
        document.getElementById("switch").style.right = "0px";
    }
}

var stones = [];
var woods = [];
var coins = [];
var jumpboosts = [];
var lavas = [];
var user = {
    level1: 0,
    level1time: 0,
    level2: 0,
    level2time: 0,
    level3: 0,
    level3time: 0,
    level4: 0,
    level4time: 0,
    level5: 0,
    level5time: 0,
    level6: 0,
    level6time: 0,
    coins: 0,
    jump: 20,
    x: 250,
    y: 695,
    rot: false
};


var moveleft = 0;
var moveright = 0;
var moveup = 0;
var jumptime = 0;
var runtime = 0;

const HUB = 00;
const LEVEL1 = 01;
const LEVEL2 = 02;
const LEVEL3 = 03;
const LEVEL4 = 04;
const LEVEL5 = 05;
const LEVEL6 = 06;

var mapData = mapDataHub;
var currentMap = HUB;

var finishedTut = false;

if (typeof (Storage) !== "undefined") {
    if (!(localStorage.userdata == "test")) {
        try {
            var userdata = (JSON.parse(atob(localStorage.userdata)));
            var tut = atob(JSON.parse(localStorage.playedbefore));
            var last = parseInt(atob(JSON.parse(localStorage.lastmap)));
            var lastData = atob(JSON.parse(localStorage.lastmapData));
            var lastTime = atob(JSON.parse(localStorage.time));
            var healthArr = JSON.parse(atob(localStorage.health));

            user.level1 = userdata.level1;
            user.level1time = userdata.level1time;
            user.level2 = userdata.level2;
            user.level2time = userdata.level2time;
            user.level3 = userdata.level3;
            user.level3time = userdata.level3time;
            user.level4 = userdata.level4;
            user.level4time = userdata.level4time;
            user.level5 = userdata.level5;
            user.level5time = userdata.level5time;
            user.level6 = userdata.level6;
            user.level6time = userdata.level6time;
            user.coins = userdata.coins;
            user.jump = userdata.jump;
            user.x = userdata.x;
            user.y = userdata.y;
            user.rot = userdata.rot;
            finishedTut = tut;
            currentMap = last;
            mapData = lastData;
            runtime = lastTime;            
        }
        catch (err) {
            localStorage.userdata = "test";
        }
        
    }
}

showInstructions = function () {
    if (!finishedTut) {
        if (currentMap == HUB) {
            ctx.drawImage(instr, 200 - user.x + c.width / 2, 400 - user.y + + c.height / 2, 200, 200);
            ctx.drawImage(instr2, 600 - user.x + c.width / 2, 200 - user.y + + c.height / 2, 200, 200);
        } else if (currentMap == LEVEL1) {
            ctx.drawImage(instr3, 500 - user.x + c.width / 2, 200 - user.y + + c.height / 2, 300, 100);
            ctx.drawImage(instr4, 1100 - user.x + c.width / 2, 550 - user.y + + c.height / 2, 300, 100);
            ctx.drawImage(instr5, 2800 - user.x + c.width / 2, 800 - user.y + + c.height / 2, 300, 100);
        }
    }   
}



startGame = function () {
    inGame = true;

    document.getElementById("menu").style.visibility = "hidden";
    document.getElementById("nite").style.visibility = "hidden";
    document.getElementById("selected").style.visibility = "hidden";
    document.getElementById("character").style.visibility = "hidden";
    document.getElementById("coins").style.visibility = "hidden";
    document.getElementById("times").style.visibility = "hidden";

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

    createObject = function (type, x, y) {
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
                    health: 5,
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
                    collect: false,
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
            case 3:
                var obj = {
                    collect: false,
                    cooldown: 750,
                    x: x,
                    y: y,
                    type: jumpboost
                };
                obj.draw = function () {
                    if (jumpboost.complete) {
                        ctx.drawImage(jumpboost, obj.x - 50 - user.x + c.width / 2, obj.y - 50 - user.y + c.height / 2, 100, 100);
                    }
                }
                return obj;
                break;
            case 4:
                var obj = {
                    x: x,
                    y: y,
                    type: lava
                };
                obj.draw = function () {
                    if (lava.complete) {
                        ctx.drawImage(lava, obj.x - 50 - user.x + c.width / 2, obj.y - 50 - user.y + c.height / 2, 100, 100);
                    }
                }
                return obj;
                break;
            default:
                break;
        }
    }

    createMap = function () {
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
                    case "j":
                        jumpboosts.push(createObject(3, 50 + 100 * i, 50 + 100 * j));
                        break;
                    case "l":
                        lavas.push(createObject(4, 50 + 100 * i, 50 + 100 * j));
                        break;
                    default:
                        break;
                }
                initialize++
            }
        }
    }
    createMap();

    if (typeof (Storage) !== "undefined") {
        if (!(localStorage.userdata == "test")) {
            try {
                for (var i in woods) {
                    woods[i].health = healthArr[i];
                }
            }
            catch (err) {
                console.log(err.message);
            }
        }
    }

    document.onmousemove = function (event) {
        if (inGame) {
            var cx = c.width / 2;
            var mouseX = event.pageX;
            if (cx > mouseX) {
                user.rot = true;
            } else {
                user.rot = false;
            }
        }
    }

    document.onclick = function (event) {
        if (inGame) {
            var mouseX = event.pageX;
            var mouseY = event.pageY;
            for (var i in woods) {
                if (user.x - c.width / 2 + mouseX - woods[i].x < 50 && user.x - c.width / 2 + mouseX - woods[i].x > - 50) {
                    if (user.y - c.height / 2 + mouseY - woods[i].y < 50 && user.y - c.height / 2 + mouseY - woods[i].y > - 50) {
                        if (woods[i].health > 0) {
                            woods[i].health--;
                        }
                    }
                }
            }
        }
    }


    document.onkeydown = function (event) {
        switch (event.keyCode) {
            case 68:
                if (inGame) {
                    moveright = 5;
                }
                return moveright;
                break;
            case 83:                
                if (inGame) {
                    switch (currentMap) {
                        case HUB:                            
                            if (user.x > 650 && user.x < 750) {   
                                runtime = 0;
                                stones = [];
                                woods = [];
                                coins = [];
                                jumpboosts = [];
                                lavas = [];
                                currentMap = LEVEL1;
                                mapData = mapDataLevel1;
                                createMap();
                                user.x = 250;
                                user.y = 695;
                            }
                            if (user.x > 1450 && user.x < 1550) {
                                runtime = 0;
                                stones = [];
                                woods = [];
                                coins = [];
                                jumpboosts = [];
                                lavas = [];
                                currentMap = LEVEL2;
                                mapData = mapDataLevel2;
                                createMap();
                                user.x = 250;
                                user.y = 695;
                            }

                            break;
                        case LEVEL1:
                            if (user.x > 4750) {
                                if (runtime < user.level1time || user.level1time == 0) {
                                    user.level1time = runtime;
                                }
                                if (user.level1 < user.coins) {
                                    user.level1 = user.coins;
                                }
                                runtime = 0;
                                finishedTut = true;
                                stones = [];
                                woods = [];
                                coins = [];
                                jumpboosts = [];
                                lavas = [];
                                currentMap = HUB;
                                mapData = mapDataHub;
                                createMap();
                                user.x = 250;
                                user.y = 695;
                                user.coins = 0;
                            }
                            break;
                        case LEVEL2:
                            if (user.x > 4750) {
                                if (runtime < user.level2time || user.level2time == 0) {
                                    user.level2time = runtime;
                                }
                                if (user.level2 < user.coins) {
                                    user.level2 = user.coins;
                                }
                                runtime = 0;
                                finishedTut = true;
                                stones = [];
                                woods = [];
                                coins = [];
                                jumpboosts = [];
                                lavas = [];
                                currentMap = HUB;
                                mapData = mapDataHub;
                                createMap();
                                user.x = 250;
                                user.y = 695;
                                user.coins = 0;
                            }
                            break;

                        default:
                            break;
                    }
                }
                break;
            case 65:
                if (inGame) {
                    moveleft = 5;

                }
                return moveleft;
                break;
            case 87:
                if (inGame) {
                    for (var i in stones) {
                        if (stones[i].y - user.y == 150) {
                            if (stones[i].x - user.x < 90 && stones[i].x - user.x > -90) {
                                moveup = user.jump;
                            }
                        }
                    }
                    for (var i in woods) {
                        if (woods[i].y - user.y == 150) {
                            if (woods[i].x - user.x < 90 && woods[i].x - user.x > -90) {
                                moveup = user.jump;
                            }
                        }
                    }

                }
                return moveup;
                break;
            case 39:
                if (inGame) {
                    moveright = 5;
                }
                return moveright;
                break;
            case 40:
                if (inGame) {
                    switch (map) {
                        case "Hub":
                            if (user.x > 650 && user.x < 750) {
                                stones = [];
                                woods = [];
                                coins = [];
                                jumpboosts = [];
                                map = "level1";
                                mapData = mapDataLevel1;
                                initialize();
                                user.x = 250;
                                user.y = 695;
                            }
                            break;
                        case "level1":
                            if (user.x > 4750) {
                                finishedTut = true;
                                stones = [];
                                woods = [];
                                coins = [];
                                jumpboosts = [];
                                map = "Hub";
                                mapData = mapDataHub;
                                initialize();
                                user.x = 250;
                                user.y = 695;
                            }
                            break;
                        default:
                            break;
                    }
                }
                break;
            case 37:
                if (inGame) {
                    moveleft = 5;
                }
                return moveleft;
                break;
            case 38:
                if (inGame) {
                    for (var i in stones) {
                        if (stones[i].y - user.y == 150) {
                            if (stones[i].x - user.x < 90 && stones[i].x - user.x > -90) {
                                moveup = user.jump;
                            }
                        }
                    }
                    for (var i in woods) {
                        if (woods[i].y - user.y == 150) {
                            if (woods[i].x - user.x < 90 && woods[i].x - user.x > -90) {
                                moveup = user.jump;
                            }
                        }
                    }

                }
                return moveup;
                break;
                return moveup;
                break;
        }
    }



    document.onkeyup = function (event) {
        switch (event.keyCode) {
            case 68:
                if (inGame) {
                    moveright = 0;
                }
                return moveright;
                break;
            case 65:
                if (inGame) {
                    moveleft = 0;

                }
                return moveleft;
                break;

            case 39:
                if (inGame) {
                    moveright = 0;
                }
                return moveright;
                break;

            case 37:
                if (inGame) {
                    moveleft = 0;
                }
                return moveleft;
                break;
        }
    }

}  

var game = setInterval(function () {
    runtime += 1;

    var forcemoveleft = 0;
    var forcemoveright = 0;

    for (var i in stones) {
        if (stones[i].x - user.x < 90 && user.x - stones[i].x < 90) {
            if (stones[i].y - user.y + moveup < 150 && stones[i].y - user.y > 0) {
                moveup = 150 - stones[i].y + user.y;
            }
            if (stones[i].y - user.y + moveup > -135 && stones[i].y - user.y < 0) {
                moveup = -0;
            }
        }

        if (stones[i].y - user.y < 150 && user.y - stones[i].y < 135) {
            if (stones[i].x - user.x < 91 && stones[i].x - user.x > 0) {                
                forcemoveleft = 5; 
            }
            if (user.x - stones[i].x < 91 && user.x - stones[i].x > 0) {
                forcemoveright = 5;
            }
        }
        
    }
    for (var i in woods) {
        if (woods[i].health > 0) {
            if (woods[i].x - user.x < 90 && user.x - woods[i].x < 90) {
                if (woods[i].y - user.y + moveup < 150 && woods[i].y - user.y > 0) {
                    moveup = 150 - woods[i].y + user.y;
                }
                if (woods[i].y - user.y + moveup > -135 && woods[i].y - user.y < 0) {
                    moveup = -0;
                }
            }

            if (woods[i].y - user.y < 150 && user.y - woods[i].y < 150) {
                if (woods[i].x - user.x < 91 && woods[i].x - user.x > 0) {
                    forcemoveleft = 5;
                }
                if (user.x - woods[i].x < 91 && user.x - woods[i].x > 0) {
                    forcemoveright = 5;
                }
            }
        }
    }
    for (var i in coins) {
        if (user.x - coins[i].x < 50 && user.x - coins[i].x > -50) {
            if (user.y - coins[i].y < 100 && user.y - coins[i].y > -100) {
                if (!coins[i].collect) {
                    user.coins += 1;
                    coins[i].collect = true;
                }               
            }
        }
    }
    for (var i in jumpboosts) {
        if (user.x - jumpboosts[i].x < 50 && user.x - jumpboosts[i].x > -50) {
            if (user.y - jumpboosts[i].y < 100 && user.y - jumpboosts[i].y > -100) {
                if (!jumpboosts[i].collect) {
                    jumpboosts[i].collect = true;
                    jumptime = 250;
                    jumpboosts[i].cooldown = 750;
                }                
            }
        }
        if (jumpboosts[i].cooldown > 0) {
            jumpboosts[i].cooldown--
        }
        if (jumpboosts[i].cooldown == 0) {
            jumpboosts[i].collect = false;  
        }
    }
    for (var i in lavas) {
        if (lavas[i].x - user.x < 90 && user.x - lavas[i].x < 90) {
            if (lavas[i].y - user.y + moveup < 150 && lavas[i].y - user.y > 0) {
                user.x = 250;
                user.y = 695;
                moveup = 0;
            }
            if (lavas[i].y - user.y + moveup > -135 && lavas[i].y - user.y < 0) {
                user.x = 250;
                user.y = 695;
                moveup = 0;
            }
        }

        if (lavas[i].y - user.y < 150 && user.y - lavas[i].y < 150) {
            if (lavas[i].x - user.x < 91 && lavas[i].x - user.x > 0) {
                user.x = 250;
                user.y = 695;
                moveup = 0;
            }
            if (user.x - lavas[i].x < 91 && user.x - lavas[i].x > 0) {
                user.x = 250;
                user.y = 695;
                moveup = 0;
            }
        }
    }


    if (jumptime > 0) {
        user.jump = 25;
        jumptime -= 1;
    } else {
        user.jump = 20;
    }

    if (inGame) {
        user.x += moveright + forcemoveright ;
        user.x -= moveleft + forcemoveleft ;
        user.y -= moveup;
        moveup -= 1;
    }


    c.width = window.innerWidth;
    c.height = window.innerHeight;
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.save();
    if (!inGame) {
        if (!isNight) {
            drawGrid(0, 0, "#000000", "#FFFFFF", c.width, c.height); 
        }
        else {           
            drawGrid(0, 0, "#FFFFFF", "#000000", c.width, c.height);
        }

        if (display == "times") {
            document.getElementById("times").style.visibility = "visible";
            document.getElementById("coins").style.visibility = "hidden";
        } else {
            document.getElementById("times").style.visibility = "hidden";
            document.getElementById("coins").style.visibility = "visible";
        }

        if (user.level1time > 0) {
            document.getElementById("level1-inner").innerHTML = "Level 1: " + user.level1time / 25 + "sec";
        } else {
            document.getElementById("level1-inner").innerHTML = "Level 1: Not Played";
        }
        if (user.level2time > 0) {
            document.getElementById("level2-inner").innerHTML = "Level 2: " + user.level2time / 25 + "sec";
        } else {
            document.getElementById("level2-inner").innerHTML = "Level 2: Not Played";
        }
        if (user.level3time > 0) {
            document.getElementById("level3-inner").innerHTML = "Level 3: " + user.level3time / 25 + "sec";
        } else {
            document.getElementById("level3-inner").innerHTML = "Level 3: Not Played";
        }
        if (user.level4time > 0) {
            document.getElementById("level4-inner").innerHTML = "Level 4: " + user.level4time / 25 + "sec";
        } else {
            document.getElementById("level4-inner").innerHTML = "Level 4: Not Played";
        }
        if (user.level5time > 0) {
            document.getElementById("level5-inner").innerHTML = "Level 5: " + user.level5time / 25 + "sec";
        } else {
            document.getElementById("level5-inner").innerHTML = "Level 5: Not Played";
        }
        if (user.level6time > 0) {
            document.getElementById("level6-inner").innerHTML = "Level 6: " + user.level6time / 25 + "sec";
        } else {
            document.getElementById("level6-inner").innerHTML = "Level 6: Not Played";
        }

        if (user.level1 > 0) {
            document.getElementById("level1c-inner").innerHTML = "Level 1: " + user.level1 + "/9";
        } else {
            document.getElementById("level1c-inner").innerHTML = "Level 1: Not Played";
        }
        if (user.level2 > 0) {
            document.getElementById("level2c-inner").innerHTML = "Level 2: " + user.level2 + "/6";
        } else {
            document.getElementById("level2c-inner").innerHTML = "Level 2: Not Played";
        }
        if (user.level3 > 0) {
            document.getElementById("level3c-inner").innerHTML = "Level 3: " + user.level3+ "/0";
        } else {
            document.getElementById("level3c-inner").innerHTML = "Level 3: Not Played";
        }
        if (user.level4e > 0) {
            document.getElementById("level4c-inner").innerHTML = "Level 4: " + user.level4+"/0";
        } else {
            document.getElementById("level4c-inner").innerHTML = "Level 4: Not Played";
        }
        if (user.level5e > 0) {
            document.getElementById("level5c-inner").innerHTML = "Level 5: " + user.level5 +"/0";
        } else {
            document.getElementById("level5c-inner").innerHTML = "Level 5: Not Played";
        }
        if (user.level6 > 0) {
            document.getElementById("level6c-inner").innerHTML = "Level 6: " + user.level6  + "/0";
        } else {
            document.getElementById("level6c-inner").innerHTML = "Level 6: Not Played";
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
    if (inGame ) {        
            showInstructions();
    }    

    for (var i in stones) {
        stones[i].draw();
    }
    for (var i in woods) {
        if (woods[i].health > 0) {
            woods[i].draw();
        }        
    }
    for (var i in coins) {
        if (!coins[i].collect) {
            coins[i].draw();
        }       
    }
    for (var i in jumpboosts) {
        if (!jumpboosts[i].collect) {
            jumpboosts[i].draw();
        }
    }
    for (var i in lavas) {        
         lavas[i].draw();        
    }
    ctx.restore();
    if (inGame) {
        ctx.save();
        ctx.translate(c.width / 2, c.height / 2);
        
        if (user.rot) {
            ctx.scale(-1, 1);
        } else {
            ctx.scale(1, 1);
        }        
        ctx.drawImage(skin, -50, -100, 100, 200);
        ctx.restore();
    }
    
}, 40)

start = document.getElementById("play");

start.onclick = function () {
    startGame();
}


var save = setInterval(function () {
    var health = [];
    healthfunc = function () {       
        for (var i in woods) {
            health.push(woods[i].health);
        }
    }
    healthfunc();
    if (typeof (Storage) !== "undefined") {
        localStorage.setItem("userdata", btoa(JSON.stringify(user)));
        localStorage.setItem("playedbefore", JSON.stringify(btoa(finishedTut)));
        localStorage.setItem("lastmap", JSON.stringify(btoa(currentMap)));
        localStorage.setItem("lastmapData", JSON.stringify(btoa(mapData)));
        localStorage.setItem("version", JSON.stringify(btoa(version)));
        localStorage.setItem("time", JSON.stringify(btoa(runtime)));
        localStorage.setItem("health", btoa(JSON.stringify(health)));
    }
},1000)