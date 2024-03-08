const canvas = new fabric.Canvas("c")

const body = document.querySelector('body')

body.addEventListener('dragover', function(e) {
    e.preventDefault()
    e.stopPropagation()
    e.dataTransfer.dropEffect = 'copy'
})

body.addEventListener('drop', (event) => {
    event.stopPropagation();
    event.preventDefault();
    const file = event.dataTransfer.files[0]; // Prend le premier fichier glissé
    const fileUrl = URL.createObjectURL(file); // Crée une URL pour le fichier

    fabric.Image.fromURL(fileUrl, function(oImg) {
        canvas.add(oImg); // Ajoute l'image au canvas de Fabric.js
    });
});

const imageName= 'test rudy.jpg'


function importImage() {
    const img = document.createElement('img')
    img.src = `test rudy.jpg`
    img.onload = function() {
        const image = new fabric.Image(img)
        canvas.add(image)
    }
}



canvas.on('mouse:wheel', function(opt) {
    var delta = opt.e.deltaY;
    var zoom = canvas.getZoom();
    zoom *= 0.999 ** delta;
    if (zoom > 20) zoom = 20;
    if (zoom < 0.01) zoom = 0.01;
    canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
    opt.e.preventDefault();
    opt.e.stopPropagation();
  });



/* function addSecondImage() {
    fabric.Image.fromURL(`C:\\Users\\r.cerezo\\Documents\\${imageName}`, function(oImg) {
        canvas.add(oImg)
    })
} */

function draw() {
    if (canvas.isDrawingMode) {
        canvas.isDrawingMode = false
    } else {
        canvas.isDrawingMode = true
    }
}

function deleteObject() {
    canvas.remove(canvas.getActiveObject())
}

function getEvent(params){
    const event = params.e
    console.log("params", params)
    console.log("event", event)
    if (event.altKey === true) {
        canvas.isDragging = true
        canvas.selection = false
        canvas.lastPosX = event.clientX
        canvas.lastPosY = event.clientY
    }
}

canvas.on('mouse:down', getEvent)

canvas.on('mouse:move', function(opt) {
    if (canvas.isDragging) {
      var e = opt.e;
      var vpt = canvas.viewportTransform;
      console.log("vpt", vpt)
      vpt[4] += e.clientX - canvas.lastPosX;
      vpt[5] += e.clientY - canvas.lastPosY;
      canvas.requestRenderAll();
      canvas.lastPosX = e.clientX;
      canvas.lastPosY = e.clientY;
    }
  });

canvas.on('mouse:up', function(opt) {
// on mouse up we want to recalculate new interaction
// for all objects, so we call setViewportTransform
    canvas.setViewportTransform(canvas.viewportTransform);
    canvas.isDragging = false;
    canvas.selection = true;
});


function saveCanvas() {
    const canvasData = document.getElementById('c').toDataURL()
    console.log("canvasData", canvasData)
    const resultBase64Tag = document.createElement('p')
    resultBase64Tag.id = 'resultBase64'
    resultBase64Tag.innerHTML = canvasData
    body.appendChild(resultBase64Tag)
    /*   const a = document.createElement('a')
    a.href = canvasData
    a.download = 'canvas-image.png'
    a.click() */

}

document.getElementById('file').addEventListener('change', handleFileSelect, false)

function handleFileSelect(evt) {
    const file = evt.target.files[0];
    const fileUrl = URL.createObjectURL(file)
    fabric.Image.fromURL(fileUrl, function(oImg) {
        console.log("oImg", oImg)
        canvas.add(oImg)
    })
    
}

function downloadImage() {
    const element = document.createElement('a')
    element.setAttribute('href', canvas.toDataURL('image/jpeg', 1.0))
    element.setAttribute('download', 'test_rudy_download.jpg')

    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
}