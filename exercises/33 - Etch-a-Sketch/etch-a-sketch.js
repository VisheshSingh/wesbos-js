// Select the elements - canvas and shake btn
const canvas = document.querySelector('#etch-a-sketch');
const ctx = canvas.getContext('2d');
const shake = document.querySelector('.shake');

// Get the dimensions of canvas
const { width, height } = canvas;
const MOVE_AMOUNT = 10;

// Get random values for x and y coords
let x = Math.floor(Math.random() * width);
let y = Math.floor(Math.random() * height);

// Set the display properties for canvas line
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 10;

// Create a starting mark on the canvas
let hue = 0;
ctx.strokeStyle = `hsl(${hue},100%, 50%)`;

ctx.beginPath();
ctx.moveTo(x, y);
ctx.lineTo(x, y);
ctx.stroke();

// Create a draw function
function drawOnCanvas({ key }) {
  hue += 1;
  ctx.beginPath();
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
  ctx.moveTo(x, y);
  switch (key) {
    case 'ArrowUp':
      y = y - MOVE_AMOUNT;
      break;
    case 'ArrowRight':
      x = x + MOVE_AMOUNT;
      break;
    case 'ArrowDown':
      y = y + MOVE_AMOUNT;
      break;
    case 'ArrowLeft':
      x = x - MOVE_AMOUNT;
      break;
    default:
      break;
  }
  ctx.lineTo(x, y);
  ctx.stroke();
}

// Event Hanlders
function handleKeyup(e) {
  if (e.key.includes('Arrow')) {
    e.preventDefault();
    drawOnCanvas({ key: e.key });
  }
}

function clearCanvas(e) {
  canvas.classList.add('shake');
  ctx.clearRect(0, 0, width, height);
  canvas.addEventListener(
    'animationend',
    () => {
      canvas.classList.remove('shake');
    },
    { once: true }
  );
}

// Listen to keyboard events
window.addEventListener('keydown', handleKeyup);
shake.addEventListener('click', clearCanvas);
