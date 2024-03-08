

let canvas;
let ctx;
let drawing = false;
let scrollX     = 0;
let scrollY     = 0;
let scale       = 1;
let scaleFactor = 1;



document.addEventListener("DOMContentLoaded", function() {
    canvas = document.getElementById("drawingCanvas");
    ctx = canvas.getContext("2d");

    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mouseout", stopDrawing);
});

function startDrawing(e) {
    drawing = true;
    draw(e); // Commence à dessiner immédiatement
}

function draw(e) {
    if (!drawing) return;

    ctx.lineWidth = 5; // Épaisseur du trait
    ctx.lineCap = "round"; // Forme du trait
    ctx.strokeStyle = "black"; // Couleur du trait

    ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
}

function stopDrawing() {
    drawing = false;
    ctx.beginPath(); // Commence un nouveau chemin pour éviter de connecter les points
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function importImage() {
    const img = new Image();
    img.src = "test.jpg"

    img.onload = function() {
        const imageWidth = img.width;
        const imageHeight = img.height;
        ctx.drawImage(img, 0, 0, imageWidth / 4, imageHeight / 4);
    }
}
