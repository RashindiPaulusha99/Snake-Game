$("#play_btn").on('click',function () {
    var menu = $("#menu_btn")[0];
    menu.play();
});

$("#pause_btn").on('click',function () {
    var menu = $("#menu_btn")[0];
    menu.play();
});

$("#stop_btn").on('click',function () {
    var menu = $("#menu_btn")[0];
    menu.play();
    clearInterval(stop);
    clearInterval(stop_move);
});

$("#home_btn").on('click',function () {
    var menu = $("#menu_btn")[0];
    menu.play();
});

$("#volume_btn").on('click',function () {
    var menu = $("#menu_btn")[0];
    menu.play();
});