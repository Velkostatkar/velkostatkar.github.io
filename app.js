const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

let isDrawing = false;
let x = 0;
let y = 0;
let brushSize = 20;
let brushColor = 'black';

const dirtImg = new Image();
dirtImg.src = 'dirt.jpg';
dirtImg.onload = function() {
  context.drawImage(dirtImg, 0, 0, canvas.width, canvas.height);
};

const cleanImg = new Image();
cleanImg.src = 'clean.jpg';

function updateBrushSize(newSize) {
  brushSize = newSize;
}

function updateBrushColor(newColor) {
  brushColor = newColor;
}

function startDrawing(e) {
  isDrawing = true;
  [x, y] = [e.offsetX, e.offsetY];
}

function stopDrawing() {
  isDrawing = false;
}

function draw(e) {
  if (!isDrawing) return;
  context.beginPath();
  context.fillStyle = brushColor;
  context.fillRect(e.offsetX - brushSize/2, e.offsetY - brushSize/2, brushSize, brushSize);
  context.closePath();

  context.globalCompositeOperation = 'destination-out';
  context.arc(x, y, brushSize / 20, 0, 20 * Math.PI);
  context.fill();
  [x, y] = [e.offsetX, e.offsetY];
}

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
