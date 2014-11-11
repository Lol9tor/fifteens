function fillRoundedRect(x, y, w, h, r){
    this.beginPath();
    this.moveTo(x+r, y);
    this.lineTo(x+w-r, y);
    this.quadraticCurveTo(x+w, y, x+w, y+r);
    this.lineTo(x+w, y+h-r);
    this.quadraticCurveTo(x+w, y+h, x+w-r, y+h);
    this.lineTo(x+r, y+h);
    this.quadraticCurveTo(x, y+h, x, y+h-r);
    this.lineTo(x, y+r);
    this.quadraticCurveTo(x, y, x+r, y);
    this.stroke();
}

CanvasRenderingContext2D.prototype.fillRoundedRect = fillRoundedRect;

function Animator(numbers) {
    this.cellSize = 100;
    this.canvas = document.getElementById('canvas');
    this.ctx = canvas.getContext('2d');
    this.canvas.width = 400;
    this.canvas.height = 400;
    this.duration = 400;
    this.isMoving = false;
    //this.canvas.style.border = '1px solid';
    this.ctx.font = '20px Georgia';
    this.offset = {x : 20, y : 20};
    this.init(numbers);
}

Animator.prototype.drawField = function () {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
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
    //this.ctx.strokeRect(chip.x, chip.y, 0.8*this.cellSize, 0.8*this.cellSize);
    this.ctx.fillRoundedRect(chip.x, chip.y, 0.8*this.cellSize, 0.8*this.cellSize, 0.2*this.cellSize)
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
    var emptyChip = this.chips[emptyIndex];
    var currentChip = this.chips[currentIndex];
    var tmpX = this.chips[currentIndex].x;
    var tmpY = this.chips[currentIndex].y;
    var t = this.chips[currentIndex];
    var dx = emptyChip.x - currentChip.x,
        dy = emptyChip.y - currentChip.y;

    var self = this,
        time = 0,
        dTime = 0;
        cb = function () {
            var k = time/self.duration,
                currX = tmpX + dx*k,
                currY = tmpY + dy* k;
            dTime = Date.now() - self.lastFrame;
            time += dTime;
            currentChip.x = currX;
            currentChip.y = currY;
            self.lastFrame = Date.now();
            if (time > self.duration) {
                self.chips[currentIndex].x = emptyChip.x;
                self.chips[currentIndex].y = emptyChip.y;
                self.chips[currentIndex] = emptyChip;
                self.chips[emptyIndex].x = tmpX;
                self.chips[emptyIndex].y = tmpY;
                self.chips[emptyIndex] = t;
                self.drawField();
                self.isMoving = false;
            } else {
                self.isMoving = true;
                self.drawField();
                requestAnimationFrame(cb);
            }
        };
    requestAnimationFrame(cb);
};

function Chip(x, y, value){
    this.x = x;
    this.y = y;
    this.value = value;
}


