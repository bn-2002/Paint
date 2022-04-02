const canvas = document.getElementById("canvas");
const colorFields = document.querySelectorAll(".color-field");
const penRange = document.querySelector(".pen-range");
const colorPicker = document.querySelector(".color-picker");
const clearBtn = document.querySelector(".clear-btn");
const undoBtn = document.querySelector(".undo-btn");

canvas.width = window.innerWidth;
canvas.height = 800;
let context = canvas.getContext("2d");
let startBackgroundColor = "white";
context.fillStyle = startBackgroundColor;
context.fillRect(0, 0, canvas.width, canvas.height);
let drawColor = "black";
let defaultColor = "#145539";
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
}

const changeLinecolor = function (color) {
  drawColor = color;
};

const updateColors = function (e) {
  //change pen color
  defaultColor = e.target.value;
  changeLinecolor(defaultColor);

  //change color fields
  colorFields.forEach((colorField) => {
    if (colorField.nextElementSibling) {
      colorField.style.backgroundColor = colorField.nextElementSibling.style.backgroundColor;
    } else {
      colorField.style.backgroundColor = e.target.value;
    }
  });
};

const updateStroke = function () {
  drawWidth = penRange.value;
};

const clearCanvas = function () {
  context.fillStyle = startBackgroundColor;
  context.clearRect(0,0,canvas.width,canvas.height);
  context.fillRect(0,0,canvas.width,canvas.height);

  //Reset restore Array
  restoreArray = [];
  index = -1;
};

const startup = function() {
  //change color picker color => change pen color 
  colorPicker.value = defaultColor;
  colorPicker.addEventListener("change", updateColors, false);
  colorPicker.select();

  //handle pen rage to set stroke
  penRange.addEventListener("input", updateStroke, false);

  //change color fields according to color picker
  colorFields.forEach((colorField) => {
    colorField.addEventListener("click", function () {
      changeLinecolor(colorField.style.backgroundColor);
    });
  });  

}

const undoLast = function () {
  if (index <= 0) {
    clearCanvas();
  } else {
    index -= 1;
    restoreArray.pop();
    context.putImageData(restoreArray[index],0,0);
  }
};

const controllMouseEvents = function() {
  canvas.addEventListener("touchstart",start,false);
  canvas.addEventListener("touchmove",draw,false);
  canvas.addEventListener("mousedown",start,false);
  canvas.addEventListener("mousemove",draw,false);
  canvas.addEventListener("touchend",stop,false);
  canvas.addEventListener("mouseup",stop,false);
  canvas.addEventListener("mouseout",stop,false);
}

const controllButtons = function() {
  clearBtn.addEventListener("click",clearCanvas);
  undoBtn.addEventListener("click",undoLast);  
}

const init = function() {
  window.addEventListener("load",startup,false);
  controllMouseEvents();
  controllButtons();
}

init();
