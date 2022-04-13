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

var snakeColour;
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

var snakeSpeed;
$("#speed_btn1_image").on('click',function () {
    $("#homePage").css('display','none');
    $("#playSection").css('display','block');
    $("#speed").css('display','none');
    $("#colours").css('display','none');
    snakeSpeed = 300;
});

$("#speed_btn2_image").on('click',function () {
    $("#homePage").css('display','none');
    $("#playSection").css('display','block');
    $("#speed").css('display','none');
    $("#colours").css('display','none');
    snakeSpeed = 500;
});

$("#speed_btn3_image").on('click',function () {
    $("#homePage").css('display','none');
    $("#playSection").css('display','block');
    $("#speed").css('display','none');
    $("#colours").css('display','none');
    snakeSpeed = 800;
});