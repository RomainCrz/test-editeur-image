let isDragging = false;

canvas.on('mouse:wheel', zoom);

canvas.on('mouse:down', getEvent)

canvas.on('mouse:move', dragCanvas);
  
canvas.on('mouse:up', refreshCanvasAfterDrag);

function getEvent(params){
    const event = params.e
    if (event.altKey === true || isDragging === true) {
        canvas.isDragging = true
        canvas.selection = false
        canvas.lastPosX = event.clientX
        canvas.lastPosY = event.clientY
    }
}

function enableDraggingMode() {
    isDragging = !isDragging
}

function zoom(opt) {
    var delta = opt.e.deltaY;
    var zoom = canvas.getZoom();
    zoom *= 0.999 ** delta;
    if (zoom > 20) zoom = 20;
    if (zoom < 0.01) zoom = 0.01;
    canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
    opt.e.preventDefault();
    opt.e.stopPropagation();
}

function dragCanvas(opt) {
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
}

function refreshCanvasAfterDrag(opt) {
    // on mouse up we want to recalculate new interaction
    // for all objects, so we call setViewportTransform
    canvas.setViewportTransform(canvas.viewportTransform);
    canvas.isDragging = false;
    canvas.selection = true;
}