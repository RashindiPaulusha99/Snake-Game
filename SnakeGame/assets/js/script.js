const canvas = $('#canvas')[0];
const ctx = canvas.getContext('2d');

var snake=[
    {offsetX:50, offsetY:60,oldX:0, oldY:0},
    {offsetX:50, offsetY:50,oldX:0, oldY:0},
    {offsetX:50, offsetY:40,oldX:0, oldY:0},
];

var snakeWidth = 10;
var snakeHeight = 10;

var gap = 10;

const ARROW_LEFT = 37;
const ARROW_UP = 38;
const ARROW_RIGHT = 39;
const ARROW_DOWN = 40;

var keyPress;

createSnake();
function createSnake() {

    for (var i = 0; i < snake.length; i++) {
        ctx.fillStyle = 'red';
        ctx.fillRect(snake[i].offsetX, snake[i].offsetY, snakeWidth, snakeHeight);
        ctx.strokeStyle='white';
        ctx.strokeRect(snake[i].offsetX, snake[i].offsetY, snakeWidth, snakeHeight);
    }

}

setInterval(move,500);

function move() {
    clearCanvas();
    snakeMove();
}

function snakeMove() {

    for (var i = 0; i <snake.length ; i++) {

       /* //snake[i].offsetX = snake[i].offsetX;
        snake[i].offsetY = snake[i].offsetY + gap;

        ctx.fillRect(snake[i].offsetX, snake[i].offsetY, snakeWidth, snakeHeight);
        ctx.strokeRect(snake[i].offsetX, snake[i].offsetY, snakeWidth, snakeHeight);

        $.each(snake, function (index , value) {
            snake[index].offsetY = snake[index].offsetY + gap;

            ctx.fillRect(snake[index].offsetX, snake[index].offsetY, snakeWidth, snakeHeight);
            ctx.strokeRect(snake[index].offsetX, snake[index].offsetY, snakeWidth, snakeHeight);

        });

    }*/
    //snake[0].offsetY = snake[0].offsetY + gap;
    //for (var index in snake) {
        snake[i].offsetY = snake[i].offsetY + gap;

        ctx.fillRect(snake[i].offsetX, snake[i].offsetY, snakeWidth, snakeHeight);
        ctx.strokeRect(snake[i].offsetX, snake[i].offsetY, snakeWidth, snakeHeight);

        snake[i].oldY = snake[i].offsetY ;
        snake[i].oldX = snake[i].offsetX;

       if (i == 0){
           if (keyPress == "ArrowDown"){
               snake[i].offsetY = snake[i].offsetY + gap;
           }else if (keyPress == "ArrowUp"){
               snake[i].offsetY = snake[i].offsetY - gap;
           }else if (keyPress == "ArrowRight") {
               snake[i].offsetX = snake[i].offsetX + gap;
           }else if (keyPress == "ArrowLeft") {
               snake[i].offsetX = snake[i].offsetX - gap;
           }
       }else {
           snake[i].offsetX = snake[i - 1].oldX;
           snake[i].offsetY = snake[i - 1].oldY;
       }
    }
}

$(document).keydown(function (e) {
    keyPress = e.key;
});

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

