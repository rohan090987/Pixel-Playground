const canvas = document.getElementById("drawingCanvas");
const ctx = canvas.getContext("2d");
const colorPicker = document.getElementById("colorPicker");
const clearBtn = document.getElementById("clearBtn");

// Set canvas size
canvas.width = window.innerWidth * 0.9;
canvas.height = window.innerHeight * 0.7;

let drawing = false;

canvas.addEventListener("mousedown", start);
canvas.addEventListener("touchstart", start);

canvas.addEventListener("mouseup", stop);
canvas.addEventListener("mouseout", stop);
canvas.addEventListener("touchend", stop);

canvas.addEventListener("mousemove", draw);
canvas.addEventListener("touchmove", drawTouch);

function start(e) {
  drawing = true;
  ctx.beginPath();
}

function stop() {
  drawing = false;
}

function draw(e) {
  if (!drawing) return;
  ctx.lineWidth = 4;
  ctx.lineCap = "round";
  ctx.strokeStyle = colorPicker.value;

  ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
}

function drawTouch(e) {
  if (!drawing) return;
  e.preventDefault();
  const touch = e.touches[0];
  draw({ clientX: touch.clientX, clientY: touch.clientY });
}

clearBtn.onclick = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};
