const undoBtn = document.getElementById("undo");
const clearBtn = document.getElementById("clear");
const colorFields = document.querySelectorAll(".color-field");
const colorPicker = document.querySelector(".color-picker");
const penRange = document.querySelector(".pen-range");
const brush = document.getElementById("brush");
const line = document.getElementById("line");
const polygon = document.getElementById("polygon");
const ellipse = document.getElementById("ellipse");
const circle = document.getElementById("circle");
const square = document.getElementById("square");
const regtangle = document.getElementById("regtangle");
const triangle = document.getElementById("triangle");
const star = document.getElementById("star");
const text = document.getElementById("text");
const copy = document.getElementById("copy");
const eraser =  document.getElementById("eraser");

let stage = new Konva.Stage({
  width: 2000,
  height: 900,
  container: "konva-holder",
});

let layer = new Konva.Layer();
stage.add(layer);

let _rectangle = null;
let _square = null;
let _circle = null;
let _star = null;
let _lastLine = null;
let _line = null;
let isDrawing = false;
let currentTool = "brush";
let currentShape = null;
let strokeColor = "black";
let defaultColor = "#145539";
let strokeWidth = 2;
let isDraggable = false;

const mousedownHandler = function () {
  isDrawing = true;
  const pos = stage.getPointerPosition();

  if (currentTool === "brush") {
    _lastLine = new Konva.Line({
      stroke: strokeColor,
      strokeWidth: strokeWidth,
      lineCap: "round",
      points: [pos.x, pos.y, pos.x, pos.y],
    });
    layer.add(_lastLine).batchDraw();
  }

  if (currentTool === "regtangle") {
    _rectangle = new Konva.Rect({
      x: pos.x,
      y: pos.y,
      fill: "white",
      width: 0,
      height: 0,
      stroke: strokeColor,
      strokeWidth: strokeWidth,
      draggable: isDraggable,
    });
    layer.add(_rectangle).batchDraw();
  }

  if (currentTool === "circle") {
    _circle = new Konva.Circle({
      x: pos.x,
      y: pos.y,
      radius: 0,
      fill: "white",
      stroke: strokeColor,
      strokeWidth: strokeWidth,
      outerRadius: 0,
      innerRadius: 0,
      draggable: isDraggable,
    });
    layer.add(_circle);
  }

  if (currentTool === "star") {
    _star = new Konva.Star({
      x: pos.x,
      y: pos.y,
      fill: "white",
      stroke: strokeColor,
      strokeWidth: strokeWidth,
      outerRadius: 0,
      innerRadius: 0,
      draggable: isDraggable,
    });
    layer.add(_star);
  }

  if (currentTool === "square") {
    _square = new Konva.Rect({
      x: pos.x,
      y: pos.y,
      fill: "white",
      width: 0,
      height: 0,
      stroke: strokeColor,
      strokeWidth: strokeWidth,
      draggable: isDraggable,
    });
    layer.add(_square).batchDraw();
  }

  if (currentTool === "eraser") {
    _lastLine = new Konva.Line({
      stroke: '#fff',
      strokeWidth: strokeWidth,
      lineCap: "round",
      points: [pos.x, pos.y, pos.x, pos.y],
    });
    layer.add(_lastLine).batchDraw();
  }

};

const mousemoveHandler = function () {
  if (!isDrawing) return false;

  const pos = stage.getPointerPosition();

  if (currentTool === "brush") {
    let newPoints = _lastLine.points().concat([pos.x,pos.y]);
    _lastLine.points(newPoints);
  }


  if (currentTool === "regtangle") {
    const newWidth = pos.x - _rectangle.x();
    const newHeight = pos.y - _rectangle.y();
    _rectangle.width(newWidth).height(newHeight);
  }

  if (currentTool === "square") {
    const newWidth = pos.x - _square.x();
    _square.width(newWidth).height(newWidth);
  }

  if (currentTool === "circle") {
    const rise = Math.abs(pos.y - _circle.y());
    const run = Math.abs(pos.x - _circle.x());
    let newRadius = rise + run;
    _circle.radius(newRadius);
  }

  if (currentTool === "star") {
    const rise = Math.abs(pos.y - _star.y());
    const run = Math.abs(pos.x - _star.x());
    let newRadius = rise + run;
    _star.outerRadius(newRadius * 2.5);
    _star.innerRadius(newRadius);
  }

  if (currentTool === "eraser") {
    let newPoints = _lastLine.points().concat([pos.x,pos.y]);
    _lastLine.points(newPoints);
  }

  layer.batchDraw();
};

const mouseupHandler = function () {
  isDrawing = false;
};

const changeTool = function (selectedTool,tool) {
  currentTool = selectedTool;
  brush.className = "";
  circle.className = "";
  square.className = "";
  regtangle.className = "";
  eraser.className = "";
  star.className = "";
  tool.className = "selected";
};

const changeLinecolor = function (color) {
  strokeColor = color;
};

const updateColors = function (e) {
  //change pen color
  defaultColor = e.target.value;
  changeLinecolor(defaultColor);

  //change color fields
  colorFields.forEach((colorField) => {
    if (colorField.nextElementSibling) {
      colorField.style.backgroundColor =
        colorField.nextElementSibling.style.backgroundColor;
    } else {
      colorField.style.backgroundColor = e.target.value;
    }
  });
};

const updateStroke = function () {
  strokeWidth = penRange.value;
};

const startup = function () {
  stage.on("mousedown touchstart", mousedownHandler);
  stage.on("mousemove touchmove", mousemoveHandler);
  stage.on("mouseup touchend", mouseupHandler);

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

  brush.addEventListener("click", function () {
    changeTool("brush",this);
  });

  regtangle.addEventListener("click", function () {
    changeTool("regtangle",this);
  });

  circle.addEventListener("click", function () {
    changeTool("circle",this);
  });

  star.addEventListener("click", function () {
    changeTool("star",this);
  });

  square.addEventListener("click", function () {
    changeTool("square",this);
  });

  eraser.addEventListener("click", function () {
    changeTool("eraser",this);
  });
};

window.addEventListener("load", startup, false);

// clear - button -polygon - ellipse - line
//draggable - copy 
//text- image upload - save
//scss + icons