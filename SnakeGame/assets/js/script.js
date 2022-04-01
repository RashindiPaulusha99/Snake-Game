const canvas = $('#canvas')[0];
const ctx = canvas.getContext('2d');

/*
var snake=[
    {of}
];*/

createSnake();
function createSnake() {
    ctx.fillStyle = 'red';
    ctx.fillRect(50, 80, 10, 10);
    ctx.strokeStyle='white';
    ctx.strokeRect(50, 80, 10, 10);
}
