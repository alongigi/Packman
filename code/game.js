var context = canvas.getContext("2d");
var shape = new Object();
var board;
var score;
var pac_color;
var start_time;
var timeLeft = 60;
var time_elapsed;
var interval;
var monster1Interval;
var catchMeInterval;
var balls = [];
var monster1Cord = {};
var catchMePlayer = {};
var extraTime = {};
var extraLives = {};
var lives = 3;
var music = document.getElementById("myAudio");

function startGame() {
    playAudio();

    board = new Array();
    score = 0;
    pac_color = "yellow";
    var cnt = 100;
    var food_remain = 50;
    var pacman_remain = 1;
    start_time = new Date();

    createBalls(food_remain);
    shuffle(balls);

    for (var i = 0; i < 10; i++) {
        board[i] = new Array();
        //put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
        // 4 = obstacle, 2 = Packman, 1 = food, 0 = space
        // 5 = 5 points, 6 = 15 points, 7 = 25 points
        for (var j = 0; j < 10; j++) {
            if ((i == 3 && j == 3) || (i == 3 && j == 4) || (i == 3 && j == 5) || (i == 6 && j == 1) || (i == 6 && j == 2)) {
                board[i][j] = 4;
            }
            else {
                var randomNum = Math.random();
                if (randomNum <= 1.0 * food_remain / cnt) {
                    if (board[i][j] === 4) continue;
                    food_remain--;
                    board[i][j] = balls.pop();
                } else if (randomNum < 1.0 * (pacman_remain + food_remain) / cnt) {
                    shape.i = i;
                    shape.j = j;
                    pacman_remain--;
                    board[i][j] = 2;
                } else {
                    board[i][j] = 0;
                }
                cnt--;
            }
        }
    }
    while (food_remain > 0) {
        var emptyCell = findRandomEmptyCell(board);
        // if(board[emptyCell[0]][emptyCell[1]] === 4) continue;
        board[emptyCell[0]][emptyCell[1]] = 1;
        food_remain--;
    }

    monster1Cord = {x: 0, y: 0};
    catchMePlayer = {x: 9, y: 9};
    var emptyCell = findRandomEmptyCell(board);
    extraTime = {x: emptyCell[0], y: emptyCell[1]};

    var emptyCell = findRandomEmptyCell(board);
    extraLives = {x: emptyCell[0], y: emptyCell[1]};

    keysDown = {};
    addEventListener("keydown", function (e) {
        keysDown[e.keyCode] = true;
    }, false);
    addEventListener("keyup", function (e) {
        keysDown[e.keyCode] = false;
    }, false);
    interval = setInterval(UpdatePosition, 250);
    monster1Interval = setInterval(moveMonster1, 750);
    catchMeInterval = setInterval(catchMeMove, 750);
}


function findRandomEmptyCell(board) {
    var i = Math.floor((Math.random() * 9) + 1);
    var j = Math.floor((Math.random() * 9) + 1);
    while (board[i][j] != 0) {
        i = Math.floor((Math.random() * 9) + 1);
        j = Math.floor((Math.random() * 9) + 1);
    }
    return [i, j];
}

function GetKeyPressed() {
    if (keysDown[38]) {
        return 1;
    }
    if (keysDown[40]) {
        return 2;
    }
    if (keysDown[37]) {
        return 3;
    }
    if (keysDown[39]) {
        return 4;
    }
}

function Draw() {
    var lifesElement = document.getElementById("lives");
    var userElement = document.getElementById("userName");


    canvas.width = canvas.width; //clean board
    lblScore.value = score;
    lblTime.value = timeLeft;
    lifesElement.innerText = lives;
    userElement.innerText = currentUser.userName;
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            var center = new Object();
            center.x = i * 60 + 30;
            center.y = j * 60 + 30;
            if (monster1Cord.x == j && monster1Cord.y == i) {
                context.beginPath();
                context.arc(center.x, center.y, 30, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
                context.lineTo(center.x, center.y);
                context.fillStyle = "red"; //color
                context.fill();
                context.beginPath();
                context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
                context.fillStyle = "black"; //color
                context.fill();
            } else if (extraTime.x == j && extraTime.y == i) {
                context.beginPath();
                context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
                context.fillStyle = "Cyan"; //color
                context.fill();
            } else if (extraLives.x == j && extraLives.y == i) {
                context.beginPath();
                context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
                context.fillStyle = "purple"; //color
                context.fill();
            }
            else if (catchMePlayer.x == j && catchMePlayer.y == i) {
                context.beginPath();
                context.arc(center.x, center.y, 30, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
                context.lineTo(center.x, center.y);
                context.fillStyle = "purple"; //color
                context.fill();
                context.beginPath();
                context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
                context.fillStyle = "black"; //color
                context.fill();
            } else if (board[i][j] == 2) {
                context.beginPath();
                context.arc(center.x, center.y, 30, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
                context.lineTo(center.x, center.y);
                context.fillStyle = pac_color; //color
                context.fill();
                context.beginPath();
                context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
                context.fillStyle = "black"; //color
                context.fill();
            } else if (board[i][j] == 5 || board[i][j] == 6 || board[i][j] == 7) {
                context.beginPath();
                context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
                if (board[i][j] == 5) context.fillStyle = "yellow"; //color
                if (board[i][j] == 6) context.fillStyle = "green"; //color
                if (board[i][j] == 7) context.fillStyle = "blue"; //color
                context.fill();
            }
            else if (board[i][j] == 4) {
                context.beginPath();
                context.rect(center.x - 30, center.y - 30, 60, 60);
                context.fillStyle = "grey"; //color
                context.fill();
            }
        }
    }
}

function UpdatePosition() {
    timeLeft -= 0.25;
    if (timeLeft == 0) endGame();

    board[shape.i][shape.j] = 0;
    var x = GetKeyPressed()
    if (x == 1) {
        if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {
            shape.j--;
        }
    }
    if (x == 2) {
        if (shape.j < 9 && board[shape.i][shape.j + 1] != 4) {
            shape.j++;
        }
    }
    if (x == 3) {
        if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
            shape.i--;
        }
    }
    if (x == 4) {
        if (shape.i < 9 && board[shape.i + 1][shape.j] != 4) {
            shape.i++;
        }
    }
    if (board[shape.i][shape.j] == 5 || board[shape.i][shape.j] == 6 || board[shape.i][shape.j] == 7) {
        if (board[shape.i][shape.j] == 5) score += 5;
        if (board[shape.i][shape.j] == 6) score += 15;
        if (board[shape.i][shape.j] == 7) score += 25;
    }

    if (shape.i === extraTime.y && shape.j === extraTime.x) {
        extraTime.x = -1;
        extraTime.y = -1;
        timeLeft += 30;
    }


    if (shape.i === extraLives.y && shape.j === extraLives.x) {
        extraLives.x = -1;
        extraLives.y = -1;
        lives += 1;
    }

    board[shape.i][shape.j] = 2;
    var currentTime = new Date();
    time_elapsed = (currentTime - start_time) / 1000;
    if (score >= 20 && time_elapsed <= 10) {
        pac_color = "green";
    }
    if (score == 50) {
        endGame();
    }
    else {
        Draw();
    }
}

