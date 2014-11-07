function Animator() {
    this.cellSize = 100;
    this.canvas = document.getElementById('canvas');
    this.ctx = canvas.getContext('2d');
    this.canvas.width = 400;
    this.canvas.height = 400;
}

Animator.prototype.drawAll = function (arrNumbers) {
    this.drawField(arrNumbers);
};

Animator.prototype.drawField = function (arrNumbers) {
    console.log(arrNumbers);
    for (var i = 0; i < arrNumbers.length; i++){
        for (var j = 0; j < arrNumbers[i].length; j++){
            this.ctx.fillText(arrNumbers[i][j], this.cellSize*i+50, this.cellSize*j+50)
        }
    }

};
