 const rect = new fabric.Rect({
    left: 100,
    top: 100,
    fill: "transparent",
    width: 3000,
    height: 1000,
    angle: 0,
    stroke: "blue",
    strokeWidth: 3
  });

 const carre = new fabric.Rect({
    left: 100,
    top: 100,
    fill: 'black',
    width: 1000,
    height: 1000,
    angle: 0
  });

 const triangle = new fabric.Triangle({
    width: 1000, height: 1000, fill: 'black', left: 50, top: 50
  });

 const cercle = new fabric.Circle({
    radius: 500, fill: 'black', left: 100, top: 100
  });

const ligne = new fabric.Line({
  x1: 0 ,y1:0, x2: 100, y2 :100
});


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

function addRect() {
  canvas.add(rect)
}

function addCarre() {
  canvas.add(carre)
}

function addTriangle() {
  canvas.add(triangle)
}

function addCercle() {
  canvas.add(cercle)
}

function ChangeColor (){
  const objetChange = canvas.getActiveObject()
  objetChange.set("fill","red");
  canvas.requestRenderAll();
}