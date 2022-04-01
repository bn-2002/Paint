const canvas = document.getElementById("canvas");
console.log(canvas);

canvas.width = window.innerWidth;
canvas.height = 800;

let context = canvas.getContext("2d");

context.fillStyle = "white";
context.fillRect(0, 0, canvas.width, canvas.height);

let drawColor = "black";
let drawWidth = "2";
let isDrawing = false;

const start = function (event) {
  if (isDrawing) {
    context.stroke();
    context.closePath();
    isDrawing = false;
  } else {
    isDrawing = true;
  }
  context.beginPath();
  context.moveTo(
    event.clientX - canvas.offsetLeft,
    event.clientY - canvas.offsetTop
  );
  event.preventDefault();
};

const draw = function (event) {
  if (isDrawing) {
    context.lineTo(
      event.clientX + canvas.offsetLeft,
      event.clientY + canvas.offsetTop
    );
    context.strokeStyle = drawColor;
    context.lineWidth = drawWidth;
    context.lineCap = "round";
    context.lineJoin = "round";
    context.stroke();
  }
  event.preventDefault();
};

canvas.addEventListener("touchstart", start, false);
canvas.addEventListener("touchmove", draw, false);
canvas.addEventListener("mousedown", start, false);
canvas.addEventListener("mousemove", draw, false);

const colorFileds = document.querySelectorAll(".color-filed");

colorFileds.forEach(colorField => {
  colorField.addEventListener("click", function () {
    changeLinecolor(colorField.style.backgroundColor);
  });
});

const changeLinecolor = function (color) {
  drawColor = color;
};

let colorPicker = document.querySelector('.color-picker');

let defaultColor = '#145539';

window.addEventListener("load", startup, false);
function startup() {
  colorPicker.value = defaultColor;
  colorPicker.addEventListener("change", updateAll, false);
  colorPicker.select();
}


const updateAll = function(e) {

  defaultColor = e.target.value;

  changeLinecolor(defaultColor);


  colorFileds.forEach((colorField) => {
    if (colorField.nextElementSibling) {
      console.log(colorField);
      colorField.style.backgroundColor = colorField.nextElementSibling.style.backgroundColor;
      } else {
        colorField.style.backgroundColor = e.target.value;
      }
  });
}

