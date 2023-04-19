const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

let isDrawing = false;
let x = 0;
let y = 0;
let brushWidth = 30;
let brushHeight = 8;
let brushColor = 'black';

const dirtImg = new Image();
dirtImg.src = 'dirt.jpg';
dirtImg.onload = function() {
  context.drawImage(dirtImg, 0, 0, canvas.width, canvas.height);
};

const cleanImg = new Image();
cleanImg.src = 'clean.jpg';

function updateBrushSize(newWidth, newHeight) {
  brushWidth = newWidth;
  brushHeight = newHeight;
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
  context.fillRect(e.offsetX - brushWidth/2, e.offsetY - brushHeight/2, brushWidth, brushHeight);
  context.closePath();

  context.globalCompositeOperation = 'destination-out';
  context.beginPath();
  context.moveTo(x, y);
  context.lineTo(e.offsetX, y);
  context.lineWidth = brushHeight;
  context.stroke();
  context.closePath();
  
  [x, y] = [e.offsetX, e.offsetY];
}

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);

const brushSizeInput = document.getElementById('brush-size-input');
brushSizeInput.addEventListener('input', () => {
  const brushSizeRange = brushSizeInput.value;
  const newBrushWidth = brushSizeRange / 130 * (120 - 30) + 30;
  updateBrushSize(newBrushWidth, brushHeight);
});
// Get the custom cursor element
const customCursor = document.getElementById('custom-cursor');

// Hide the default cursor
document.body.style.cursor = 'none';

// Add a mousemove event listener to update the position of the custom cursor
document.addEventListener('mousemove', (e) => {
  customCursor.style.left = `${e.clientX}px`;
  customCursor.style.top = `${e.clientY}px`;
});