function checkRadio()
{
    var inp = document.getElementsByName('choice');
    for (var i = 0; i < inp.length; i++) {
        if (inp[i].type == "radio" && inp[i].checked) {
            return inp[i].value;
        }
    }
}

chooseDrawer();
/*var button = document.getElementById('button');
button.addEventListener('click', chooseDrawer);*/

function chooseDrawer() {
    if (checkRadio() == 'canvas') {
        var fifteens = new Fifteens(),
            cnv = fifteens.animator.canvas,
            cellSize = fifteens.animator.cellSize;

        cnv.addEventListener('click', function (e) {
            if (fifteens.animator.isMoving) {
                return;
            }
            var x = Math.floor((e.pageX - cnv.offsetLeft) / cellSize);
            var y = Math.floor((e.pageY - cnv.offsetTop) / cellSize);
            fifteens.checkStateField(x, y);
        });
    } else {
        /*var htmlAnimator = new Fifteens();*/

    }
}
