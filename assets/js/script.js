const canvas = $('#canvas')[0];
const ctx = canvas.getContext('2d');

/*create main snake by array with 3 boxes*/
var snake=[
    {offsetX:50, offsetY:30,oldX:0, oldY:0},
    {offsetX:50, offsetY:20,oldX:0, oldY:0},
    {offsetX:50, offsetY:10,oldX:0, oldY:0},
];

var food = {offsetX:100, offsetY:100,eaten:false}

var snakeWidth = 10;
var snakeHeight = 10;

var gap = 10;
var score = 0;
var time=0;
var foods = 0;

var keyPress = "ArrowDown";

var snakeSpeed;
var snakeColour;

createSnake();
createFood();
setTime();

function setTime() {
    $("#display_time").text(time++);
}

/*visible snake*/
function createSnake() {
    for (var i = 0; i < snake.length; i++) {
        ctx.fillStyle = snakeColour;
        ctx.fillRect(snake[i].offsetX, snake[i].offsetY, snakeWidth, snakeHeight);
        ctx.strokeStyle='white';
        ctx.strokeRect(snake[i].offsetX, snake[i].offsetY, snakeWidth, snakeHeight);
    }
}

$('.play_model_container').css('transform','scale(1)');
$('.model_container').css('transform','scale(0)');
$('.win_container').css('transform','scale(0)');

function move() {
    $("#super").css('display','none');
    $("#display_speed").text(snakeSpeed+'ms');
    clearCanvas();
    createFood();
    snakeMove();
}

var stop_eat_sound;
function createFood() {
    ctx.fillStyle = 'black';
    ctx.fillRect(food.offsetX, food.offsetY,snakeWidth, snakeHeight);

    /*increase score and eat food and snake makes bigger*/
    if (snake[0].offsetX == food.offsetX && snake[0].offsetY == food.offsetY){

        stop_eat_sound = setTimeout(playSound,100);

        score+=2;
        foods++;
        $("#score").text(score);
        $("#display_foodQty").text(foods);

        snake.push({
            offsetX: snake[snake.length - 1].oldX,
            offsetY: snake[snake.length - 1].oldY
        });

        generateNewPosition();

    }
}

function playSound() {
    var eat = $("#eat")[0];
    eat.play();
    $("#super").css('display','block');
}

/*generate new random position for food*/
function generateNewPosition(){

    var x =Math.floor(Math.random() * 10);

    if (x%2 != 0 && x<10 || x%2 == 0 && x<10){
        x = x * 10;
    }else if (x%10 != 0 && 10<x<100 || x%10 == 0 && 10<x<100){
        x = x / 10;
        x = x * 10;
    }
    var y = Math.floor(Math.random() * 10);

    if (y%2 != 0 && y<10 || y%2 == 0 && y<10){
        y = y * 10;
    }else if (y%10 != 0 && 10<y<100 || y%10 == 0 && 10<y<100){
        y = y / 10;
        y = y * 10;
    }
    food.offsetX = x;
    food.offsetY = y;
}

/*running down at the beginning*/
function moveDown() {

    if (keyPress == "ArrowDown"){
        snake[0].offsetY = snake[0].offsetY + gap;
    }
}

var gameover;
/*when snake hits on own body and edge , game over */
function gameOver() {
    for (var i in snake) {

        if (i != 0){
            if (snake[0].offsetX == snake[i].offsetX && snake[0].offsetY == snake[i].offsetY || snake[0].offsetY === canvas.height || snake[0].offsetX == canvas.width || snake[0].offsetY < 0 || snake[0].offsetX < 0 ){

                $('.model_container').css('transform','scale(1)');
                $(".victory_score").text(score);
                $(".spend_time").text($("#display_time").text());
                clearInterval(generate_time);
                clearTimeout(stop_eat_sound);
                gameover = setTimeout(game_over_audio,100);
            }
        }
    }
}

function game_over_audio(){
    var game_over = $("#gameover_audio")[0];
    game_over.play();
}

var gamewin;
function gameWin() {
    if (score >= 5){
        $('.win_container').css('transform','scale(1)');
        $('.model_container').css('transform','scale(0)');
        $(".victory_score").text(score);
        $(".spend_time").text($("#display_time").text());
        clearInterval(generate_time);
        gamewin = setTimeout(game_win_audio,100);
        clearTimeout(stop_eat_sound);
        clearTimeout(over);
    }
}

function game_win_audio() {
    var win_game = $("#gamewin")[0];
    win_game.play();
}

