const canvas = $('#canvas')[0];
const ctx = canvas.getContext('2d');

/*create main snake by array with 3 boxes*/
var snake=[
    {offsetX:50, offsetY:60,oldX:0, oldY:0},
    {offsetX:50, offsetY:50,oldX:0, oldY:0},
    {offsetX:50, offsetY:40,oldX:0, oldY:0},
];

var food = {offsetX:100, offsetY:100}

var snakeWidth = 10;
var snakeHeight = 10;

var gap = 10;
var score = 0;

var keyPress;

createSnake();
/*visible snake*/
function createSnake() {

    for (var i = 0; i < snake.length; i++) {
        ctx.fillStyle = 'red';
        ctx.fillRect(snake[i].offsetX, snake[i].offsetY, snakeWidth, snakeHeight);
        ctx.strokeStyle='white';
        ctx.strokeRect(snake[i].offsetX, snake[i].offsetY, snakeWidth, snakeHeight);
    }
}

var stopMove = setInterval(move,400);
var stop = setInterval(moveDown,400);

function move() {
    clearCanvas();
    createFood();
    //gameOver();
    snakeMove();
}

function createFood() {
    ctx.fillStyle = 'yellow';
    ctx.fillRect(food.offsetX, food.offsetY,snakeWidth, snakeHeight);

    /*increase score and eat food and snake makes bigger*/
    if (snake[0].offsetX == food.offsetX && snake[0].offsetY == food.offsetY){

        score++;
        $("#score").text(score);

        snake.push({
            offsetX: snake[snake.length-1].oldX,
            offsetY: snake[snake.length-1].oldY
        });

        generateNewPosition();
    }

    gameOver();

}

/*running down at the beginning*/
function moveDown() {
    snake[0].offsetY = snake[0].offsetY + gap;
}

function gameOver() {
    for (var i in snake) {

        if (i != 0){
            if (snake[0].offsetX == snake[i].offsetX && snake[0].offsetY == snake[i].offsetY || snake[0].offsetY === canvas.height || snake[0].offsetX === canvas.width || snake[0].offsetY === 0 || snake[0].offsetX === 0 ){
                alert("game over");

                //clearInterval(stopMove);

                snake[0].offsetX = 50;
                snake[0].oldX = 0;
                snake[0].offsetY = 100;
                snake[0].oldY = 0;
                snake[1].offsetX = 50;
                snake[1].oldX = 0;
                snake[1].offsetY = 90;
                snake[1].oldY = 0;
                snake[2].offsetX = 50;
                snake[2].oldX = 0;
                snake[2].offsetY = 80;
                snake[2].oldY = 0;

                moveDown();

                move();

                score = 0;
                $("#score").text(0);

                if (snake.length > 3) {
                    for (var i = 0; i < snake.length; i++) {
                        snake.splice(i + 3, snake.length - 3);
                    }
                }
            }
        }
    }
}

/*snake moving to down, up, left, right*/
function snakeMove() {

    for (var i = 0; i <snake.length ; i++) {

        ctx.fillStyle = 'red';
        ctx.fillRect(snake[i].offsetX, snake[i].offsetY, snakeWidth, snakeHeight);
        ctx.strokeRect(snake[i].offsetX, snake[i].offsetY, snakeWidth, snakeHeight);

        snake[i].oldY = snake[i].offsetY ;
        snake[i].oldX = snake[i].offsetX;

       if (i == 0){
           if (keyPress == "ArrowDown"){
               snake[i].offsetY = snake[i].offsetY + gap;
               clearInterval(stop);
           }else if (keyPress == "ArrowUp"){
               snake[i].offsetY = snake[i].offsetY - gap;
               clearInterval(stop);
           }else if (keyPress == "ArrowRight") {
               snake[i].offsetX = snake[i].offsetX + gap;
               clearInterval(stop);
           }else if (keyPress == "ArrowLeft") {
               snake[i].offsetX = snake[i].offsetX - gap;
               clearInterval(stop);
           }
       }else {
           snake[i].offsetX = snake[i - 1].oldX;
           snake[i].offsetY = snake[i - 1].oldY;
       }

    }
}

/*what's the pressed key*/
$(document).keydown(function (e) {
    keyPress = e.key;
});

/*clear previous box of snake when it move*/
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function generateNewPosition() {
    var randX = Math.floor(Math.random() * (canvas.width - 10));
    var randY = Math.floor(Math.random() * (canvas.height - 10));
    ctx.fillStyle = 'yellow';
    ctx.fillRect(randX, randY,snakeWidth, snakeHeight);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

}




