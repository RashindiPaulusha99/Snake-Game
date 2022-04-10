$(window).on('load',function () {
    $("#container").fadeOut(1000);
});

$("#startBoard").on('click',function () {
    var audio = $("audio")[0];
    audio.play();
});