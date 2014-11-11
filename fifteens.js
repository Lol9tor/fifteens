var fifteens = new Fifteens();
var cnv = fifteens.animator.canvas,
    cellSize = fifteens.animator.cellSize;
cnv.onclick = function(e) {
    if (fifteens.animator.isMoving){
        return;
    }
    var x = Math.floor((e.pageX - cnv.offsetLeft) / cellSize);
    var y = Math.floor((e.pageY - cnv.offsetTop)  / cellSize);
    fifteens.checkStateField(x, y);
};