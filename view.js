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
    var minSize = 0.9*Math.min(window.innerWidth, window.innerHeight);
    this.canvas = document.createElement('canvas');
    this.canvas.setAttribute('id', 'canvasField');
    this.elem = this.canvas;
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = minSize;
    this.canvas.height = minSize;
    this.cellSize = minSize/4;
    this.duration = 400;
    this.isMoving = false;
    //this.canvas.style.border = '1px solid';
    var font = this.cellSize/5;
    this.ctx.font = font+'px Georgia';
    this.offset = {x : 0, y : 0};
    this.initCanvas(numbers);
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

Animator.prototype.initCanvas = function (arrNumbers) {
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
            var k = function (t, b, c, d) {
                    t /= d/2;
                    if (t < 1) {
                        return c/2*t*t*t + b;
                    }
                    t -= 2;
                    return c/2*(t*t*t + 2) + b;
            },
                currX = k(time, tmpX ,dx ,self.duration),
                currY = k(time, tmpY ,dy ,self.duration);
            dTime = Date.now() - self.lastFrame;
            time += dTime;
            currentChip.x = currX;
            currentChip.y = currY;
            self.lastFrame = Date.now();
            if (time > self.duration) {
                currentChip.x = emptyChip.x;
                currentChip.y = emptyChip.y;
                self.chips[currentIndex] = emptyChip;
                emptyChip.x = tmpX;
                emptyChip.y = tmpY;
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

/////////////////////////////////////

function HtmlAnimator(numbers){
    var minSize = 0.9*Math.min(window.innerWidth, window.innerHeight);
    this.elem = document.createElement('div');
    this.elem.setAttribute('id', 'htmlField');
    this.elem.style.marginTop = '20px';
    this.elem.style.width = minSize+'px';
    this.elem.style.height = minSize+'px';
    this.cellSize = minSize/4;
    this.chips  = [];
    this.numbers = numbers;
}

HtmlAnimator.prototype.clearField = function () {
    var children = this.elem.childNodes;
    while(children.length) {
        this.elem.removeChild(children[0])
    }
};

HtmlAnimator.prototype.drawField = function () {
    this.clearField();
    var numbers = this.numbers;
    for (var i = 0; i < numbers.length; i++){
        var div = document.createElement('div');
        div.textContent = numbers[i];
        div.style.width = 0.8*this.cellSize + 'px';
        div.style.height = 0.8*this.cellSize + 'px';
        div.style.font = 'bold '+this.cellSize/5 + 'px/'+this.cellSize+'px Georgia';
        div.style.margin = 0.05*this.cellSize + 'px';
        var x = (i%4)*this.cellSize,
            y = Math.floor(i/4)*this.cellSize;
        div.style.webkitTransform = 'translate3d('+x+'px,'+ y +'px, 0)';
        if (numbers[i] == 0){
            div.style.opacity = 0;
        }
        div.className = 'cell';
        this.elem.appendChild(div);
        this.chips.push(div);
    }
};

HtmlAnimator.prototype.moveChip = function (emptyIndex, currentIndex) {
    var emptyChip = this.chips[emptyIndex];
    var currentChip = this.chips[currentIndex];
    var x = (emptyIndex%4)*this.cellSize,
        y = Math.floor(emptyIndex/4)*this.cellSize;
    //this.chips[currentIndex] = emptyChip;
    var self = this;
    self.chips[currentIndex] = emptyChip;
    self.chips[currentIndex].style.webkitTransform = 'translate3d('+x+'px,'+ y +'px, 0)';
    self.drawField();
    this.chips[currentIndex].addEventListener('webkitTransitionEnd', function () {
        self.chips[emptyIndex] = currentChip;
    }, false);
};