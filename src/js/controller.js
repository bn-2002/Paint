const canvas = document.getElementById("canvas");
console.log(canvas);

canvas.width = window.innerWidth;
canvas.height = 800;

let context = canvas.getContext("2d");
let startBackgroundColor = "white";
context.fillStyle = startBackgroundColor;
context.fillRect(0, 0, canvas.width, canvas.height);

let drawColor = "black";
let drawWidth = "2";
let isDrawing = false;
let restoreArray = [];
let index = -1;

const start = function (event) {
  isDrawing = true;
  context.beginPath();
  context.moveTo(event.clientX - canvas.offsetLeft,event.clientY - canvas.offsetTop);
  event.preventDefault();
};

const draw = function (event) {
  if (isDrawing) {
    context.lineTo(event.clientX + canvas.offsetLeft,event.clientY + canvas.offsetTop);
    context.strokeStyle = drawColor;
    context.lineWidth = drawWidth;
    context.lineCap = "round";
    context.lineJoin = "round";
    context.stroke();
  }
  event.preventDefault();
};

const stop = function(e) {
  if (isDrawing) {
    context.stroke();
    context.closePath();
    isDrawing = false;
  }
  e.preventDefault();
  if (e.type !== 'mouseout') {
    restoreArray.push(context.getImageData(0,0,canvas.width,canvas.height));
    index += 1;
  }
  console.log(restoreArray);
}

canvas.addEventListener("touchstart",start,false);
canvas.addEventListener("touchmove",draw,false);
canvas.addEventListener("mousedown",start,false);
canvas.addEventListener("mousemove",draw,false);

canvas.addEventListener("touchend",stop,false);
canvas.addEventListener("mouseup",stop,false);
canvas.addEventListener("mouseout",stop,false);


const colorFileds = document.querySelectorAll(".color-filed");

colorFileds.forEach((colorField) => {
  colorField.addEventListener("click", function () {
    changeLinecolor(colorField.style.backgroundColor);
  });
});

const changeLinecolor = function (color) {
  drawColor = color;
};

const penRange = document.querySelector(".pen-range");

const colorPicker = document.querySelector(".color-picker");

let defaultColor = "#145539";

window.addEventListener("load", startup, false);

function startup() {
  colorPicker.value = defaultColor;
  colorPicker.addEventListener("change", updateColors, false);
  colorPicker.select();
  penRange.addEventListener("input", updateStroke, false);
}

const updateColors = function (e) {
  defaultColor = e.target.value;
  changeLinecolor(defaultColor);
  colorFileds.forEach((colorField) => {
    if (colorField.nextElementSibling) {
      console.log(colorField);
      colorField.style.backgroundColor =
        colorField.nextElementSibling.style.backgroundColor;
    } else {
      colorField.style.backgroundColor = e.target.value;
    }
  });
};

const updateStroke = function () {
  drawWidth = penRange.value;
};

const clearBtn = document.querySelector(".clear-btn");

const clearCanvas = function () {
  context.fillStyle = startBackgroundColor;
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillRect(0, 0, canvas.width, canvas.height);
  restoreArray = [];
  index = -1;
};

clearBtn.addEventListener("click", clearCanvas);

const undoBtn = document.querySelector(".undo-btn");

const undoLast = function () {
  if (index <= 0) {
    clearCanvas();
  } else {
    index -= 1;
    restoreArray.pop();
    console.log(restoreArray[index]);
    context.putImageData(restoreArray[index],0,0);
  }
};


undoBtn.addEventListener("click", undoLast);