/*snake moving to down, up, left, right*/
function snakeMove() {

    for (var i = 0; i <snake.length ; i++) {

        ctx.fillStyle = snakeColour;
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

/*clear previous box of snake when it move*/
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

/*what's the pressed key*/
$(document).keydown(function (e) {
    keyPress = e.key;
});

function again(){

    snake[0].offsetX = 50;
    snake[0].oldX = 0;
    snake[0].offsetY = 30;
    snake[0].oldY = 0;
    snake[1].offsetX = 50;
    snake[1].oldX = 0;
    snake[1].offsetY = 20;
    snake[1].oldY = 0;
    snake[2].offsetX = 50;
    snake[2].oldX = 0;
    snake[2].offsetY = 10;
    snake[2].oldY = 0;

    food.offsetY = 100;
    food.offsetX = 100;

    keyPress = "ArrowDown";

    move();

    score = 0;
    time = 0;
    foods = 0;
    $("#score").text(0);
    $("#display_foodQty").text(0);
    $("#display_time").text(0);

    if (snake.length > 3) {
        for (var i = 0; i < snake.length; i++) {
            snake.splice(i + 3, snake.length - 3);
        }
    }
}

$("#btnOk").on('click',function () {
    $('.model_container').css('transform','scale(0)');
    $('.win_container').css('transform','scale(0)');
    clearInterval(generate_time);
    generate_time = setInterval(setTime,1000);
    $(".victory_score").text(0);
    $(".spend_time").text(0);
    play.play();
    again();
    $('.play_model_container').css('transform','scale(1)');
});

$("#btnOkInWin").on('click',function () {
    $('.win_container').css('transform','scale(0)');
    $('.model_container').css('transform','scale(0)');
    clearInterval(generate_time);
    generate_time = setInterval(setTime,1000);
    $(".victory_score").text(0);
    $(".spend_time").text(0);
    play.play();
    again();
    $('.play_model_container').css('transform','scale(1)');
});

$("#close").on('click',function () {
    $(".victory_score").text(0);
    $(".spend_time").text(0);
    $('.play_model_container').css('transform', 'scale(0)');
    $('.model_container').css('transform', 'scale(0)');
    $('.win_container').css('transform', 'scale(0)');
    clearInterval(generate_time);
    clearTimeout(stop_eat_sound);
    clearInterval(win);
    clearInterval(over);
    again();
    $("#homePage").css('display', 'block');
    $("#playSection").css('display', 'none');
    $("#speed").css('display', 'none');
    $("#colours").css('display', 'none');

    play.play();
});

$("#closeInWin").on('click',function () {
    $(".victory_score").text(0);
    $(".spend_time").text(0);
    $('.play_model_container').css('transform', 'scale(0)');
    $('.model_container').css('transform', 'scale(0)');
    $('.win_container').css('transform', 'scale(0)');
    clearInterval(generate_time);
    clearTimeout(stop_eat_sound);
    clearInterval(win);
    clearInterval(over);
    again();
    $("#homePage").css('display', 'block');
    $("#playSection").css('display', 'none');
    $("#speed").css('display', 'none');
    $("#colours").css('display', 'none');

    play.play();
});

var stop;
var stop_move;
var generate_time;
var play = $("#play")[0];

var over;
var win;

$("#play_mode_btn").on('click',function () {
    clearInterval(stop);
    clearInterval(stop_move);
    clearInterval(generate_time);
    clearInterval(gamewin);
    clearTimeout(stop_eat_sound);
    $('.play_model_container').css('transform','scale(0)');
    $('.model_container').css('transform','scale(0)');
    $('.win_container').css('transform','scale(0)');
    stop_move = setInterval(move,snakeSpeed);
    stop = setInterval(moveDown,snakeSpeed);
    generate_time = setInterval(setTime,1000);
    again();

    clearInterval(over);
    over=setInterval(gameOver,100);

    clearInterval(win);
    win=setInterval(gameWin,100);

    play.play();

    $('#play_btn').hide();
    $('#stop_btn').hide();
    $('#pause_btn').hide();
    $('#home_btn').hide();
    $('#volume_btn').hide();
});

$("#close_play_model").on('click',function () {
    $('.play_model_container').css('transform','scale(0)');
    $('.model_container').css('transform','scale(0)');
    $('.win_container').css('transform','scale(0)');
    $("#homePage").css('display','block');
    $("#playSection").css('display','none');
    $("#speed").css('display','none');
    $("#colours").css('display','none');
    clearInterval(generate_time);
    clearTimeout(stop_eat_sound);
    again();

    clearInterval(win);
    clearInterval(over);

});

$("#close_over_model").on('click',function () {
    $('.play_model_container').css('transform', 'scale(0)');
    $('.model_container').css('transform', 'scale(0)');
    $('.win_container').css('transform', 'scale(0)');
    clearInterval(generate_time);
    clearTimeout(stop_eat_sound);
    clearInterval(win);
    clearInterval(over);
    again();
    $("#homePage").css('display', 'block');
    $("#playSection").css('display', 'none');
    $("#speed").css('display', 'none');
    $("#colours").css('display', 'none');
});

$("#close_win_model").on('click',function () {
    $('.play_model_container').css('transform', 'scale(0)');
    $('.model_container').css('transform', 'scale(0)');
    $('.win_container').css('transform', 'scale(0)');
    clearInterval(generate_time);
    clearTimeout(stop_eat_sound);
    clearInterval(win);
    clearInterval(over);
    again();
    $("#homePage").css('display', 'block');
    $("#playSection").css('display', 'none');
    $("#speed").css('display', 'none');
    $("#colours").css('display', 'none');
});

$("#stop_btn").on('click',function () {
    $('.play_model_container').css('transform','scale(0)');
    $('.model_container').css('transform','scale(0)');
    $('.win_container').css('transform','scale(0)');
    $("#homePage").css('display','block');
    $("#playSection").css('display','none');
    $("#speed").css('display','none');
    $("#colours").css('display','none');
    clearInterval(generate_time);
    clearTimeout(stop_eat_sound);

    again();
    var menu = $("#menu_btn")[0];
    menu.play();

    clearInterval(win);
    clearInterval(over);
});

$("#play_btn").on('click',function () {
    clearInterval(stop);
    clearInterval(stop_move);
    clearInterval(generate_time);
    stop_move = setInterval(move,snakeSpeed);
    stop = setInterval(moveDown,snakeSpeed);
    generate_time = setInterval(setTime,1000);
    var menu = $("#menu_btn")[0];
    menu.play();
});

$("#pause_btn").on('click',function () {
    clearInterval(stop_move);
    clearInterval(genetate_time);
    var menu = $("#menu_btn")[0];
    menu.play();
});

$("#home_btn").on('click',function () {
    $('.play_model_container').css('transform','scale(0)');
    $('.model_container').css('transform','scale(0)');
    $('.win_container').css('transform','scale(0)');
    $("#homePage").css('display','block');
    $("#playSection").css('display','none');
    $("#speed").css('display','none');
    $("#colours").css('display','none');
    clearInterval(generate_time);
    clearTimeout(stop_eat_sound);
    again();
    var menu = $("#menu_btn")[0];
    menu.play();
    clearInterval(win);
    clearInterval(over);
});

$("#volume_btn").on('click',function () {
    var menu = $("#menu_btn")[0];
    menu.play();
});

$("#menu").on('click',function () {
    var menu_sound = $("#menu_sound")[0];
    menu_sound.play();
    $('#play_btn').toggle('slow');
    $('#stop_btn').toggle('slow');
    $('#pause_btn').toggle('slow');
    $('#home_btn').toggle('slow');
    $('#volume_btn').toggle('slow');
});

/*-------------------------------------------------------------------------------*/

$("#playSection").css('display','none');
$("#homePage").css('display','block');
$("#speed").css('display','none');
$("#colours").css('display','none');

$("#startBoard").on('click',function () {
    $("#homePage").css('display','none');
    $("#playSection").css('display','none');
    $("#speed").css('display','none');
    $("#colours").css('display','block');
});

$("#button1").on('click',function () {
    $("#homePage").css('display','none');
    $("#playSection").css('display','none');
    $("#speed").css('display','block');
    $("#colours").css('display','none');
    snakeColour = 'red';
});

$("#button2").on('click',function () {
    $("#homePage").css('display','none');
    $("#playSection").css('display','none');
    $("#speed").css('display','block');
    $("#colours").css('display','none');
    snakeColour = 'yellow';
});

$("#button3").on('click',function () {
    $("#homePage").css('display','none');
    $("#playSection").css('display','none');
    $("#speed").css('display','block');
    $("#colours").css('display','none');
    snakeColour = 'blue';
});

$("#button4").on('click',function () {
    $("#homePage").css('display','none');
    $("#playSection").css('display','none');
    $("#speed").css('display','block');
    $("#colours").css('display','none');
    snakeColour = 'green';
});

$("#speed_btn1_image").on('click',function () {
    $("#homePage").css('display','none');
    $("#playSection").css('display','block');
    $("#speed").css('display','none');
    $("#colours").css('display','none');
    snakeSpeed = 300;
    $('.play_model_container').css('transform','scale(1)');
    $('.model_container').css('transform','scale(0)');
    $('.win_container').css('transform','scale(0)');
});

$("#speed_btn2_image").on('click',function () {
    $("#homePage").css('display','none');
    $("#playSection").css('display','block');
    $("#speed").css('display','none');
    $("#colours").css('display','none');
    snakeSpeed = 500;
    $('.play_model_container').css('transform','scale(1)');
    $('.model_container').css('transform','scale(0)');
    $('.win_container').css('transform','scale(0)');
});

$("#speed_btn3_image").on('click',function () {
    $("#homePage").css('display','none');
    $("#playSection").css('display','block');
    $("#speed").css('display','none');
    $("#colours").css('display','none');
    snakeSpeed = 800;
    $('.play_model_container').css('transform','scale(1)');
    $('.model_container').css('transform','scale(0)');
    $('.win_container').css('transform','scale(0)');
});