function createBalls(food_remain) {
    for (let i = 0; i < food_remain * 0.6; i++) {
        balls.push(5);
    }

    for (let i = 0; i < food_remain * 0.3; i++) {
        balls.push(6);
    }

    for (let i = 0; i < food_remain * 0.1; i++) {
        balls.push(7);
    }
}

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function moveMonster1() {
    var movement = chooseMovement(monster1Cord, true, false);
    monster1Cord.x = movement.x;
    monster1Cord.y = movement.y;

    if (monster1Cord.x === shape.j && monster1Cord.y === shape.i) reduceLives();
}

function catchMeMove() {
    var movement = chooseMovement(catchMePlayer, false, true);
    catchMePlayer.x = movement.x;
    catchMePlayer.y = movement.y;

    if (catchMePlayer.x === shape.j && catchMePlayer.y === shape.i) uploadBonus();
}

function uploadBonus() {
    score += 50;
    catchMePlayer.x = -1;
    catchMePlayer.y = -1;
}

function chooseMovement(obj, toSort, toRandom) {
    var movements = [];

    if (obj.x + 1 >= 0 && obj.x + 1 < 10 && board[obj.y][obj.x + 1] !== 4) movements.push({x: obj.x + 1, y: obj.y});
    if (obj.x - 1 >= 0 && obj.x - 1 < 10 && board[obj.y][obj.x - 1] !== 4) movements.push({x: obj.x - 1, y: obj.y});
    if (obj.y + 1 >= 0 && obj.y + 1 < 10 && board[obj.y + 1][obj.x] !== 4) movements.push({x: obj.x, y: obj.y + 1});
    if (obj.y - 1 >= 0 && obj.y - 1 < 10 && board[obj.y - 1][obj.x] !== 4) movements.push({x: obj.x, y: obj.y - 1});

    if (toSort) {
        movements.sort(function (a, b) {
            var aManheten = Math.pow(Math.pow(a.x - shape.j, 2) + Math.pow(a.y - shape.i, 2), 0.5);
            var bManheten = Math.pow(Math.pow(b.x - shape.j, 2) + Math.pow(b.y - shape.i, 2), 0.5);
            return aManheten - bManheten;
        });
    }

    if (toRandom) {
        return movements[Math.floor(Math.random() * movements.length)];
    }

    return movements[0];
}

function reduceLives() {
    // window.alert("You have lost a live!");

    monster1Cord.x = 0;
    monster1Cord.y = 0;

    board[shape.i][shape.j] = 0;
    var emptyCell = findRandomEmptyCell(board);
    shape.i = emptyCell[0];
    shape.j = emptyCell[1];
    board[shape.i][shape.j] = 2;
    Draw();

    lives -= 1;

    if (lives === 0) endGame();
}

function endGame() {
    if (lives == 0) alert("You Lost!");
    if (timeLeft == 0 && score < 150) alert("You can do better");
    else if (timeLeft == 0 && score > 150) alert("We have a winner");

    location.reload();
}

function newGame() {
    stopGame();
    event.preventDefault()
    shape = new Object();
    board = undefined;
    score = undefined;
    pac_color = undefined;
    start_time = undefined;
    timeLeft = 60;
    time_elapsed = undefined;
    interval = undefined;
    monster1Interval = undefined;
    catchMeInterval = undefined;
    balls = [];
    monster1Cord = {};
    catchMePlayer = {};
    extraTime = {};
    extraLives = {};
    lives = 3;
    startGame();
}

function playAudio() {
    // music.play();
}

function pauseAudio() {
    music.pause();
}

function stopGame() {
    clearInterval(interval);
    clearInterval(monster1Interval);
    clearInterval(catchMeInterval);
    pauseAudio();
}


