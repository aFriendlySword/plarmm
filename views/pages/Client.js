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
drawGrid(0, 0, "#FFFFFF", "#000000", c["width"], c["height"]);

var night = document.getElementById("sleep");
var isNight = true;
sleep.onclick = function () {
    if (!isNight) {
        drawGrid(0, 0, "#FFFFFF", "#000000", c["width"], c["height"]);
        isNight = true;
        document.getElementById("sleep").style.color = "black";
        document.getElementById("sleep").style.backgroundColor = "white";
        document.getElementById("sleep").textContent = "Turn Nightmode OFF";
    }
    else {
        drawGrid(0, 0, "#000000", "#FFFFFF", c["width"], c["height"]);
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


var hreq = new XMLHttpRequest();

hreq.onreadystatechange = function () {
    if (hreq.readyState == 4 && hreq.status == 200) {
        servers = JSON.parse(hreq.responseText);
        startGame(servers[0].ip);
    }
}

hreq.open("GET", service + "findservers", true);
hreq.send(null);

var startGame = function (server) {
    var inGame = false;
    var socket = new WebSocket(server, 'echo-protocol');
    var button = document.getElementById("play");
    var selectOne = document.getElementById("btl");
    var selectTwo = document.getElementById("btr");
    var selectThree = document.getElementById("bbl");
    var selectFour = document.getElementById("bbr");
    var mouseX = 0;
    var mouseY = 0;
    var showSkin = skin;
    var angle = false;
    var username = "";
    var id = "";
    var level = "one";
    const CONNECTED = "00";
    const PLAYERMOVE = "100";
    const ADDPLAYER = "101";
    const REMPLAYER = "102";
    const ADDSTONE = "201";
    const REMSTONE = "202";
    const ADDWOOD = "301";
    const REMWOOD = "302";
    const ADDCOIN = "401";
    const REMCOIN = "402";
    const JOINED_GAME = "1000";
    const LEFT_GAME = "2000";
    const MOUSE_COORDS = "500";
    const MOVE_START = "0100";
    const MOVE_STOP = "0010";
    const JOIN = "1234";
    const STONE = "20";
    const WOOD = "30";
    const COIN = "50";
    const USER = "1337";

    document.getElementById("login").style.visibility = "visible";
    document.getElementById("menu").style.visibility = "visible";
    c.width = window.innerWidth;
    c.height = window.innerHeight;
    ctx.clearRect(0, 0, c.width, c.height);
    var players = [];
    var stones = [];
    var woods = [];
    var coins = [];
    button.onclick = function () {
        username = document.getElementById("name").value.replace(/(<([^>]+)>)/ig, "");
        socket.send(JSON.stringify({
            type: JOIN,
            name: username,
            color: skin
        }))
    };
    

    var createObject = function (type, x, y, rot, texture, name) {
        switch (type) {
            case STONE:
                var obj = {
                    x: x,
                    y: y,
                    me: false,
                    deg: rot,
                    type: STONE
                };
                obj.draw = function () {
                    if (stone.complete) {
                        ctx.drawImage(stone, (obj.x - 50) - players[id].x + c.width / 2, (obj.y - 50) - players[id].y + c.height / 2, 100, 100)
                    }
                };
                return obj;
                break;
            case WOOD:
                var obj = {
                    x: x,
                    y: y,
                    me: false,
                    deg: rot,
                    type: WOOD
                };
                obj.draw = function () {
                    if (wood.complete) {
                        ctx.drawImage(wood, (obj.x - 50) - players[id].x + c.width / 2, (obj.y - 50) - players[id].y + c.height / 2, 100, 100)
                    }
                };
                return obj;
                break;
            case COIN:
                var obj = {
                    x: x,
                    y: y,
                    me: false,
                    deg: rot,
                    type: COIN
                };
                obj.draw = function () {
                    if (coin.complete) {
                        ctx.drawImage(coin, (obj.x - 50) - players[id].x + c.width / 2, (obj.y - 50) - players[id].y + c.height / 2, 100, 100)
                    }
                };
                return obj;
                break;
            case USER:
                var obj = {
                    x: x,
                    y: y,
                    me: false,
                    deg: rot,
                    texture: texture,
                    name: name,
                    type: USER
                };
                obj.draw = function () {
                    if (texture.complete) {
                        drawName(obj.x - players[id].x + c.width / 2, obj.y - players[id].y + c.height / 2, obj.name);
                        ctx.save();
                        ctx.translate(obj.x - players[id].x + c.width / 2, obj.y - players[id].y + c.height / 2)
                        if (rot) {
                            ctx.scale(-1, 1);
                        }
                        ctx.translate(0, 0);
                        ctx.drawImage(texture, -50, -50, 100, 100);
                        ctx.restore()
                    }
                };
                return obj;
                break;
            default:
                return "Unknown type!";
                break
        }
    };
        
    socket.onopen = function () {
        console.log("Connected to " + server)
    }

    socket.onmessage = function (message) {
        var mess = JSON.parse(message.data);
        switch (mess.type) {
            case CONNECTED:
                if (button.childNodes[0]) {
                    button.childNodes[0].nodeValue = "Play";
                } else {
                    if (button.value) {
                        button.value = "Play";
                    } else {
                        button.innerHTML = "Play";
                    }
                }
                button.disabled = false;
                break;
            case ADDPLAYER:
                players[mess.id] = createObject(USER, mess.x, mess.y, mess.rot, mess.skin, mess.name);
                players[mess.id].me = mess.me;
                if (mess.me) {
                    id = mess.id;
                }
                break;
            case ADDSTONE:
                if (stones[mess.id] == null) {
                    stones[mess.id] = createObject(TREE, mess.x, mess.y, mess.rot);
                }
                break;
            case ADDWOOD:
                if (woods[mess.id] == null) {
                    woods[mess.id] = createObject(WOOD, mess.x, mess.y, mess.rot);
                }
                break;
            case ADDCOIN:
                if (coins[mess.id] == null) {
                    coins[mess.id] = createObject(COIN, mess.x, mess.y, mess.rot);
                }
                break;
            case CHANGELEVEL:
                level = mess.level;
                break;
            case PLAYERMOVE:
                if (players[mess.id] != null) {
                    var player = players[mess.id];
                    if (player.me == false) {
                        player.x = mess.x;
                        player.y = mess.x;
                        player.rot = mess.rot;
                    } else {
                        player.x = mess.x;
                        player.y = mess.x;
                    }
                }
                break;
            case REMPLAYER:
                if (players[mess.id] != null) {
                    delete players[mess.id];
                }
                break;
            case REMSTONE:
                if (stones[mess.id] != null) {
                    delete stones[mess.id];
                }
                break;
            case REMWOOD:
                if (woods[mess.id] != null) {
                    delete woods[mess.id];
                }
                break;
            case REMCOIN:
                if (coins[mess.id] != null) {
                    delete coins[mess.id];
                }
            case JOINED_GAME:
                inGame = true;
                button.disabled = true;
                document.getElementById("login").style.visibility = "hidden";
                document.getElementById("menu").style.visibility = "hidden";
                document.getElementById("nite").style.visibility = "hidden";
                break;
            case LEFT_GAME:
                button.disabled = false;
                document.getElementById("login").style.visibility = "visible";
                document.getElementById("menu").style.visibility = "visible";
                document.getElementById("nite").style.visibility = "visible";
                inGame = false;
                break;
            default:
                console.log("Unknown Message from Websocket:" + mess.type)
                break;
        }
    }

    document.onmousemove = function (event) {
        if (inGame) {
            var cx = c.width / 2;
            var cy = c.height / 2;
            mouseX = event.pageX;
            mouseY = event.pageY;
            angle = (cx < mouseX);
            var move = {
                type: MOUSE_COORDS,
                x: mouseX,
                y: mouseY,
                rot: angle

            };
            socket.send(JSON.stringify(move));
        }
    }

    document.onkeydown = function (event) {
        switch (event.keyCode) {
            case 68:
                if (inGame) {
                    var move = {
                        type: MOVE_START,
                        input: "right",
                        v: 1
                    };
                    socket.send(JSON.stringify(move));
                }
                break;
            case 65: 
                if (inGame) {
                    var move = {
                        type: MOVE_START,
                        input: "left",
                        v: 1
                    };
                    socket.send(JSON.stringify(move));
                }
                break;
            case 32:
                if (inGame) {
                    var move = {
                        type: MOVE_START,
                        input: "up",
                        v: 1
                    };
                    socket.send(JSON.stringify(move));
                }
        }
    }
    document.onkeyup = function (event) {
        switch (event.keyCode) {
            case 68:
                if (inGame) {
                    var move = {
                        type: MOVE_STOP,
                        input: "right",
                        v: 1
                    };
                    socket.send(JSON.stringify(move));
                }
                break;
            case 65:
                if (inGame) {
                    var move = {
                        type: MOVE_STOP,
                        input: "left",
                        v: 1
                    };
                    socket.send(JSON.stringify(move));
                }
                break;
            case 32:
                if (inGame) {
                    var move = {
                        type: MOVE_STOP,
                        input: "up",
                        v: 1
                    };
                    socket.send(JSON.stringify(move));
                }
        }
    }
    socket.onclose = function () {
        console.log("Connection closed");
        document.getElementById("login").style.visibility = "visible";
        document.getElementById("menu").style.visibility = "visible";
        document.getElementById("nite").style.visibility = "visible";
        if (button.childNodes[0]) {
            button.childNodes[0].nodeValue = "Disconnected";
        } else {
            if (button.value) {
                button.value = "Disconnected";
            } else {
                button.innerHTML = "Disconnected";
            }
        }
        button.disabled = true;
        
    }
    var drawName = function (x, y, name) {
        ctx.save();
        ctx.lineWidth = 1;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "white";
        ctx.shadowcolor = "black";
        ctx.shadowOffsetX = 3;
        ctx.shadowOffsetY = 3;
        ctx.shadowblur = 5;
        ctx.font = "20px Verdana";
        ctx.fillText(name, x, y - 55);
        ctx.restore();

    }
    var game = setInterval(function () {
        c.width = window.innerWidth;
        c.height = window.innerHeight;
        ctx.save();
        ctx.clearRect(0, 0, c.width, c.height);
        if (!inGame) {
            if (!isNight) {               
                drawGrid(0, 0, "#000000", "#FFFFFF", c["width"], c["height"]);
            }
            else {
                drawGrid(0, 0, "#FFFFFF", "#000000", c["width"], c["height"]);
            }
        } else {
            if (!isNight) {
                drawGrid(-3500 - players[id].x + c.width / 2, -3000 - players[id].y + c.height / 2, "#BBBBBB", "#444444", 12000, 7000);
                drawGrid(0 - players[id].x + c.width / 2, 0 - players[id].y + c.height / 2, "#FFFFFF", "#000000", 5000, 1000);
            }
            else {
                drawGrid(0, 0, "#000000", "#FFFFFF", c["width"], c["height"]);
                drawGrid(-3500 - players[id].x + c.width / 2, -3000 - players[id].y + c.height / 2, "#444444", "#BBBBBB", 12000, 7000);
                drawGrid(0 - players[id].x + c.width / 2, 0 - players[id].y + c.height / 2, "#000000", "#FFFFFF", 5000, 1000);
            }
                             
            
        }
        ctx.restore;
        ctx.save;
        for (var i in stones) {
            stones[i].draw;
        }
        for (var i in coins) {
            coins[i].draw;
        }
        for (var i in woods) {
            woods[i].draw;
        }
        ctx.restore;

        for (var i in players) {
            if (players[i].me) {
                username = players[i].name;
                drawName(c.width / 2, c.height / 2, username);
                ctx.save();
                ctx.translate(c.width / 2, c.height / 2);
                if (angle) {
                    ctx.scale(-1, 1);
                }
                ctx.translate(0, 0);
                ctx.drawImage(skin, -50, -100, 100, 200);
                ctx.restore();

            } else {
                ctx.save();
                players[i].draw();
                ctx.restore();
            }
        }
    },40)
}