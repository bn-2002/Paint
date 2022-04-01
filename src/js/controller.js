const canvas = document.getElementById('canvas');
console.log(canvas);

canvas.width = window.innerWidth;
canvas.height = 800;

let context = canvas.getContext('2d');

context.fillStyle = "white";
context.fillRect(0,0,canvas.width,canvas.height);

let drawColor = 'black';
let drawWidth = '2';
let isDrawing = false;

const start = function(event) {
    if (isDrawing) isDrawing = false; else isDrawing=true;
    context.beginPath();
    context.moveTo(event.clientX -  canvas.offsetLeft , event.clientY -  canvas.offsetTop);
    event.preventDefault();
}

const draw = function(event) {
        if (isDrawing) {
            context.lineTo(event.clientX +  canvas.offsetLeft , event.clientY +  canvas.offsetTop);
            context.strokeStyle = drawColor;
            context.lineWidth = drawWidth;
            context.lineCap = "round";
            context.lineJoin = "round";
            context.stroke();     
        }
}

canvas.addEventListener('touchstart',start,false);
canvas.addEventListener('touchmove',draw,false);
canvas.addEventListener('mousedown',start,false);
canvas.addEventListener('mousemove',draw,false);



