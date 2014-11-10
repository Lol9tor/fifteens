function Animator(numbers) {
    this.cellSize = 100;
    this.canvas = document.getElementById('canvas');
    this.ctx = canvas.getContext('2d');
    this.canvas.width = 400;
    this.canvas.height = 400;
    //this.canvas.style.border = '1px solid';
    this.ctx.font = '20px Georgia';
    this.offset = {x : 20, y : 20};
    this.init(numbers);
}



Animator.prototype.drawField = function () {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
/*    for (var i = 0; i < arrNumbers.length; i++){
        var x = this.cellSize*(i%width)+this.cellSize/2,
            y = this.cellSize*Math.floor(i/width)+this.cellSize/2;
        if (arrNumbers[i] == 0){
            continue;
        }
        this.ctx.fillText(arrNumbers[i], x, y);
        this.ctx.strokeRect(x-this.cellSize/3, y-this.cellSize/3, 0.8*this.cellSize, 0.8*this.cellSize);
    }*/
    this.ctx.save();
    this.ctx.translate(this.offset.x, this.offset.y);
    for (var i = 0; i < this.chips.length; i++) {
        var obj = this.chips[i];
        if (obj.value == 0){
            continue;
        }
        this.drawChip(obj);
    }
    this.ctx.restore();
};

Animator.prototype.drawChip = function (chip) {

    this.ctx.fillText(chip.value, chip.x+this.cellSize/2, chip.y+this.cellSize/2);
    this.ctx.strokeRect(chip.x, chip.y, 0.8*this.cellSize, 0.8*this.cellSize);

};

Animator.prototype.init = function (arrNumbers) {
    this.chips = [];
    for (var i = 0; i < arrNumbers.length; i++){
        var x = (i%4)*this.cellSize,
            y = Math.floor(i/4)*this.cellSize,
            value = arrNumbers[i];
        var chip = new Chip(x, y, value);
        this.chips.push(chip);
    }
};

Animator.prototype.moveChip = function (emptyIndex, currentIndex) {
    this.lastFrame = Date.now();
    //this.isMoving = true;
    var emptyChip = this.chips[emptyIndex];
    var currentChip = this.chips[currentIndex];
    var tmpX = this.chips[currentIndex].x;
    var tmpY = this.chips[currentIndex].y;
    //this.chips[emptyIndex].x = tmpX;
    //this.chips[emptyIndex].y = tmpY;

    var dx = emptyChip.x - currentChip.x,
        dy = emptyChip.y - currentChip.y;

    var self = this,
        //steps = 10,
        time = 0,
        dTime = 0;
        cb = function () {
            var k = time/300,
                currX = tmpX + dx*k,
                currY = tmpY + dy* k;
            dTime = Date.now() - self.lastFrame;
            time += dTime;
            currentChip.x = currX;
            currentChip.y = currY;

            console.log(k, currentChip);
            self.lastFrame = Date.now();

            if (time > 300) {
                self.isMoving = false;
                currentChip.x = emptyChip.x;
                currentChip.y = emptyChip.y;
            } else {
                self.drawField();
                requestAnimationFrame(cb);
            }
        };
    var t = this.chips[currentIndex];
    this.chips[currentIndex] = this.chips[emptyIndex];
    this.chips[emptyIndex] = t;
    requestAnimationFrame(cb);
};

function Chip(x, y, value){
    this.x = x;
    this.y = y;
    this.value = value;
}


